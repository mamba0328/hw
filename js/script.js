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

    sortProducts(type = 0) {
        switch(type) {
            case 1: { 
                return this.products.slice().sort((a, b) => b.cost - a.cost)
            }
            case -1: { 
                return this.products.slice().sort((a, b) => a.cost - b.cost)
            }
            default:{ 
                return this.products.slice().sort((product) => product.isBought ? -1 : 1)
            }
        }
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

    returnUnbought() {
        return this.products.filter(product => !product.isBought)
    },

    getOverallCost(arr) {
        const reducedAmount = arr.reduce((prev, next) => {
            return prev + next.cost; //i don't use prev.cost because prev here is just a num; 
        }, 0);
        return reducedAmount
    }
}

shopingCart.buyProduct('milk');
shopingCart.removeProduct('eggs');
shopingCart.addProduct('milk');
shopingCart.addProduct('eggs', 100);
shopingCart.logProducts(shopingCart.sortProducts(), 'Your products:');
shopingCart.logProducts(shopingCart.sortProducts(-1), 'Your products:');
shopingCart.logProducts(shopingCart.sortProducts(1), 'Your products:');
shopingCart.logProducts(shopingCart.getOverallCost(shopingCart.products), 'Overall cost is:');
shopingCart.logProducts(shopingCart.getOverallCost(shopingCart.returnUnbought()), 'Overall cost is:'); 