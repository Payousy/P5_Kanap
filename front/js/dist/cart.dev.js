"use strict";

// Initialisation du local storage
var productLocalStorage = JSON.parse(localStorage.getItem("element")); //console.table(productLocalStorage);

var cartItemsSection = document.getElementById("cart__items"); // Initialisation du local storage

var products = JSON.parse(localStorage.getItem("element"));
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var product = _step.value;
    cartItemsSection.innerHTML += "\n      <article class=\"cart__item\" data-id=\"".concat(product.idElement, "\" data-color=\"").concat(product.colorElement, "\">\n                <div class=\"cart__item__img\">\n                  <img src=\"").concat(product.imgElement, "\" alt=\"").concat(product.altImgElement, "\">\n                </div>\n                <div class=\"cart__item__content\">\n                  <div class=\"cart__item__content__description\">\n                    <h2>").concat(product.nameElement, "</h2>\n                    <p>Vert</p>\n                    <p>").concat(product.priceElement, " \u20AC</p>\n                  </div>\n                  <div class=\"cart__item__content__settings\">\n                    <div class=\"cart__item__content__settings__quantity\">\n                      <p>Qt\xE9 : </p>\n                      <input type=\"number\" class=\"itemQuantity\" name=\"itemQuantity\" min=\"1\" max=\"100\" value=\"").concat(product.quantityElement, "\">\n                    </div>\n                    <div class=\"cart__item__content__settings__delete\">\n                      <p class=\"deleteItem\">Supprimer</p>\n                    </div>\n                  </div>\n                </div>\n              </article>\n  ");
  }
  /*function supprimerUnArticle() {
    let productSupprimer = document.createElement("p");
    productItemContentSettingDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
    if (productLocalStorage === null || productLocalStorage == 0) {
      let buttonSupprimer = document.querySelector(".deleteItem");
      buttonSupprimer.addEventListener("click", (event) => {
        function clearLocalStorage() {
          return (localStorage = null);
        }
      });
    }
  }
  supprimerUnArticle();*/
  // Partie concernat le cacule du panier

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

function getTotals() {
  //récuperation du total des quantités
  var elemsQt = document.getElementsByClassName("itemQuantity");
  var tabLength = elemsQt.length,
      quantiteTotal = 0;

  for (var i = 0; i < tabLength; ++i) {
    quantiteTotal += elemsQt[i].valueAsNumber; //console.log(quantiteTotal);
  }

  var quantiteTotalArticle = document.getElementById("totalQuantity");
  quantiteTotalArticle.innerHTML = quantiteTotal; //console.log(quantiteTotal);
  //Récupération du total des prix

  totalPrice = 0;

  for (var _i = 0; _i < tabLength; ++_i) {
    totalPrice += elemsQt[_i].valueAsNumber * productLocalStorage[_i].priceElement;
  }

  var totalPriceProduct = document.getElementById("totalPrice");
  totalPriceProduct.innerHTML = totalPrice;
}

getTotals(); // Modifier la quantité d'un article

function modifierQte() {
  var newQuantity = document.querySelector(".itemQuantity");

  var _loop = function _loop(j) {
    nouvelQuantite[j].addEventListener("change", function (event) {
      event.preventDefault(); // Elément à modifier

      var quantiteModifie = productLocalStorage[j].quantityElement; //console.log(quantityElement);

      var valueQuantiteModifie = nouvelQuantite[j].valueAsNumber;
      var resultFind = productLocalStorage.find(function (el) {
        return el.valueQuantiteModifie !== quantiteModifie;
      });
      resultFind.quantityElement = valueQuantiteModifie;
      productLocalStorage[j].quantityElement = resultFind.quantityElement;
      localStorage.setItem("element", JSON.stringify(productLocalStorage)); //rafraichissement de la page après changement

      location.reload;
    });
  };

  for (var j = 0; j < newQuantity; j++) {
    _loop(j);
  }
}

modifierQte(); // Supprimer un produit du panier

