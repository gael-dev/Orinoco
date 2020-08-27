const api = "http://localhost:3000/api/teddies"

//fetch method
let fetchGET = { //get
    method: 'GET',
    mode: 'cors'
}

function sStorage() {
    if (sessionStorage.items === undefined || sessionStorage.items.length === 0) {
        sessionStorage.setItem('items', JSON.stringify(storedItems))
    }
}
if (sessionStorage.items === undefined) {
    fetch(api, fetchGET)
        .then(
            (response) => {
                try {
                    response.json().then(
                        (data) => {
                            storedItems = data
                            sStorage();
                            insLocalStorage();
                            insProductHTML();
                        }
                    )
                } catch {
                    console.log('error parsing data')
                }
            }
        )
        .catch(
            error => {
                console.log('fetch errror:', error)
            }
        )
}
else {
    storedItems = JSON.parse(sessionStorage.items)
    insLocalStorage();
    insProductHTML();
}

function updateQty(id, qty, price) {
    document.querySelector("[data-qty='" + id + "']").innerHTML = qty
    document.querySelector("[data-total='" + id + "']").innerHTML = qty * price / 100 + ' €'
}

function addOne(e) {
    let split = e.target.id.split('-')
    for (let i = 0; i < itemsInCart.length; i++) {
        if (itemsInCart[i].id === split[0] && itemsInCart[i].color === split[1]) {
            itemsInCart[i].qty++
            cart.inCart = JSON.stringify(itemsInCart)
            for (let j = 0; j < storedItems.length; j++) {
                if (itemsInCart[i].id === storedItems[j]._id) {
                    updateQty(e.target.id, itemsInCart[i].qty, storedItems[j].price)
                    refreshCart();
                }
            }
        }
    }
}

function removeOne(e) {
    let split = e.target.id.split('-')
    for (let i = 0; i < itemsInCart.length; i++) {
        if (itemsInCart[i].id === split[0] && itemsInCart[i].color === split[1]) {
            itemsInCart[i].qty--
            cart.inCart = JSON.stringify(itemsInCart)
            for (let j = 0; j < storedItems.length; j++) {
                if (itemsInCart[i].id === storedItems[j]._id) {
                    updateQty(e.target.id, itemsInCart[i].qty, storedItems[j].price)
                    refreshCart();
                }
            }
            if (itemsInCart[i].qty === 0) {
                deleteOne(e)
            }
        }
        if (itemsInCart === null === undefined || itemsInCart.length === 0) {
            document.querySelector('#in-cart').innerHTML = 'Votre Panier est vide !'
            refreshCart();
        }
    }
}

function deleteOne(e) {
    let split = e.target.id.split('-')
    for (let j = 0; j < itemsInCart.length; j++) {
        if (itemsInCart[j].id === split[0] && itemsInCart[j].color === split[1]) {
            itemsInCart.splice(j, 1)
            cart.inCart = JSON.stringify(itemsInCart)
            document.querySelector('[data="' + e.target.id + '"]').remove()
            refreshCart();
        }
        if (itemsInCart === null === undefined || itemsInCart.length === 0) {
            document.querySelector('#in-cart').innerHTML = 'Votre Panier est vide !'
            refreshCart();
        }
    }
    refreshCart();
}

function insLocalStorage() {
    if (localStorage === null | localStorage.inCart.length === 0 | localStorage.length === 0 | localStorage === undefined ) { //if first time connecting to this website
        itemsInCart = []
        document.querySelector('#in_cart_count').innerHTML = '0'
        return "ok"
    } else {
        itemsInCart = JSON.parse(localStorage.getItem('inCart'))
        refreshCart();
        return "ok"
    };
}

function validationForm() {
    let name = document.querySelector('#name').value
    let firstName = document.querySelector('#first-name').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#adress').value
    let city = document.querySelector('#city').value
    let CP = document.querySelector('#CP').value
    let regexMail = /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}$/
    let regexCP = new RegExp('[0-9]{5}')
    let regexName = /^[a-zA-Z0-9._-]+$/
    if (name.length < 2 || firstName.length < 2 || email.length < 2 || address.length < 2 || city.length < 2 || CP.length < 2) {
        return false
    }
    else if (!regexName.test(name) || !regexName.test(firstName)) {
        return false
    }
    else if (!regexMail.test(email)) {
        return false
    }
    else if (!regexCP.test(CP)) {
        return false
    }
    else {
        return true
    }
}

