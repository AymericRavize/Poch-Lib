//Clef de  l'Api
const apiK = "AIzaSyA8RaWOM9HDXS0n2e6LOSLM6c6fBgmdM1w";
//fonction qui permet de mettre un élément après un autre 
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
//crée et place le bouton pour ajouter un livre (dans une div pour permettre d'appliquer le css)
function htmlAddBook(selectorBook) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "center");
    const newBtAddBook = document.createElement("input");
    newBtAddBook.setAttribute("type", "button");
    newBtAddBook.setAttribute("value", "Ajouter un livre");
    newBtAddBook.setAttribute("class", "button");
    newBtAddBook.setAttribute("id", "bt-add-book");
    newDiv.appendChild(newBtAddBook);
    insertAfter(newDiv, selectorBook);
}

function htmlform(selectorBook) {
    // création du formulaire
    const newForm = document.createElement("div");
    newForm.setAttribute("id", "form-search");
    // champ titre
    const newLabelTitre = document.createElement("label");
    newLabelTitre.setAttribute("for", "Titre");
    newLabelTitre.innerHTML = "Titre du livre";
    const newInputTitre = document.createElement("input");
    newInputTitre.setAttribute("type", "text");
    newInputTitre.setAttribute("name", "Titre");
    newInputTitre.setAttribute("id", "form-titre");
    //champ auteur
    const newLabelAuteur = document.createElement("label");
    newLabelAuteur.setAttribute("for", "Auteur");
    newLabelAuteur.innerHTML = "Auteur";
    const newInputAuteur = document.createElement("input");
    newInputAuteur.setAttribute("type", "text");
    newInputAuteur.setAttribute("name", "Auteur");
    newInputAuteur.setAttribute("id", "form-auteur");
    // bouton submit
    const newInputSubmit = document.createElement("input");
    newInputSubmit.setAttribute("type", "button");
    newInputSubmit.setAttribute("value", "Rechercher");
    newInputSubmit.setAttribute("class", "button");
    newInputSubmit.setAttribute("id", "bt-search");
    //ajout dans le DOM
    insertAfter(newForm, selectorBook);
    newForm.appendChild(newLabelTitre);
    newForm.appendChild(newInputTitre);
    newForm.appendChild(newLabelAuteur);
    newForm.appendChild(newInputAuteur);
    newForm.appendChild(newInputSubmit);
    newForm.style.display = 'none';
    // crée la div qui acueillera le résultat
    const newResult = document.createElement("div");
    newResult.setAttribute("id", "result-search");
    document.getElementById("myBooks").insertBefore(newResult, document.querySelector("hr"));

}
//crée le bouton d annulation et le rend invisible 
function htmlCancelSearchBt(selectorBook) {

    const newBtCancelSearch = document.createElement("input");
    newBtCancelSearch.setAttribute("type", "button");
    newBtCancelSearch.setAttribute("value", "Annuler");
    newBtCancelSearch.setAttribute("class", "button");
    newBtCancelSearch.setAttribute("id", "bt-cancel-search");
    insertAfter(newBtCancelSearch, selectorBook);
    newBtCancelSearch.style.display = 'none';
}
//cette fontion crée deux listener sur l'appui des boutons pour masquer et afficher le contenu de la page en fonction de l'action utilisateur
function hideBt() {

    document.getElementById("bt-add-book").addEventListener('click', function () {
        document.getElementById("form-search").style.display = 'flex';
        document.getElementById("bt-cancel-search").style.display = 'inline-block';
        document.getElementById("bt-add-book").style.display = 'none';
    });
    document.getElementById("bt-cancel-search").addEventListener('click', function () {
        document.getElementById("form-search").style.display = 'none';
        document.getElementById("bt-cancel-search").style.display = 'none';
        document.getElementById("bt-add-book").style.display = 'inline-block';
        document.getElementById("result-search").innerHTML = "";
    });

}
// fait une requête à partir  d'une url et retourne une promesse
function requestGet(url) {

    return fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();

        } else {
            console.error("Ereur : " + response.status);//retourne l'erreur s'il y en a
        }

    });

}
//fonction d'affichage des listes de livres prend en paramètre une liste de livres et un type d'affichage en fonction si celui-ci est une recherche ou une liste d'enregistrements
function displaybook(requestResult, typeAffichage) {

    container = document.createElement("div");
    container.setAttribute("class", "enumbookList");
    if (requestResult.items === undefined) {//si aucun livre on insère seulement l'information
        let newItemNotFound = document.createElement("p");
        newItemNotFound.setAttribute("class", "idNotFound");
        newItemNotFound.innerHTML = "Aucun livre n’a été trouvé";
        container.appendChild(newItemNotFound);
    } else {

        requestResult.items.map(item => {// parcours de la liste de livres
            let newItemContainer = document.createElement("div");
            newItemContainer.setAttribute("class", "enumbook");
            // création de la balise d'ajout ou suppression du livre en fonction du type
            switch (typeAffichage) {
                case "0":
                    newIcon = document.createElement("i");
                    newIcon.setAttribute("class", "fas fa-bookmark addB");
                    break;
                case "1":
                    newIcon = document.createElement("i");
                    newIcon.setAttribute("class", "fas fa-trash delB");
                    break;

                default:
                    console.log("error affichage icon");
                    break;
            }

            //création des diverses balises et ajout des contenus associés
            newItemTitle = document.createElement("p");
            newItemTitle.setAttribute("class", "titlebook");
            newItemTitle.innerHTML = "Titre: " + item.volumeInfo && item.volumeInfo.title ? item.volumeInfo.title : '';

            newItemId = document.createElement("p");
            newItemId.setAttribute("class", "idbook");
            newItemId.innerHTML = "ID: " + item.id;

            newItemAuthor = document.createElement("p");
            newItemAuthor.setAttribute("class", "authorbook");
            newItemAuthor.innerHTML = "Auteur: " + item["volumeInfo"].authors;

            newItemDescription = document.createElement("p");
            newItemDescription.setAttribute("class", "descriptionbook");
            // vérification de l'existence d'une description
            if (item["volumeInfo"].description != undefined) {
                newItemDescription.innerHTML = "Description: " + item["volumeInfo"].description.substr(0, 200);
            } else {
                newItemDescription.innerHTML = "Description: Information manquante";
            }
            // vérification de l'existence d'une image 
            if (item["volumeInfo"].imageLinks != undefined) {
                newItemImg = document.createElement("img");
                newItemImg.setAttribute("class", "imgbook");
                newItemImg.setAttribute("src", item["volumeInfo"].imageLinks.smallThumbnail);

            } else {

                newItemImg = document.createElement("img");
                newItemImg.setAttribute("class", "imgbook");
                newItemImg.setAttribute("src", "./img/unavailable.png");

            }
            let newDivImg = document.createElement("div");//ajout d'une div pour centrer l'image
            newDivImg.appendChild(newItemImg);
            // association des balises à un container principal
            newItemContainer.appendChild(newIcon);
            newItemContainer.appendChild(newItemTitle);
            newItemContainer.appendChild(newItemId);
            newItemContainer.appendChild(newItemAuthor);
            newItemContainer.appendChild(newItemDescription);
            newItemContainer.appendChild(newDivImg);

            container.appendChild(newItemContainer);
        });
    }
    return container; //envoi du container
}
//fonction de recherche de livres
function searchBook(titre, auteur) {

    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    url = url + "inauthor:" + auteur + "+" + "intitle:" + titre + "&key=" + apiK;
    requestGet(url).then((response) => {
        document.getElementById("result-search").innerHTML = "";
        if (response.items === null) {
            document.getElementById("result-search").createElement("p").innerHTML = "Aucun résultat";
        } else {
            document.getElementById("result-search").innerHTML = "<hr><h2>Résultat de recherche</h2>"
            document.getElementById("result-search").appendChild(displaybook(response, "0"));
            addEventSaveBook();
        }
    }).catch((error) =>
        console.error(error)
    );

}
//fonction déclenchant la recherche des livres si appui sur le bouton correspondant
function waitSearch() {

    document.getElementById("bt-search").addEventListener('click', function () {
        let title = document.getElementById("form-titre").value;
        let autor = document.getElementById("form-auteur").value;
        if (title !== "" && autor !== "" && title !== null && autor !== null) {
            searchBook(document.getElementById("form-titre").value, document.getElementById("form-auteur").value);
        } else {
            alert("Tous les champs ne sont pas remplis !");
        }
    });

}
//fontion de récupération des livres dans le session storage
function getBooks() {
    return JSON.parse(sessionStorage.getItem("TabBooksSave"));
}
//fontion d'ajout de livres dans le session storage prend en paramètre la liste des livres à sauvegarder
function setBooks(monSaveBook) {
    sessionStorage.setItem("TabBooksSave", JSON.stringify(monSaveBook));
}
// fontion ajoutant un listener à chaque icone de sauvegarde
function addEventSaveBook() {

    const classStrok = document.querySelectorAll(".addB");

    Array.from(classStrok).forEach(element => {
        element.addEventListener('click', function () {
            let idSave = this.parentNode.querySelector(".idbook").textContent.substr(4);
            let monSaveBook = getBooks();
            if (monSaveBook !== "" && monSaveBook !== null) {
                if (monSaveBook.some((elem => elem === idSave))) {
                    alert("Item déja enregistrer");
                } else {
                    monSaveBook.push(idSave);
                    setBooks(monSaveBook);
                }
            } else {
                setBooks([idSave]);
            }
            viewMyBook()
        });
    });
}
// fontion ajoutant un listener à chaque icone de suppression
function addEventDeletebook() {

    const classStrok = document.querySelectorAll(".delB");

    Array.from(classStrok).forEach(element => {
        element.addEventListener('click', function () {

            let idDelete = this.parentNode.querySelector(".idbook").textContent.substr(4);
            let monSaveBook = getBooks();

            monSaveBook = monSaveBook.filter(item => item !== idDelete);
            setBooks(monSaveBook);
            viewMyBook();
        });
    });
}
//fontion qui demande une requête pour chaque id stocké dans un tableau passé en paramètre et le début de l'url de la requête
function TabPromesse(url, monSaveBook) {

    let listeBooks = [];

    for (let i = 0; i < monSaveBook.length; i++) {
        listeBooks.push(requestGet(url + monSaveBook[i] + "?key=" + apiK));
    }

    return listeBooks;

}
//fontion qui affiche les livres
function viewMyBook() {

    document.getElementById("content").innerHTML = "<h2>Ma poch'liste</h2>";
    let monSaveBook = getBooks();
    console.log(monSaveBook);
    if (monSaveBook !== "" && monSaveBook !== null) {//si le tableau existe       
        let url = "https://www.googleapis.com/books/v1/volumes/";
        Promise.all(TabPromesse(url, monSaveBook)).then((tabpromise) => {
            document.getElementById("content").appendChild(displaybook({ items: tabpromise }, "1"));
            addEventDeletebook();
        }).catch((error) =>
            console.error(error)
        );
    }



}

// fontion qui se lance une fois que la page est chargée pour initialiser toutes les fonctions js et listener
window.onload = function () {

    const selectorBook = document.querySelector("#myBooks h2");
    htmlAddBook(selectorBook);
    htmlCancelSearchBt(selectorBook);
    htmlform(selectorBook);
    hideBt();
    viewMyBook();
    waitSearch();

}


