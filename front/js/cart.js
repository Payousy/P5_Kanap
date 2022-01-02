/*-----------------------------New code panier------------------*/

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
                    <p>${product.colorElement}</p>
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
  let total = 0;
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let j = 0; j < qttModif.length; j++) {
    qttModif[j].addEventListener("change", (event) => {
      event.preventDefault();

      //Selection de l'element à modifier en fonction de son id ET sa couleur
      let quantityModif = productLocalStorage[j].quantityElement;
      let qttModifValue = qttModif[j].valueAsNumber;

      const resultFind = productLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.quantityElement = qttModifValue;
      productLocalStorage[j].quantityElement = resultFind.quantityElement;

      localStorage.setItem("element", JSON.stringify(productLocalStorage));
    });
  }

  productLocalStorage.forEach((element) => {
    total += element.quantityElement * element.priceElement;
  });
}
// modifierQte();

function modifQuantity() {
  let total = 0;
  for (let i = 0; i < productLocalStorage.length; i++) {
    let productQuantity = document.getElementsByClassName("itemQuantity")[i];
    productQuantity.addEventListener("change", function (e) {
      console.log(productQuantity.value);
      const item = document.getElementsByClassName("cart__item")[i];
      const productId = item.dataset.id;
      const productColors = item.dataset.color;
      const foundProduct = productLocalStorage.find(
        (element) =>
          element.idElement === productId &&
          element.colorElement === productColors
      );
      foundProduct.quantityElement = productQuantity.value;
      localStorage.setItem("element", JSON.stringify(productLocalStorage));
      calculateTotalPriceProducts();
    });
  }
}
modifQuantity();

function calculateTotalPriceProducts() {
  /* total quantité produit et total prix */
  const cartQuantity = document.getElementById("totalQuantity");
  const cartTotalPrice = document.getElementById("totalPrice");
  let totalQuantityProduct = 0;
  let totalPriceProduct = 0;
  for (const product of productLocalStorage) {
    totalQuantityProduct =
      parseInt(totalQuantityProduct) + parseInt(product.quantityElement);
    totalPriceProduct =
      totalPriceProduct + product.quantityElement * product.priceElement;
  }
  cartQuantity.innerText = totalQuantityProduct;
  cartTotalPrice.innerText = totalPriceProduct;
}
calculateTotalPriceProducts();

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
      alert(
        "Cet article va être supprimé de votre panier. Ok pour confirmer !"
      );
      location.reload();
    });
  }
}
deleteProduct();

/*----------Gestion de la validation du formulaire grace au regex------------*/
let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isAddressValid = false;
let isCityValid = false;

function getForm() {
  let form = document.querySelector(".cart__order__form");

  //greation des Regex
  let userEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");
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
      isFirstNameValid = true;
    } else {
      firstNameMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validLastName = function (inputLastName) {
    let lastNameMsgError = inputLastName.nextElementSibling;
    if (prNmVilleUser.test(inputLastName.value)) {
      lastNameMsgError.innerHTML = "";
      isLastNameValid = true;
    } else {
      lastNameMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validAddress = function (inputAddress) {
    let addressMsgError = inputAddress.nextElementSibling;
    if (userAdresse.test(inputAddress.value)) {
      addressMsgError.innerHTML = "";
      isAddressValid = true;
    } else {
      addressMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validCity = function (inputCity) {
    let cityMsgError = inputCity.nextElementSibling;
    if (prNmVilleUser.test(inputCity.value)) {
      cityMsgError.innerHTML = "";
      isCityValid = true;
    } else {
      cityMsgError.innerHTML = "Veuillez renseigner ce Champ.";
    }
  };
  const validEmail = function (inputEmail) {
    let emailMsgError = inputEmail.nextElementSibling;
    console.log(inputEmail.value);
    if (userEmail.test(inputEmail.value)) {
      emailMsgError.innerHTML = "";
      isEmailValid = true;
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
    event.preventDefault();

    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputEmail = document.getElementById("email");

    if (
      isFirstNameValid == false ||
      isLastNameValid == false ||
      isAddressValid == false ||
      isCityValid == false ||
      isEmailValid == false
    ) {
      alert("Veuillez bien saisir tous les champs");
      return;
    }

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
