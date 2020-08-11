/* ------------------------- Page index ------------------------- */

const request = new XMLHttpRequest();
const products = document.querySelector('#products');
const url = 'http://localhost:3000/api/teddies';
const parameters = new URLSearchParams(window.location.search);
const section = document.getElementsByTagName('list1');

request.open("GET", "http://localhost:3000/api/teddies");
request.send();

request.onreadystatechange = function () { //requête pour aller chercher tous les teddies de l'api
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { //doit avoir été validée avec une réponse 200 pour être acceptée
       const response = JSON.parse(this.responseText); //parse de la réponse en JSON
       console.log(response);
        renderHTML(response); //argument 'response' qui sera réutilisé dans la fonction de création dynamique du contenu
    }
};




/* ------------------------- Products rendering ------------------------- */

function renderHTML(data) { //fonction de création du contenu HTML

    const div = document.createElement('div'); //création de la div qui accueillera le contenu
    div.setAttribute('class', 'card-deck'); //card-deck pour une stylisation par Bootstrap

    for (i = 0; i < data.length; i++) { //exécute la fonction pour chacun des teddies (i) présents dans data, data étant équivalent à la 'response' renvoyée par l'API, soit les teddies
        div.innerHTML += "<div class=\"card col\">" + "<img src=\" " + data[i].imageUrl + " \" alt = Teddy Bear class=\"card-img-top\" \> " + " <h5 class=\"card-title\">" + data[i].name + "</h5>" +
            "<p class=\"card-text\">" + data[i].description + "<br \>" + data[i].price / 100 + " €</p><p class=\"teddy-btn\" type=\"button\"><a class=\"teddyButton\" href=product.html?id=" + data[i]._id + ">Choisir ce Teddy !</a></p></div>";
    }

    products.appendChild(div); //pour lier le contenu créé à l'ancre 'products' dans le DOM
};