'use strict';

//-------------------Arr-------------------
// const arr = [];
// const arr_2 = new Array();


function Product(name, quantity, price, isBought) {
    this.name = name;
    this.quantity = +quantity;
    this.price = +price;
    this.cost = this.quantity * this.price;
    this.isBought = isBought;
}

const bread = new Product('bread', 1, 25, true);
const milk = new Product('milk', 1, 40, false);
const eggs = new Product('eggs', 10, 4.7, true);

const shopingCart = {
    products: [bread, milk, eggs],

    sortedProducts() {
        const sortedProducts = this.products.sort((product) => product.isBought ? -1 : 1);
        return sortedProducts
    },

    logProducts(subj, message = '') {
        console.log(message, subj)
    },

    buyProduct(productName) {
        this.products.map(product => {
            if (product.name === productName) product.isBought = true;
        })
    },

    removeProduct(productName) {
        const filteredProducts = this.products.filter(product => product.name !== productName)
        this.products = filteredProducts;
    },

    productExist(productName) {
        let exist = false
        this.products.map(product => {
            if (product.name === productName) exist = true;
        })
        return exist
    },

    addProduct(name, quantity = 1, price = 0.01, isBought = false) {
        const newProduct = new Product(name, quantity, price, isBought);
        if (this.productExist(newProduct.name)) {
            this.products.map(product => {
                if (product.name === newProduct.name) {
                    product.quantity += newProduct.quantity;
                    product.cost = product.quantity * product.price;
                }
            })
        } else {
            this.products.push(newProduct);
        }
    },

    getOverallCost() {
        const reducedAmount = this.products.reduce((prev, next) => {
            //here
        }, 0);
        return reducedAmount
    }
}

shopingCart.buyProduct('milk');
shopingCart.removeProduct('eggs');
shopingCart.addProduct('milk');
shopingCart.addProduct('eggs', 100);
shopingCart.logProducts(shopingCart.sortedProducts(), 'Your products:');
shopingCart.logProducts(shopingCart.getOverallCost(), 'Overall cost is:');