function deleteProduct() {
  var btn_supprimer = document.querySelectorAll(".deleteItem");

  var _loop2 = function _loop2(k) {
    btn_supprimer[k].addEventListener("click", function (event) {
      event.preventDefault(); //Selection de l'element à supprimer en fonction de son id ET sa couleur

      var idDelete = productLocalStorage[k].idElement;
      var colorDelete = productLocalStorage[k].colorElement;
      productLocalStorage = productLocalStorage.filter(function (el) {
        return el.idElement !== idDelete || el.colorElement !== colorDelete;
      });
      localStorage.setItem("element", JSON.stringify(productLocalStorage)); //Alerte produit supprimé et refresh

      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  };

  for (var k = 0; k < btn_supprimer.length; k++) {
    _loop2(k);
  }
}

deleteProduct(); // gestion du formulaire de commande

var afficheForm = function afficheForm() {
  var structureForm = "<div class=\"cart__order\">\n  <form method=\"get\" class=\"cart__order__form\">\n    <div class=\"cart__order__form__question\">\n      <label for=\"firstName\">Pr\xE9nom: </label>\n      <input type=\"text\" name=\"firstName\" id=\"firstName\" required />\n      <p id=\"firstNameErrorMsg\">\n        <!-- ci est un message d'erreur -->\n      </p>\n    </div>\n    <div class=\"cart__order__form__question\">\n      <label for=\"lastName\">Nom: </label>\n      <input type=\"text\" name=\"lastName\" id=\"lastName\" required />\n      <p id=\"lastNameErrorMsg\"></p>\n    </div>\n    <div class=\"cart__order__form__question\">\n      <label for=\"address\">Adresse: </label>\n      <input type=\"text\" name=\"address\" id=\"address\" required />\n      <p id=\"addressErrorMsg\"></p>\n    </div>\n    <div class=\"cart__order__form__question\">\n      <label for=\"city\">Ville: </label>\n      <input type=\"text\" name=\"city\" id=\"city\" required />\n      <p id=\"cityErrorMsg\"></p>\n    </div>\n    <div class=\"cart__order__form__question\">\n      <label for=\"email\">Email: </label>\n      <input type=\"email\" name=\"email\" id=\"email\" required />\n      <p id=\"emailErrorMsg\"></p>\n    </div>\n    <div class=\"cart__order__form__submit\">\n      <input type=\"submit\" value=\"Commander !\" id=\"order\" />\n    </div>\n  </form>\n</div>";
};
/*----------Gestion de la validation du formulaire grace au regex------------*/


function getForm() {
  var form = document.querySelector(".cart__order__form"); //greation des Regex

  var userEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$]");
  var prNmVilleUser = new RegExp("^[a-zA-Z ,.'-]+$");
  var userAdresse = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"); // Modification valeurs du formulaire

  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });
  form.address.addEventListener("change", function () {
    validAddress(this);
  });
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  form.email.addEventListener("change", function () {
    validEmail(this);
  }); //Validation des données users
  //le prénom

  var validFirstName = function validFirstName(inputFirstName) {
    var firstNameMsgError = inputFirstName.nextElementSibling;

    if (prNmVilleUser.test(inputFirstName.value)) {
      firstNameMsgError.innerHTML = "";
    } else {
      firstNameMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };

  var validLastName = function validLastName(inputLastName) {
    var lastNameMsgError = inputLastName.nextElementSibling;

    if (prNmVilleUser.test(inputLastName.value)) {
      lastNameMsgError.innerHTML = "";
    } else {
      lastNameMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };

  var validAddress = function validAddress(inputAddress) {
    var addressMsgError = inputAddress.nextElementSibling;

    if (userAdresse.test(inputAddress.value)) {
      addressMsgError.innerHTML = "";
    } else {
      addressMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };

  var validCity = function validCity(inputCity) {
    var cityMsgError = inputCity.nextElementSibling;

    if (prNmVilleUser.test(inputCity.value)) {
      cityMsgError.innerHTML = "";
    } else {
      cityMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };

  var validEmail = function validEmail(inputEmail) {
    var emailMsgError = inputEmail.nextElementSibling;

    if (userEmail.test(inputEmail.value)) {
      emailMsgError.innerHTML = "";
    } else {
      emailMsgError.innerHTML = "Veuillez renseigner une adresse email valide.";
    }
  };
}

getForm(); // Récupération des valeurs du formulaire pour le stock dans le localstorage:

function postForm() {
  //Seclection du boutton submit
  var btnCommander = document.getElementById("order"); //Action à faire au click du btnCommander

  btnCommander.addEventListener("click", function (event) {
    //Récupération des coordonnées du formulaire client
    var inputName = document.getElementById("firstName");
    var inputLastName = document.getElementById("lastName");
    var inputAdress = document.getElementById("address");
    var inputCity = document.getElementById("city");
    var inputEmail = document.getElementById("email"); //Construction d'un array depuis le local storage

    var idProducts = [];

    for (var i = 0; i < productLocalStorage.length; i++) {
      idProducts.push(productLocalStorage[i].idElement);
    }

    console.log(idProducts);
    var order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputEmail.value
      },
      products: idProducts
    };
    var options = {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    };
    fetch("http://localhost:3000/api/products/order", options).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);
      document.location.href = "confirmation.html";
    })["catch"](function (err) {
      alert("problème : " + err.message);
    });
  });
}

postForm(); //--------------Mettre le contenu du localStorage dasns les champs de formulaires-------------
//Récupération  de la clé du localStorage et stockage dns une variable
//const dataLocalStorage = localStorage.getItem("formulaireValue");
//const dataLocalStorageObject = JSON.parse(dataLocalStorage);
//Intégrer les values du localStorage dans les champs du formulaire

/*document.getElementById("firstName").value = dataLocalStorageObject.prenom;
document.getElementById("lastName").value = dataLocalStorageObject.nom;
document.getElementById("address").value = dataLocalStorageObject.adresse;
document.getElementById("city").value = dataLocalStorageObject.ville;
document.getElementById("email").value = dataLocalStorageObject.email;*/
//

/*btnCommander.addEventListener("click", (e) => {
  e.preventDefault();
  //récupération des valeurs du formulaire
  const formulaireValue = {
    prenom: document.getElementById("firstName").value,
    nom: document.getElementById("lastName").value,
    adresse: document.getElementById("address").value,
    ville: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  /*----------Gestion de la validation du formulaire grace au regex------------*/
//Validation du prénom

/*function controlePrenom() {
    const lePrenom = formulaireValue.prenom;
    if (/^[A-Za-z]{2,20}$/.test(lePrenom)) {
      console.log(lePrenom);
      return true;
    } else {
      alert(
        "Les chiffres et les symbôles ne sont pas autorisés \n Vous devez saisir  minimum entre 2 et 20 caractères."
      );
      return false;
    }
  }

  //Mettre l'ojet "formValue" dans le locastorage
  if (controlePrenom()) {
    localStorage.setItem("formulaireValue", JSON.stringify(formulaireValue));
    alert("Veuillez bien remplir le formulaire");
  }

  //Mettre les produits sélectionnés et les values du formulaire dans un objet à envoyer vers le server

  const infosEnvoyer = {
    productLocalStorage,
    formulaireValue,
  };
});*/