const ApiK ="AIzaSyA8RaWOM9HDXS0n2e6LOSLM6c6fBgmdM1w";
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function htmlAddBook(SelectorBook){
    
    const newBtAddBook = document.createElement("input");
    newBtAddBook.setAttribute("type", "button");
    newBtAddBook.setAttribute("value", "Ajouter un livre");
    newBtAddBook.setAttribute("id", "bt-add-book");  
    insertAfter(newBtAddBook,SelectorBook);
}

function htmlform(SelectorBook){
    // création du formulaire
    const newform = document.createElement("form");
    newform.setAttribute("method", "post");
    newform.setAttribute("action", "ptraitement.php");
    newform.setAttribute("id", "form-search");
    // champ titre
    const newlabeltitre = document.createElement("label");
    newlabeltitre.setAttribute("for", "Titre");
    newlabeltitre.innerHTML= "Titre du livre";
    const newinputtitre = document.createElement("input");
    newinputtitre.setAttribute("type", "text");
    newinputtitre.setAttribute("name", "Titre");
    newinputtitre.setAttribute("id", "form-titre");
    //champ auteur
    const newlabelauteur = document.createElement("label");
    newlabelauteur.setAttribute("for", "Auteur");
    newlabelauteur.innerHTML= "Auteur";
    const newinputauteur = document.createElement("input");
    newinputauteur.setAttribute("type", "text");
    newinputauteur.setAttribute("name", "Auteur");
    newinputauteur.setAttribute("id", "form-auteur");
    // bouton submit
    const newinputsubmit = document.createElement("input");
    newinputsubmit.setAttribute("type", "submit");
    newinputsubmit.setAttribute("value", "Rechercher");
    //ajout dans le DOM
    insertAfter(newform,SelectorBook);
    newform.appendChild(newlabeltitre);
    newform.appendChild(newinputtitre);
    newform.appendChild(newlabelauteur);
    newform.appendChild(newinputauteur);
    newform.appendChild(newinputsubmit);
    newform.style.display = 'none';

}

function htmlCancelSearchBt(SelectorBook){
    
    const newBtCancelSearch = document.createElement("input");
    newBtCancelSearch.setAttribute("type", "button");
    newBtCancelSearch.setAttribute("value", "Annuler");
    newBtCancelSearch.setAttribute("id", "bt-cancel-search");  
    insertAfter(newBtCancelSearch,SelectorBook);
    newBtCancelSearch.style.display = 'none';
}

function hideBt(){

    document.getElementById("bt-add-book").addEventListener('click', function () {
        document.getElementById("form-search").style.display = 'inline-block';
        document.getElementById("bt-cancel-search").style.display = 'inline-block'; 
        document.getElementById("bt-add-book").style.display = 'none';    
    });
    document.getElementById("bt-cancel-search").addEventListener('click', function () {
        document.getElementById("form-search").style.display = 'none';
        document.getElementById("bt-cancel-search").style.display = 'none';
        document.getElementById("bt-add-book").style.display = 'inline-block';  
    });

}

function requestGet(URL){

    console.log("start");
    if (window.fetch) {

    fetch(URL).then(function (responce){
        if (responce.ok) {
            return responce.json();
        } else {
            console.error("Ereur : "+ responce.status);
        }
        
    });

    } else {
        return new Promise(function(resolve,reject){
            console.log("promise");
            let xhr = new window.XMLHttpRequest();
            xhr.onreadystatechange = function(){
                console.log("rdy");
                if(xhr.readyState === 4){
                    if (xhr.status === 200) {
                        console.log("saplante");
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr);
                    }
                }
            }
            xhr.open('GET',URL,true);
            xhr.send();
        })
    }



    

/*
    let requestapigooglebook = new XMLHttpRequest(); 
    requestapigooglebook.open('GET', URL);
    //Si la demande aboutit, le serveur répond avec un 200 OKcode d'état HTTP et les résultats du volume:
    requestapigooglebook.onreadystatechange = function() {
        if (requestapigooglebook.readyState === 4) { //"200 OKcode"
            let requestresult = JSON.parse(requestapigooglebook.responseText);
            displaybook(requestresult);
           //faire le traitement
           
        }
    };
    requestapigooglebook.send();
*/

}

