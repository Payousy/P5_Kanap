"use strict";

var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id"); //console.log(idProduct);

var article = ""; //console.log(article);

var colorChoice = document.querySelector("#colors"); //console.log(colorChoice);

var numberChoise = document.querySelector("#quantity"); //console.log(numberChoise);
//////////////////////////

getArticle();

function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct).then(function (response) {
    return response.json();
  }).then(function (resultatAPI) {
    article = resultatAPI;
    console.log(article);

    if (article) {
      getPost(article);
    }
  })["catch"](function (error) {
    console.log("Erreur de la requête API");
  });
}

function getPost(article) {
  //insertion image
  var productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt; //insertion titre

  var productName = document.getElementById("title");
  productName.innerHTML = article.name; // insertion du prix article

  var productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price; //inertion description de l'article

  var productDescript = document.getElementById("description");
  productDescript.innerHTML = article.description; //

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = article.colors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var colors = _step.value;
      var productColor = document.createElement("option");
      document.getElementById("colors").appendChild(productColor);
      productColor.value = colors;
      productColor.innerHTML = colors;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  addToCart(article);
} // Gestion du panier


function addToCart(article) {
  var btn_ajoutPanier = document.getElementById("addToCart");
  btn_ajoutPanier.addEventListener("click", function (Event) {
    if (numberChoise.value > 0 && numberChoise.value <= 100 && numberChoise.value != 0) {
      //Couleur choisie
      var colorBuy = colorChoice.value; /// Quantité choisie

      var quantityBuy = numberChoise.value; //Optionqs de l'article ajouté au panier

      var optionsElement = {
        idElement: idProduct,
        colorElement: colorBuy,
        quantityElement: quantityBuy,
        nameElement: article.name,
        priceElement: article.price,
        imgElement: article.imageUrl,
        altImgElement: article.altTxt
      }; // Initialisation du local storage

      var productLocalStorage = JSON.parse(localStorage.getItem("element")); /// Alerte de confirmation

      var alrteConfirmation = function alrteConfirmation() {
        if (window.confirm("Votre commande a \xE9t\xE9 ajout\xE9e \xE0 votre panier : ".concat(article.name, ", Couleur ").concat(colorBuy, ", Quantit\xE9 ").concat(quantityBuy, ". \n            Cliquer sur Ok pour consulter votre panier."))) {
          window.location.href = "cart.html";
        }
      }; //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 article


      if (productLocalStorage) {
        var resultFind = productLocalStorage.find(function (el) {
          return el.idElement === idProduct && el.colorElement === colorBuy;
        }); //Si le produit commandé est déjà dans le panier

        if (resultFind) {
          var newQuantity = parseInt(optionsElement.quantityElement) + parseInt(resultFind.quantityElement);
          resultFind.quantityElement = newQuantity;
          localStorage.setItem("element", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          alrteConfirmation(); //Si le produit n'est pas dans le panier
        } else {
          productLocalStorage.push(optionsElement);
          localStorage.setItem("element", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          alrteConfirmation();
        } //Pour un panier vide

      } else {
        productLocalStorage = [];
        productLocalStorage.push(optionsElement);
        localStorage.setItem("element", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        alrteConfirmation();
      }
    }
  });
}