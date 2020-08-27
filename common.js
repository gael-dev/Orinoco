//LOCAL STORAGE
let cart = localStorage
let itemsInCart = [];//create array for items
let storedItems

if (localStorage.inCart === undefined) {
    localStorage.setItem('inCart', [])
}

function insPopover() {
    document.querySelector('#in_cart_popover').innerHTML = ''
    if (itemsInCart.length === 0) {
        document.querySelector('#in_cart_popover').innerHTML = 'votre panier est vide !'
    }
    else {
        itemsInCart.forEach((element, index) => {
            if (storedItems !== undefined) {
                for (let i = 0; i < storedItems.length; i++) {
                    if (itemsInCart[index].id === storedItems[i]._id) {
                        document.querySelector('#in_cart_popover').insertAdjacentHTML('beforeend', `
                            <div class='row'>
                                <div class="col-6">
                                    ${storedItems[i].name} ${itemsInCart[index].color}
                                </div>
                                <div class='col-6' total-id="${storedItems[i].id}-${itemsInCart[index].color}">
                                    ${itemsInCart[index].qty} * ${storedItems[i].price / 100} € = ${itemsInCart[index].qty * storedItems[i].price / 100}€
                                </div>
                            </div>
                        `)
                    }
                }
            }
        })
    }
}

function refreshCart() {
    if (localStorage.inCart === undefined) {
        localStorage.setItem('inCart', [])
    }
    else if (localStorage !== undefined && localStorage.inCart.length > 0) {
        itemsInCart = JSON.parse(localStorage.inCart)
    }
    let cart_number = 0
    itemsInCart.forEach(element => {
        cart_number += element.qty
    });
    cart.setItem('inCart', JSON.stringify(itemsInCart))
    //numbers of items in cart to the nav bar
    document.querySelector('#in_cart_count').innerHTML = cart_number

    //total price
    let total = 0;
    document.querySelectorAll('[data-total]').forEach(element => {
        total += parseInt(element.innerHTML.split(' ')[0])
    })
    if (document.querySelector('#in-cart-total') !== null) {
        document.querySelector('#in-cart-total').innerHTML = total + ' €'
    }
    insPopover()
}


