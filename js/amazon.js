/*---------------------------------------------------- */
/*Importing a module */


import { cart, addToCart, updateCartQuantity } from "../data/cart.js"; /*file path of module to import and use */
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


/*All the imports should be at the top of a file */
/*For module to work we need live server */
/*-----------------------------------------------------*/

let productsHtml = "";
products.forEach((product) => {
  productsHtml += ` 
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png""
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(product.priceCents)}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.Id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}"
          >Add to Cart</button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHtml;
const cartQuantity = updateCartQuantity();
document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;


const addedMessageTimeouts = {};
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId =
      button.dataset
        .productId; /*the value in the data attribute gets converted from kebab-case to camelcase */
    addToCart(productId);
document.querySelector(`.js-added-to-cart-${productId}`).classList.add('added-to-cart-indicator');
const previousTimeoutId = addedMessageTimeouts[productId];

if (previousTimeoutId) {/*clears a previous timeout if any */
  clearTimeout(previousTimeoutId);
}

const timeOutId = setTimeout(() => {
  document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('added-to-cart-indicator'); 
}, 2000);

addedMessageTimeouts[productId] = timeOutId;

    const cartQuantity = updateCartQuantity();
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  });
});
