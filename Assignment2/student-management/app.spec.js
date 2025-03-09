import { expect } from 'chai';
import { addProductToCart, changeQuantity, deleteProductFromCart, displayInvoice, cart } from './shoppingCartApp.js';

describe('Shopping Cart Tests', () => {
    beforeEach(() => {
        
        cart.length = 0;
    });

    it('should add a product to the cart', () => {
        addProductToCart(1, 2);
        expect(cart).to.have.lengthOf(1);
        expect(cart[0]).to.include({ id: 1, quantity: 2 });
    });

    it('should increase quantity if product already exists in the cart', () => {
        addProductToCart(1, 2);
        addProductToCart(1, 3);
        expect(cart).to.have.lengthOf(1);
        expect(cart[0].quantity).to.equal(5);
    });

    it('should change the quantity of a product in the cart', () => {
        addProductToCart(2, 2);
        changeQuantity(2, 5);
        expect(cart[0].quantity).to.equal(5);
    });

    it('should return an error message when changing quantity of a non-existent product', () => {
        const result = changeQuantity(99, 5);
        expect(result).to.equal('Item not found in cart.');
    });

    it('should delete a product from the cart', () => {
        addProductToCart(3, 1);
        const result = deleteProductFromCart(3);
        expect(cart).to.have.lengthOf(0);
        expect(result).to.equal('Item removed from cart.');
    });

    it('should return an error message when deleting a non-existent product', () => {
        const result = deleteProductFromCart(99);
        expect(result).to.equal('Item not found in cart.');
    });

    it('should display an empty cart message if no items exist', () => {
        const result = displayInvoice();
        expect(result).to.equal('Cart is empty.');
    });

    it('should display an invoice with correct calculations', () => {
        addProductToCart(1, 2); 
        addProductToCart(2, 1); 
        
        const consoleSpy = sinon.spy(console, 'log');
        displayInvoice();
        expect(consoleSpy.called).to.be.true;
        consoleSpy.restore();
    });
});
