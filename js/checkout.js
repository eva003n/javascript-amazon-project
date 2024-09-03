import { renderOrderSummary } from './checkout/order-summary.js';
import { renderPaymentSummary } from './checkout/payment-summary.js';
// import '../data/backend-practice.js'
import { getProductDetails } from '../data/products.js';
getProductDetails(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
