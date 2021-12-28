// Initialisation du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("element"));
//console.table(productLocalStorage);

const cartItemsSection = document.getElementById("cart__items");
// Initialisation du local storage
const products = JSON.parse(localStorage.getItem("element"));
for (const product of products) {
  cartItemsSection.innerHTML += `
      <article class="cart__item" data-id="${product.idElement}" data-color="${product.colorElement}">
                <div class="cart__item__img">
                  <img src="${product.imgElement}" alt="${product.altImgElement}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.nameElement}</h2>
                    <p>Vert</p>
                    <p>${product.priceElement} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantityElement}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
  `;
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

function getTotals() {
  //récuperation du total des quantités
  let elemsQt = document.getElementsByClassName("itemQuantity");

  let tabLength = elemsQt.length,
    quantiteTotal = 0;
  for (let i = 0; i < tabLength; ++i) {
    quantiteTotal += elemsQt[i].valueAsNumber;
    //console.log(quantiteTotal);
  }

  let quantiteTotalArticle = document.getElementById("totalQuantity");
  quantiteTotalArticle.innerHTML = quantiteTotal;
  //console.log(quantiteTotal);

  //Récupération du total des prix

  totalPrice = 0;
  for (let i = 0; i < tabLength; ++i) {
    totalPrice +=
      elemsQt[i].valueAsNumber * productLocalStorage[i].priceElement;
  }

  let totalPriceProduct = document.getElementById("totalPrice");
  totalPriceProduct.innerHTML = totalPrice;
}
getTotals();

// Modifier la quantité d'un article

function modifierQte() {
  let newQuantity = document.querySelector(".itemQuantity");

  for (let j = 0; j < newQuantity; j++) {
    nouvelQuantite[j].addEventListener("change", (event) => {
      event.preventDefault();
      // Elément à modifier
      let quantiteModifie = productLocalStorage[j].quantityElement;
      //console.log(quantityElement);
      let valueQuantiteModifie = nouvelQuantite[j].valueAsNumber;

      const resultFind = productLocalStorage.find(
        (el) => el.valueQuantiteModifie !== quantiteModifie
      );
      resultFind.quantityElement = valueQuantiteModifie;
      productLocalStorage[j].quantityElement = resultFind.quantityElement;
      localStorage.setItem("element", JSON.stringify(productLocalStorage));

      //rafraichissement de la page après changement
      location.reload;
    });
  }
}
modifierQte();

// Supprimer un produit du panier
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btn_supprimer.length; k++) {
    btn_supprimer[k].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = productLocalStorage[k].idElement;
      let colorDelete = productLocalStorage[k].colorElement;

      productLocalStorage = productLocalStorage.filter(
        (el) => el.idElement !== idDelete || el.colorElement !== colorDelete
      );

      localStorage.setItem("element", JSON.stringify(productLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
deleteProduct();

// gestion du formulaire de commande

const afficheForm = () => {
  const structureForm = `<div class="cart__order">
  <form method="get" class="cart__order__form">
    <div class="cart__order__form__question">
      <label for="firstName">Prénom: </label>
      <input type="text" name="firstName" id="firstName" required />
      <p id="firstNameErrorMsg">
        <!-- ci est un message d'erreur -->
      </p>
    </div>
    <div class="cart__order__form__question">
      <label for="lastName">Nom: </label>
      <input type="text" name="lastName" id="lastName" required />
      <p id="lastNameErrorMsg"></p>
    </div>
    <div class="cart__order__form__question">
      <label for="address">Adresse: </label>
      <input type="text" name="address" id="address" required />
      <p id="addressErrorMsg"></p>
    </div>
    <div class="cart__order__form__question">
      <label for="city">Ville: </label>
      <input type="text" name="city" id="city" required />
      <p id="cityErrorMsg"></p>
    </div>
    <div class="cart__order__form__question">
      <label for="email">Email: </label>
      <input type="email" name="email" id="email" required />
      <p id="emailErrorMsg"></p>
    </div>
    <div class="cart__order__form__submit">
      <input type="submit" value="Commander !" id="order" />
    </div>
  </form>
</div>`;
};
/*----------Gestion de la validation du formulaire grace au regex------------*/

function getForm() {
  let form = document.querySelector(".cart__order__form");

  //greation des Regex
  let userEmail = new RegExp(
    `^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$]`
  );
  let prNmVilleUser = new RegExp("^[a-zA-Z ,.'-]+$");
  let userAdresse = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Modification valeurs du formulaire
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
  });
  //Validation des données users
  //le prénom
  const validFirstName = function (inputFirstName) {
    let firstNameMsgError = inputFirstName.nextElementSibling;
    if (prNmVilleUser.test(inputFirstName.value)) {
      firstNameMsgError.innerHTML = "";
    } else {
      firstNameMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validLastName = function (inputLastName) {
    let lastNameMsgError = inputLastName.nextElementSibling;
    if (prNmVilleUser.test(inputLastName.value)) {
      lastNameMsgError.innerHTML = "";
    } else {
      lastNameMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validAddress = function (inputAddress) {
    let addressMsgError = inputAddress.nextElementSibling;
    if (userAdresse.test(inputAddress.value)) {
      addressMsgError.innerHTML = "";
    } else {
      addressMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validCity = function (inputCity) {
    let cityMsgError = inputCity.nextElementSibling;
    if (prNmVilleUser.test(inputCity.value)) {
      cityMsgError.innerHTML = "";
    } else {
      cityMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validEmail = function (inputEmail) {
    let emailMsgError = inputEmail.nextElementSibling;
    if (userEmail.test(inputEmail.value)) {
      emailMsgError.innerHTML = "";
    } else {
      emailMsgError.innerHTML = "Veuillez renseigner une adresse email valide.";
    }
  };
}
getForm();
// Récupération des valeurs du formulaire pour le stock dans le localstorage:

function postForm() {
  //Seclection du boutton submit
  const btnCommander = document.getElementById("order");
  //Action à faire au click du btnCommander
  btnCommander.addEventListener("click", (event) => {
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputEmail = document.getElementById("email");

    //Construction d'un array depuis le local storage
    let idProducts = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      idProducts.push(productLocalStorage[i].idElement);
    }
    console.log(idProducts);

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: idProducts,
    };
    const options = {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    };
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("problème : " + err.message);
      });
  });
}
postForm();
//--------------Mettre le contenu du localStorage dasns les champs de formulaires-------------

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
