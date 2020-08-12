var response;
const api = "http://localhost:3000/api/teddies"
let product

const fetchGET = { //get
    method: 'GET',
    mode: 'cors'
}

function objectIsEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

function clickAddCart() {
    document.querySelector('.add_cart').addEventListener('click', function (e) {//ADD CART on button listener
        let colorSelect = document.querySelector('#color-select_menu').value
        let isInCart = false
        if (itemsInCart.length > 0) {
            for (let i = 0; i < itemsInCart.length; i++) {
                if (this.id === itemsInCart[i].id && colorSelect === itemsInCart[i].color) {
                    itemsInCart[i].qty++
                    isInCart = true
                }
            }
            if (isInCart === false) {
                itemsInCart.push({ 'id': this.id, 'color': colorSelect, 'qty': 1 })

            }
        }
        else {
            itemsInCart.push({ 'id': this.id, 'color': colorSelect, 'qty': 1 })
        }
        cart.setItem('inCart', JSON.stringify(itemsInCart))
        refreshCart();
    });
}

function insProductHTML() {
    if (objectIsEmpty(product)) {
        document.querySelector('#product_body').insertAdjacentHTML('beforeend', `
        <div class='row'>
            <h1 class='mx-auto'> erreur 404   :'(        ce produit est introuvable</h1>
        </div>
        `)
        document.querySelector('title').innerHTML = 'Orinoco - produit non trouvé !'
    }
    else {
        document.querySelector('title').innerHTML = "orinoco - " + product.name
        document.querySelector('#product-title').innerHTML = product.name
        document.querySelector('#product_body').insertAdjacentHTML('beforeend', `
        <img class="col-sm-6 col-md-3 p-0 border border-secondary offset-md-1" src="${product.imageUrl}" alt="image de ${product.name}"/>
        <p class="col-md-4 col-sm-6" id="product_description">${product.description}</p>
        <div class="col-md-3 col-sm-10 d-flex flex-column justify-content-between align-items-center" id="product_cart_col">
            <form id="color-select">
                <label for="color-select_menu" id="color-label">Couleur :</label>
                <select required="" name="color-select_menu" id="color-select_menu" >
                </select>
            </form>
        </div>
        <h2>${product.price / 100}€</h2>
        <button type="button" class="btn add_cart mx-auto btn-success"  id="${product._id}">Ajouter au panier</button>
        `)
        for (let i = 0; i < product.colors.length; i++) {
            document.querySelector('#color-select_menu').insertAdjacentHTML('beforeend', '<option value="' + product.colors[i] + '">' + product.colors[i] + '</option>')
        }
    }
    if (localStorage === null) {//if first time connecting to this website
        itemsInCart = []
        document.querySelector('#card_button').innerHTML = '0'
    }
    else if (localStorage.length === 0) {
        itemsInCart = []
        document.querySelector('#card_button').innerHTML = '0'
    }
    else {
        itemsInCart = JSON.parse(cart.getItem('inCart'))
        refreshCart();
    }
    clickAddCart();
}

//REQ TO ID
//PRODUCT PAGE GET /:id
let chemin = window.location.search
let idProduct = chemin.substring(1)

if (sessionStorage.items === undefined) {
    fetch(api, fetchGET).then(
        (response) => {
            response.json().then(
                data => {
                    storedItems = data
                    if (data.length > 0) {//if teddy in stock
                        sessionStorage.setItem('items', JSON.stringify(data))
                        insItems();
                        insPopover()
                    }
                    else if (data.length === 0) {//if no teddy in stock
                        document.querySelector('#objectList').innerHTML = "Il n'y a plus d'article disponible!"
                    }
                }
            )
        }
    )
        .catch(error => {
            alert('error fetching data')
        });
    fetch(api + '/' + idProduct, fetchGET)
        .then(response => {
            try {
                response.json().then(
                    (data) => {
                        product = data
                        insProductHTML()
                        insPopover()
                    }
                )
            } catch {
                console.log('error parsing data')
            }
        })
        .catch(error => {
            document.querySelector('#product_body').insertAdjacentHTML('beforeend', `
    <div class='row'>
        <h1 class='mx-auto'> ${error}</h1>
    </div>
    `)
    })
}
else {
    storedItems = JSON.parse(sessionStorage.items)
    for (let i = 0; i < JSON.parse(sessionStorage.items).length; i++) {
        if (idProduct === JSON.parse(sessionStorage.items)[i]._id) {
            product = JSON.parse(sessionStorage.items)[i]
        }
    }
    insProductHTML();
    insPopover()
}

refreshCart();