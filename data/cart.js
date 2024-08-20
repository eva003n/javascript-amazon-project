export const cart = [];

/*Decide on the variables to be accessed outside this file */
/*then export */

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
    });
  }
}
