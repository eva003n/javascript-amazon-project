export let cart = JSON.parse(localStorage.getItem('cart'))
if (!cart) { 
cart = [
   {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: 'd001'

   },
   {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
   deliveryOptionId: 'd002'
   }

];
}
export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart))
}

/*Decide on the variables to be accessed outside this file */
/*then export */

/*Data normalization */
/*we will use the productId to obtain all the other details about the product */

/*add to cart */
export function addToCart(productId) {
  let matchingItem; //loop via the cart and check if the the item is in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  }); /*if item is already in the cart we increment quantity by 1 */
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: 'd001'
    });
  }
  saveToStorage();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  
  });

return cartQuantity;
}


export function removeFromCart (productId) {
  const newcart = [];
  let matchingCartItem;

  cart.forEach((cartItem) => {
    if(productId !== cartItem.productId) {
      matchingCartItem = cartItem;
      newcart.push(matchingCartItem);

    }

  

  });
  cart = newcart;
  saveToStorage();
 
}
/*making the delivery options interactive */
/*when we select a delivery option we update the deliveryOptionId in the cart */
/*to do this we need the productId to identify the we want to change its deliveryOptionId and the deliveryid to know what delivery option to change ur product to */

export function updateDeliveryOption (productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }

  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();

}
