// Initialisation du local storage
let productLocalStorage = JSON.parse(localStorage.getItem("element"));
console.table(productLocalStorage);

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
/*let buttonSupprimer = document.querySelector("deleteItem");
buttonSupprimer.addEventListener("click", (Event) => {
  function clearLocalStorage() {
    return (localStorage = null);
  }
});*/

/*let productSupprimer = document.createElement("p");
productItemContentSettingDelete.appendChild(productSupprimer);
productSupprimer.className = "deleteItem";
productSupprimer.innerHTML = "Supprimer";*/

// Partie concernat le cacule du panier

function getTotals() {
  //récuperation du total des quantités
  let elemsQt = document.getElementsByClassName("itemQuantity");

  let tabLength = elemsQt.length,
    quantiteTotal = 0;
  for (let i = 0; i < tabLength; ++i) {
    quantiteTotal += elemsQt[i].valueAsNumber;
    console.log(quantiteTotal);
  }

  let quantiteTotalArticle = document.getElementById("totalQuantity");
  quantiteTotalArticle.innerHTML = quantiteTotal;
  console.log(quantiteTotal);

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
