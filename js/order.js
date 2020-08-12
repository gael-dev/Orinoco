//order ID insertion
let orderID = window.location.search.split('=')[1]
document.querySelector('h2').innerHTML = 'commande n°' + orderID

//ins-recap insertion => sum of order
let insRecap = document.querySelector('#ins-recap')

console.log(sessionStorage.orderId)
if(orderID === sessionStorage.orderId){
    storedItems = JSON.parse(sessionStorage.items)

    let items = JSON.parse(localStorage.inCart)
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j< storedItems.length; j++){
            if(items[i].id === storedItems[j]._id){
                insRecap.insertAdjacentHTML('beforeend', `
                <div class='row'>
                    <div class='col-3 text-center'>
                        ${storedItems[j].name}
                    </div>
                    <div class='col-3 text-center'>
                        ${items[i].color}
                    </div>
                    <div class='col-3 text-center'>
                        ${items[i].qty}
                    </div>
                    <div class='col-3 text-center'>
                        ${items[i].qty * storedItems[j].price /100}€
                    </div>
                </div>
                `)
            }
        }
    }
    //info desti
    let infoDesti = document.querySelector('#infos-dest')
    let contact = JSON.parse(sessionStorage.contact)
    
    infoDesti.insertAdjacentHTML('beforeend',`
        <div class='row'>
            destinaire: ${contact.lastName} ${contact.firstName}
        </div>
        <div class='row'>
            email: ${contact.email}
        </div>
        <div class='row'>
            adresse: ${contact.address}
        </div>
        <div class='row'>
            ville: ${contact.city}
        </div>
    `)
}
else{
    document.querySelector('h1').innerHTML = "erreur 404 :'( commande non trouvé"
    document.querySelector('#order').remove()
}



sessionStorage.clear();
localStorage.clear();