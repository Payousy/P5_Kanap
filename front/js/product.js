let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");
//console.log(idProduct);
let article = "";
//console.log(article);

const colorChoice = document.querySelector("#colors");
//console.log(colorChoice);
const numberChoise = document.querySelector("#quantity");
//console.log(numberChoise);
//////////////////////////
getArticle();

function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then(function (resultatAPI) {
      article = resultatAPI;
      console.log(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur de la requête API");
    });
}

function getPost(article) {
  //insertion image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  //insertion titre
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // insertion du prix article

  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  //inertion description de l'article

  let productDescript = document.getElementById("description");
  productDescript.innerHTML = article.description;

  //
  for (let colors of article.colors) {
    let productColor = document.createElement("option");
    document.getElementById("colors").appendChild(productColor);
    productColor.value = colors;
    productColor.innerHTML = colors;
  }
  addToCart(article);
}

// Gestion du panier
function addToCart(article) {
  const btn_ajoutPanier = document.getElementById("addToCart");
  btn_ajoutPanier.addEventListener("click", (Event) => {
    if (
      numberChoise.value > 0 &&
      numberChoise.value <= 100 &&
      numberChoise.value != 0 &&
      colorChoice.value != ""
    ) {
      //Couleur choisie
      let colorBuy = colorChoice.value;
      /// Quantité choisie
      let quantityBuy = numberChoise.value;

      //Optionqs de l'article ajouté au panier
      let optionsElement = {
        idElement: idProduct,
        colorElement: colorBuy,
        quantityElement: quantityBuy,
        nameElement: article.name,
        priceElement: article.price,
        imgElement: article.imageUrl,
        altImgElement: article.altTxt,
      };

      // Initialisation du local storage
      let productLocalStorage = JSON.parse(localStorage.getItem("element"));

      /// Alerte de confirmation

      const alrteConfirmation = () => {
        if (
          window.confirm(
            `Votre commande a été ajoutée à votre panier : ${article.name}, Couleur ${colorBuy}, Quantité ${quantityBuy}. 
            Cliquer sur Ok pour consulter votre panier.`
          )
        ) {
          window.location.href = "cart.html";
        }
      };
      //Importation dans le local storage
      //Si le panier comporte déjà au moins 1 article
      if (productLocalStorage) {
        const resultFind = productLocalStorage.find(
          (el) => el.idElement === idProduct && el.colorElement === colorBuy
        );
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
          let newQuantity =
            parseInt(optionsElement.quantityElement) +
            parseInt(resultFind.quantityElement);
          resultFind.quantityElement = newQuantity;
          localStorage.setItem("element", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          alrteConfirmation();
          //Si le produit n'est pas dans le panier
        } else {
          productLocalStorage.push(optionsElement);
          localStorage.setItem("element", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          alrteConfirmation();
        }
        //Pour un panier vide
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
/*const colorNone = () => {
  btn_ajoutPanier = document.getElementById("addToCart");
  btn_ajoutPanier.addEventListener("click", (Event) => {
    if (numberChoise.value <= 0 || colorChoice.value === 0)
      window.alert("Selection color");
  });
};*/