function insProductHTML() {
    if (cart === undefined || cart.length === 0 || itemsInCart.length === 0 || itemsInCart === null === undefined) {
        document.querySelector('#in-cart').innerHTML = "Votre panier est vide.... (ou presque !)"
    } else {
        document.querySelector('#in-cart-list').insertAdjacentHTML('beforeend',
            `
            <section class="col-md-12 col-sm-12 d-none d-md-block">
                <div class="row border-bottom border-light">
                    <div class="col-4 col-md-3  text-center ">
                        <p>désignation</p>
                    </div>
                    <div class='col-5'>
                        <div class='row'>
                            <div class="col-4 text-center d-none d-md-block ">
                                <p>couleur</p>
                            </div>
                            <div class="col-8 text-center">
                                <p>quantité</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <p>sous-total</p>
                    </div>
                </div>
            </section>
            `
        )
        for (let j = 0; j < itemsInCart.length; j++) {
            for (let i = 0; i < storedItems.length; i++) {
                if (storedItems[i]._id === itemsInCart[j].id) {
                    document.querySelector('#in-cart-list').insertAdjacentHTML('beforeend',
                        `
                        <section class="col-12 in-cart-object" data="${storedItems[i]._id}-${itemsInCart[j].color}">
                            <div class="row py-3 border-top border-bottom border-light ">
                                <div class="col-4 col-md-3">
                                    <div class='row'>
                                        <img src="${storedItems[i].imageUrl}" class="w-100 border border-secondary col-md-4 col-12 p-0" alt="image de ${storedItems[i].name}">
                                        <div class="col-12 col-md-8 text-center">
                                        <p> ${storedItems[i].name} </p>
                                        </div>
                                    </div>
                                </div>
                                <div class='col-5'>
                                    <div class='row h-100 align-content-between'>
                                        <div class="col-md-4 text-center col-12">
                                            <p> ${itemsInCart[j].color} </p>
                                        </div>
                                        <div class="col-md-8 text-center col-12">
                                            <p><button type="button" class="btn-outline-info remove-one mr-1" id="${storedItems[i]._id}-${itemsInCart[j].color}">-</button><span data-qty="${storedItems[i]._id}-${itemsInCart[j].color}">${itemsInCart[j].qty}</span><button type="button" class="btn-outline-info add-one ml-1" id="${storedItems[i]._id}-${itemsInCart[j].color}">+</button></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class='row h-100 align-content-between'>
                                        <div class="col-12 col-md-6">
                                            <p data-total="${storedItems[i]._id}-${itemsInCart[j].color}">${storedItems[i].price * itemsInCart[j].qty / 100} €</p>
                                        </div>
                                        <div class="col-md-4 col-12 p-0">
                                                <img class="delete-button w-50" id="${storedItems[i]._id}-${itemsInCart[j].color}" src="./img/cart/trash.svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        `
                    )
                }
            }
        }
        document.querySelector('#contact-form').insertAdjacentHTML('beforeend', `
                    <section class="container">
                                <div class="form-row mt-1">
                                    <label for='name' class="col-2">
                                        Nom
                                    </label>
                                    <input type="text" required class='col mx-2 form-control-sm' id="name" pattern="[a-zA-Z0-9._-]*" />
                                    <label for='first-name'>
                                        Prénom
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' required id="first-name" pattern="[a-zA-Z0-9._-]*" />
                                </div>
                                <div class="form-row mt-1">
                                    <label for='email' class="col-2">
                                        email
                                    </label>
                                    <input type="text" pattern="[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,10}"  class='col mx-2 form-control-sm' required  id="email"/>
                                </div>
                                <div class="form-row mt-1">
                                    <label for='adress' class='col-2'>
                                        adresse
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' required id="adress" />
                                </div>
                                <div class="form-row mt-1">
                                    <label for='CP' class='col-2'>
                                        CP
                                    </label>
                                    <input type="text" class='col-2 mx-2 form-control-sm' maxlength="5" id="CP" name="CP" pattern="[0-9]{5}"
                                        required>
                                    <label for='city' class='col-2'>
                                        Ville
                                    </label>
                                    <input type="text" class='col mx-2 form-control-sm' required id="city" name="city" />
                                </div>

                            </div>
                    </section>

                    `)
        document.querySelector('#payment').insertAdjacentHTML('beforeend', ` 
                    <div class="row mt-5">
                        <p> Mode de paiement (API non implémenté, input non-requis) </p>
                    </div>
                    <div class="form-row justify-content-center">
                            <input type='radio' name='payment-method' id="mastercard">
                            <label for="mastercard" class="col-4 col-md-2" control="mastercard">
                                <img src="./img/cart/mastercard.svg" class="mr-2" alt="mastercard" /> 
                            </label>

                            <input type='radio' id="visa" name='payment-method' class="ml-2" control="visa">
                            <label for="visa" class="col-4 col-md-2"><img src="./img/cart/visa.svg" alt="visa" /> </label>
                    </div>
                    <div class="form-group">
                        <label for="card-number" class="px-0 col-4">numéro de carte</label>
                        <input type="text" pattern="\d{16}" name='card-number' maxlength="16" id='card-number'
                            class='col-7 form-control-sm' />
                    </div>
                    <div class="form-group">
                        <label for="card-name" class='px-0 col-4'>Titulaire</label>
                        <input type="text" name='card-name' id='card-name' class="col-7 form-control-sm" />
                    </div>
                    <div class="form-row">
                        <div class="form-group col-6">
                            <label for="card-expire">exp</label>
                            <input type="text" class="col-4 form-control-sm" max="12" maxlength="2"
                                name='card-expire-month' id='card-expire' />
                            <input type="text" max="99" class="col-4 form-control-sm" maxlength="2" min="20"
                                name='card-expire-year' id="card-expire-year" />
                        </div>
                        <div class='form-group col-6 justify-content-end'>
                            <label for='card-code'>code :</label>
                            <input type="text" pattern="\d{3}" maxlength="3" id='card-code' name='card-code'
                                class="col-4 form-control-sm" />
                        </div>
                    </div>
        `)
    }

    refreshCart();
    //add remove and delete
    for (let i = 0; i < document.getElementsByClassName('add-one').length; i++) {
        document.getElementsByClassName('add-one')[i].addEventListener('click', addOne)
    }
    for (let i = 0; i < document.getElementsByClassName('remove-one').length; i++) {
        document.getElementsByClassName('remove-one')[i].addEventListener('click', removeOne)
    }
    for (let i = 0; i < document.getElementsByClassName('delete-button').length; i++) {
        document.getElementsByClassName('delete-button')[i].addEventListener('click', deleteOne)
    }
}

//POST to localhost:3000
var formContact = document.querySelector('#POSTdata')

function stringifyPost() {
    let name = document.querySelector('#name').value
    let firstName = document.querySelector('#first-name').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#adress').value
    let city = document.querySelector('#city').value
    let contact = {
        firstName: firstName,
        lastName: name,
        email: email,
        address: address,
        city: city
    }
    let products = []
    for (i = 0; i < itemsInCart.length; i++) {
        products.push(itemsInCart[i].id)
    }
    return JSON.stringify({
        contact,
        products
    })
}

formContact.addEventListener('click', function (e) { //submit
    if (validationForm()) {
        e.preventDefault();
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifyPost()

        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            sessionStorage.setItem('confirmation', JSON.stringify(itemsInCart))
            sessionStorage.setItem('contact', JSON.stringify(jsonResponse.contact))
            sessionStorage.setItem('orderId',jsonResponse.orderId)
            window.location.href = './order.html?confirmation=' + jsonResponse.orderId
        })
        .catch((error) => {
            alert('fetch POST error : ' + error)
        })
    }
    else if(!validationForm()){
        e.preventDefault()
        alert('veuillez vérifier vos informations de contact')
    }
})