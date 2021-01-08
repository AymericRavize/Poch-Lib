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
    const newform = document.createElement("div");
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
    newinputsubmit.setAttribute("type", "button");
    newinputsubmit.setAttribute("value", "Rechercher");
    newinputsubmit.setAttribute("id", "bt-search");
    //ajout dans le DOM
    insertAfter(newform,SelectorBook);
    newform.appendChild(newlabeltitre);
    newform.appendChild(newinputtitre);
    newform.appendChild(newlabelauteur);
    newform.appendChild(newinputauteur);
    newform.appendChild(newinputsubmit);
    newform.style.display = 'none';
    // crée la div qui acuellera le resulta
    const newresult = document.createElement("div");
    newresult.setAttribute("id", "result-search");
    insertAfter(newresult,document.querySelector("hr"));

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
        document.getElementById("result-search").empty(); 
    });

}

function requestGet(URL){
/*
    console.log("start");
    if (window.fetch) {
*/
    return fetch(URL).then(function (response){
        if (response.ok) {
            return response.json();
        } else {
            console.error("Ereur : "+ response.status);
        }
        
    });
/*
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
    }*/



    

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

function displaybook(requestresult,typeAffichage){

    
    // metre chaque element dans les balise html corespondente
    //console.log(requestresult);
    
    //for(let i =0;i<requestresult.totalItems;i++){//1 a remplacer par le nombre d element a traiter
        //console.log(requestresult.items[i].authors);

        container = document.createElement("div");
        container.setAttribute("class", "enumbookList");

        requestresult.items.map(item => {
        //console.log(item["volumeInfo"]);

        newItemcontainer = document.createElement("div");
        newItemcontainer.setAttribute("class", "enumbook");

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


        newItemtitle = document.createElement("p");
        newItemtitle.setAttribute("class", "titlebook");
        newItemtitle.innerHTML="Titre: " + item["volumeInfo"].title;

        newItemid = document.createElement("p");
        newItemid.setAttribute("class", "idbook");
        newItemid.innerHTML="ID: " +item.id;

        newItemauthor = document.createElement("p");
        newItemauthor.setAttribute("class", "authorbook");
        newItemauthor.innerHTML="Auteur: " +item["volumeInfo"].authors;// verif si cela affiche tt les auteur

        newItemdescription = document.createElement("p");
        newItemdescription.setAttribute("class", "descriptionbook");
        if(item["volumeInfo"].imageLinks != undefined){
        newItemdescription.innerHTML="Description: " + item["volumeInfo"].description.substr(0,200);
        }else{
        newItemdescription.innerHTML="Description: Information manquante";
       }
/*
        console.log(item["volumeInfo"].imageLinks != undefined);
        console.log(item["volumeInfo"].imageLinks.smallThumbnail);
*/
        if(item["volumeInfo"].imageLinks != undefined){
        newItemimg = document.createElement("img");
        newItemimg.setAttribute("class", "imgbook");
        newItemimg.setAttribute("src", item["volumeInfo"].imageLinks.smallThumbnail);// penser a gerer les tail pour le responsive

        }else{// metre image dans lien
        
            newItemimg = document.createElement("img");
            newItemimg.setAttribute("class", "imgbook");
            newItemimg.setAttribute("src", "./img/unavailable.png"); 

        }
        
        newItemcontainer.appendChild(newIcon);
        newItemcontainer.appendChild(newItemtitle);
        newItemcontainer.appendChild(newItemid);
        newItemcontainer.appendChild(newItemauthor);
        newItemcontainer.appendChild(newItemdescription);
        newItemcontainer.appendChild(newItemimg);
//modif location
        container.appendChild(newItemcontainer);
        //document.getElementById("content").appendChild(newItemcontainer);
    });
    return container;
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
    requestGet(URL).then((response) => {
    document.getElementById("result-search").innerHTML="";
    if (response.items === null) {
        document.getElementById("result-search").createElement("p").innerHTML="Aucun résultat";
    } else {
        document.getElementById("result-search").appendChild(displaybook(response,"0"));
        SaveBook();//si des element son crée
    }
    }).catch((error) =>
        console.error(error)
    );
    


}

function waitSearch(){

    document.getElementById("bt-search").addEventListener('click', function () {
        searchBook(document.getElementById("form-titre").value,document.getElementById("form-auteur").value);      
    });

}
function creatTabSave(){

    if (sessionStorage.getItem("TabBookSave") === null) {//si le tableau existe
        sessionStorage.setItem("TabBookSave",[]);
        
    } 
}

function ifSaveExite(idBook,tab){//regarde si id paser est deja presente

    for (let i = 0; i < tab.length; i++) {
        if (tab[i] === idBook) {
            return true;
        }
        
    }
    return false;
}

function SaveBook(){
    
    document.querySelector(".addB").addEventListener('click', function () {
           
           let idSave = this.parentNode.querySelector(".idbook").textContent.substr(4);
           let monItemSave = sessionStorage.getItem("TabBookSave");
           console.log(monItemSave);
           if (ifSaveExite(idSave,monItemSave)) {
               alert("Item déja enregistrer");
           } else {
               monItemSave.push(idSave);
               sessionStorage.setItem("TabBookSave", monSaveBook);
               viewMyBook();
           }
        Deletebook();
    });
    
}
function Deletebook(){
    
    document.querySelector(".delB").addEventListener('click', function () {
           
        let idDelete = this.parentNode.querySelector(".idbook").textContent.substr(4);
        let monItemSave = sessionStorage.getItem("TabBookSave");

        monItemSave = monItemSave.filter(item => item !== idDelete);
        sessionStorage.setItem("TabBookSave", monSaveBook);
        viewMyBook();
        
 });

}

function viewMyBook(){// fait l affichage de ce qui est dans le storage

    console.log("livre view");
    //faire un clear des element
    document.getElementById("content").innerHTML="";
    let montabextract =sessionStorage.getItem("TabBookSave");
    if (montabextract) {//si le tableau existe

       // let URL="https://www.googleapis.com/books/v1/volumes/"+montabextract[0];

        for(let i =1;i<montabextract.length;i++){
            URL=URL+montabextract[i]+"&key="+ApiK;// savoir commen recupere les livre d une liste d id
            requestGet(URL).then((response) => 
            document.getElementById("content").appendChild(displaybook(response,"1"))
            ).catch((error) =>
             console.error(error)
            );
        }

    
    
    //metre une variable vrai ou fau dans le display book pour afficher les icon en fonction un case c mieu pour les evol
    

    
} 
   /* newIcon = document.createElement("i");
    newIcon.setAttribute("class", "fas fa-trash addB");*/


//modif location



}


window.onload = function () {
    let SelectorBook = document.querySelector("#myBooks h2");
    htmlAddBook(SelectorBook);
    htmlCancelSearchBt(SelectorBook);
    htmlform(SelectorBook);
    hideBt();
    creatTabSave();
    viewMyBook();
    console.log("main");
    waitSearch();

    
    
   
}



console.log("coucou");
