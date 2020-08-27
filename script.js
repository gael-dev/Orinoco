var response;
const api = "http://localhost:3000/api/teddies"

//fetch method
const fetchGET = { //get
    method: 'GET',
    mode: 'cors'
}

function insItems() {
    storedItems.forEach((element, index) => {//insert all teddies in a list
        //insert card
        document.querySelector('#objectList').insertAdjacentHTML("beforeend", `
        <article class="card col-md-5 align-content-between col-8 mx-auto p-0 ml-2 mr-2 mb-2" id="card_' + index + '"data-id=" ${storedItems[index]._id}">
                <a href="./product.html?${storedItems[index]._id}" >
                    <img class="card-img-top border border-light" id="card-img_' + index + '" alt="image de ${storedItems[index].name}" src="${storedItems[index].imageUrl}"/>
                </a>
                <div class="card-body" id="card-body_${index}"> 
                    <a href="./product.html?${storedItems[index]._id}" >
                        <div class="card-title text-center" id="card-title_${index}">
                        ${storedItems[index].name}
                        </div>
                    </a>
                    <div class="card-text text-center" id="card-text_${index}">
                    ${storedItems[index].price / 100}\u20ac
                    </div>
                    <div class="row">
                    <a href='./product.html?${storedItems[index]._id}' class="btn add_cart mx-auto btn-success" id="${storedItems[index]._id}">
                        Personnalisez votre nounours !
                    </a>
                </div>
            </div>
        </article>
        `);
    })
}

if (sessionStorage.items === null || sessionStorage.items === undefined || sessionStorage.items.length === 0) {
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
            document.querySelector('.listed-Object').innerHTML = error
        });
}
else {
    storedItems = JSON.parse(sessionStorage.items)
    insItems();
    insPopover()
}

refreshCart();