function displaybook(requestresult){

    let divContent =document.getElementById("content");
    // metre chaque element dans les balise html corespondente
    
    for(let i =0;i<requestresult.totalItems;i++){//1 a remplacer par le nombre d element a traiter
        //console.log(requestresult.items[i].authors);
        newItemcontainer = document.createElement("div");
        newItemcontainer.setAttribute("class", "enumbook");

        newItemtitle = document.createElement("p");
        newItemtitle.setAttribute("class", "titlebook");
        newItemtitle.setAttribute("value", requestresult.items[i].volumeInfo.title);

        newItemid = document.createElement("p");
        newItemid.setAttribute("class", "idbook");
        newItemid.setAttribute("value", requestresult.items[i].id);

        newItemauthor = document.createElement("p");
        newItemauthor.setAttribute("class", "authorbook");
        newItemauthor.setAttribute("value", requestresult.items[i].volumeInfo.authors);// verif si cela affiche tt les auteur

        newItemdescription = document.createElement("p");
        newItemdescription.setAttribute("class", "descriptionbook");
        newItemdescription.setAttribute("value", requestresult.items[i].volumeInfo.description);

        newItemimg = document.createElement("img");
        newItemimg.setAttribute("class", "imgbook");
        newItemimg.setAttribute("src", requestresult.items[i].imageLinks.thumbnail);// penser a gerer les tail pour le responsive

        newItemcontainer.appendChild(newItemtitle);
        newItemcontainer.appendChild(newItemid);
        newItemcontainer.appendChild(newItemauthor);
        newItemcontainer.appendChild(newItemdescription);
        newItemcontainer.appendChild(newItemimg);

        divContent.appendChild(newItemcontainer);
    }
    
    //c la mm chause
   /* requestItems.items.map(items => {

        newItemcontainer = document.createElement("div");
        newItemcontainer.setAttribute("class", "enumbook");

        newItemtitle = document.createElement("p");
        newItemtitle.setAttribute("class", "titlebook");
        newItemtitle.setAttribute("value", items.title);

        newItemid = document.createElement("p");
        newItemid.setAttribute("class", "idbook");
        newItemid.setAttribute("value", items.id);

        newItemauthor = document.createElement("p");
        newItemauthor.setAttribute("class", "authorbook");
        newItemauthor.setAttribute("value", items.authors);

        newItemdescription = document.createElement("p");
        newItemdescription.setAttribute("class", "descriptionbook");
        newItemdescription.setAttribute("value", items.description);

        newItemimg = document.createElement("img");
        newItemimg.setAttribute("class", "imgbook");
        newItemimg.setAttribute("src", items.imageLinks.thumbnail);// penser a gerer les tail pour le responsive

        newItemcontainer.appendChild(newItemtitle);
        newItemcontainer.appendChild(newItemid);
        newItemcontainer.appendChild(newItemauthor);
        newItemcontainer.appendChild(newItemdescription);
        newItemcontainer.appendChild(newItemimg);

        divContent.appendChild(newItemcontainer);


    });*/
    // remplacer par des acolade + mon code de dans item.truc
    //requestItems.item.map(item => console.log(item));
    //console.log(typeof maVariable);
} 
function searchBook(titre,auteur){
    //penser a netoyer l affichage precedent
    console.log("recherche");
    let URL="https://www.googleapis.com/books/v1/volumes?q=";
    URL=URL+"inauthor:"+auteur+"+"+"intitle:"+titre+"&key="+ApiK;
    //
    requestGet(URL).then(function (response){
        displaybook(JSON.parse(response));
    }).catch(function (error){
        console.error(error);
    });
    


}

function waitSearch(){

    document.getElementById("form-search").addEventListener('click', function () {
        searchBook(document.getElementById("form-titre").value,document.getElementById("form-auteur").value);      
    });

}



window.onload = function () {
    let SelectorBook = document.querySelector("#myBooks h2");
    htmlAddBook(SelectorBook);
    htmlCancelSearchBt(SelectorBook);
    htmlform(SelectorBook);
    hideBt();
    console.log("main");
    waitSearch();

   
}



console.log("coucou");
