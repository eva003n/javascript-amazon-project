 export const deliveryOptions = [
    {
        id: 'd001',
        deliveryDays: 7,
        priceCents: 0,
        
    },
    {
        id: 'd002',
        deliveryDays: 3,
        priceCents: 499,
        
    },
    {
        id: 'd003',
        deliveryDays: 1,
        priceCents: 999,
        
    },


];
export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
   if (deliveryOptionId === option.id) {
     deliveryOption = option;
  
   }
});
return deliveryOption || deliveryOptions[0];
}