import { cart, removeFromCart,  updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import formatCurrency from '../utils/money.js'
import dayjs from ' https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/delivery-options.js";





export function renderOrderSummary() {
  let cartSummary = '';


  if (cart.length === 0) {
    cartSummary += `
    <div class="empty-cart">
      <div class="image">
      <img src="images/icons/kettle-desaturated._CB445243794_.svg"/>
      </div>
      <div >
          <h2>Your cart is empty</h2>
          <p>Shop today's deals</p>
           <div class="buttons">
          <button class="sign-in">Sign in to your account</button>
          <button class="sign-up">Sign up now</button>
          </div>
      </div>
    </div>
  
    
    
    `
  
  }



 


cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    
   
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

   
  
     const today = dayjs();
     const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString =  deliveryDate.format('dddd, MMMM, D');
    
    cartSummary += `
     <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingProduct.id}" >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

               ${deliveryOptionsHtml(matchingProduct, cartItem)};
               
               
              </div>
            </div>
          </div>
    
    
    
    `
});

function deliveryOptionsHtml (matchingProduct, cartItem ) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString =  deliveryDate.format('dddd, MMMM, D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE': `$${formatCurrency(deliveryOption.priceCents)} -`;
const isChecked = deliveryOption.id === cartItem.deliveryOptionId

    html +=

    `
         <div class="delivery-options js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}"> 

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}" ${isChecked ? 'checked': ''} />
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
                
              
              </div>
    
    
    `


  });
  return html;

}


document.querySelector('.js-order-summary').innerHTML = cartSummary;
const cartQuantity = updateCartQuantity();
document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cartQuantity} Items`

document.querySelectorAll('.js-delete').forEach( (link) => {
  link.addEventListener('click', () => {
    const {productId} = link.dataset;
     removeFromCart(productId);
    const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
    cartItem.remove();
    const cartQuantity = updateCartQuantity();
   document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cartQuantity} Items`;
    
  
  });
  
  
  });
 

document.querySelectorAll('.js-delivery-option').forEach((option) => {
  option.addEventListener('click', () => {
    const {productId, deliveryOptionId} = option.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    
     renderOrderSummary();
     

  });

});

}

