/////////////////////////////////////////////

let fragment = document.createDocumentFragment();
let product = document.getElementById("product");

import { Cart } from "/src/script/cart.js";
let cart = new Cart();
cart.renderToCart();
cart.getTotal();

/////////////////////////////////////////////
export class Fetching {
  constructor() {
    this.url = "/E-commerce/src/API/api.json";
  }

  async cashing() {
    let response = await fetch(this.url);
    let data = await response.json();
    localStorage.setItem("products", JSON.stringify(data));
    return data;
  }

  async renderCard() {
    let data =
      JSON.parse(localStorage.getItem("products")) || (await this.cashing());

    data.forEach((element) => {
      let cardTitle = document.createElement("h6");
      cardTitle.className = "cardTitle";
      cardTitle.textContent = element.name;

      let cardImg = document.createElement("img");
      cardImg.src = element.image;
      cardImg.loading = "lazy";

      let cardPrice = document.createElement("h5");
      cardPrice.textContent = `${element.price}$`;

      let addBtn = document.createElement("button");
      addBtn.textContent = "Add To Cart";
      addBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        cart.addToCart(element);
        cart.getTotal();
        cart.renderToCart();
      });

      let card = document.createElement("div");
      card.className = "item";
      card.id = element.id;
      card.addEventListener("click", () => {
        window.location.href = `/E-commerce/src/index/prodect.html?id=${card.id}`;
      });

      card.appendChild(cardImg);
      card.appendChild(cardTitle);
      card.appendChild(cardPrice);
      card.appendChild(addBtn);

      fragment.appendChild(card);
    });
    product.appendChild(fragment);
  }
  favorite() {}
}
let fetchingInstance = new Fetching();
await fetchingInstance.renderCard();

let cartShop = document.querySelector(".cart-shop");
let cartIcon = document.getElementById("cart-icon");
cartIcon.addEventListener("click", () => {
  cart.toggleVisibility(cartShop);
});
let dropmenu = document.getElementById("dropmenu");
let menuIcon = document.getElementById("menu-icon");
menuIcon.addEventListener("click", () => {
  cart.toggleVisibility(dropmenu);
});

let mapIcon = document.getElementById("map-icon");

mapIcon.addEventListener("click", () => {
  window.location.href = `/E-commerce/src/index/location.html`;
});
