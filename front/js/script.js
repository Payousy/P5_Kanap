url = "http://localhost:3000/api/products";
const productsTag = document.getElementById("items");
console.log(productsTag);

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    for (const product of data) {
      productsTag.innerHTML += `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`;
    }
  })
  .catch((err) => console.log("Erreur : " + err));
