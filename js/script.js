//Clef de  l'Api
const ApiK ="AIzaSyA8RaWOM9HDXS0n2e6LOSLM6c6fBgmdM1w";
//fonction qui permet de metre un element apre un autre 
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
//crée et place place le bouton pour ajouter un livre (dans une div pour permetre dapliquer le css)
function htmlAddBook(SelectorBook){
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "center");
    const newBtAddBook = document.createElement("input");
    newBtAddBook.setAttribute("type", "button");
    newBtAddBook.setAttribute("value", "Ajouter un livre");
    newBtAddBook.setAttribute("class", "button");
    newBtAddBook.setAttribute("id", "bt-add-book");
    newDiv.appendChild(newBtAddBook);
    insertAfter(newDiv,SelectorBook);
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
    newinputsubmit.setAttribute("class", "button");
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
    document.getElementById("myBooks").insertBefore(newresult,document.querySelector("hr"));

}
//crée le bouton d anulation et le rend invisible 
function htmlCancelSearchBt(SelectorBook){
    
    const newBtCancelSearch = document.createElement("input");
    newBtCancelSearch.setAttribute("type", "button");
    newBtCancelSearch.setAttribute("value", "Annuler");
    newBtCancelSearch.setAttribute("class", "button");
    newBtCancelSearch.setAttribute("id", "bt-cancel-search");  
    insertAfter(newBtCancelSearch,SelectorBook);
    newBtCancelSearch.style.display = 'none';
}
//cette fontion crée deux listeneur sur l'apuit des boutons pour masquer et afficher le contenu de la page en fonction de l action utilisateur
function hideBt(){

    document.getElementById("bt-add-book").addEventListener('click', function () {
        document.getElementById("form-search").style.display = 'flex';
        document.getElementById("bt-cancel-search").style.display = 'inline-block'; 
        document.getElementById("bt-add-book").style.display = 'none';    
    });
    document.getElementById("bt-cancel-search").addEventListener('click', function () {
        document.getElementById("form-search").style.display = 'none';
        document.getElementById("bt-cancel-search").style.display = 'none';
        document.getElementById("bt-add-book").style.display = 'inline-block'; 
        document.getElementById("result-search").innerHTML="";
    });

}
// fait une requete a partir  d'une url et retourne une reponce
function requestGet(URL){

    return fetch(URL).then(function (response){
        if (response.ok) {
            return response.json();
            
        } else {
            console.error("Ereur : "+ response.status);//retour l ereur si il y a
        }
        
    });

}
//fonction d'affichage des liste de livre prend en parametre une liste de livre et un type d affichage en fonction si celui ci est une recher ou une liste d enregistrement
function displaybook(requestresult,typeAffichage){

    

    container = document.createElement("div");
    container.setAttribute("class", "enumbookList");
    if (requestresult.items === undefined) {//si aucun livre on inser celeument l information
        newItemNotFound = document.createElement("p");
        newItemNotFound.setAttribute("class", "idNotFound");
        newItemNotFound.innerHTML="Aucun livre n’a été trouvé";
        container.appendChild(newItemNotFound);
    }else {
    


        

        requestresult.items.map(item => {// pacour de la liste de livre
        newItemcontainer = document.createElement("div");
        newItemcontainer.setAttribute("class", "enumbook");
        // creation la balise dajou ou supresion du livre en fonction du type
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

        //creation des diver balise et ajou des contenu associer
        newItemtitle = document.createElement("p");
        newItemtitle.setAttribute("class", "titlebook");
        newItemtitle.innerHTML="Titre: "  + item.volumeInfo && item.volumeInfo.title ? item.volumeInfo.title : '';

        newItemid = document.createElement("p");
        newItemid.setAttribute("class", "idbook");
        newItemid.innerHTML="ID: " +item.id;

        newItemauthor = document.createElement("p");
        newItemauthor.setAttribute("class", "authorbook");
        newItemauthor.innerHTML="Auteur: " +item["volumeInfo"].authors;

        newItemdescription = document.createElement("p");
        newItemdescription.setAttribute("class", "descriptionbook");
        // verification de l existance d'une description
        if(item["volumeInfo"].imageLinks != undefined){
        newItemdescription.innerHTML="Description: " + item["volumeInfo"].description.substr(0,200);
        }else{
        newItemdescription.innerHTML="Description: Information manquante";
       }
       // verification de l existance d'une image 
        if(item["volumeInfo"].imageLinks != undefined){
        newItemimg = document.createElement("img");
        newItemimg.setAttribute("class", "imgbook");
        newItemimg.setAttribute("src", item["volumeInfo"].imageLinks.smallThumbnail);// penser a gerer les tail pour le responsive

        }else{
        
            newItemimg = document.createElement("img");
            newItemimg.setAttribute("class", "imgbook");
            newItemimg.setAttribute("src", "./img/unavailable.png"); 
           
        }
        let newDivimg = document.createElement("div");//ajout d une div pour centrer l image
        newDivimg.appendChild(newItemimg);
// association des balise a un contenaire principal
        newItemcontainer.appendChild(newIcon);
        newItemcontainer.appendChild(newItemtitle);
        newItemcontainer.appendChild(newItemid);
        newItemcontainer.appendChild(newItemauthor);
        newItemcontainer.appendChild(newItemdescription);
        newItemcontainer.appendChild(newDivimg);

        container.appendChild(newItemcontainer);
    });
}
    return container; //envoi du conteneur
} 
//fonction de recherche de livre
function searchBook(titre,auteur){

    let URL="https://www.googleapis.com/books/v1/volumes?q=";
    URL=URL+"inauthor:"+auteur+"+"+"intitle:"+titre+"&key="+ApiK;
    requestGet(URL).then((response) => {
    document.getElementById("result-search").innerHTML="";
    if (response.items === null) {
        document.getElementById("result-search").createElement("p").innerHTML="Aucun résultat";
    } else {
        document.getElementById("result-search").innerHTML="<hr><h2>Résultat de recherche</h2>"
        document.getElementById("result-search").appendChild(displaybook(response,"0"));      
        addEventSaveBook();
    }
    }).catch((error) =>
        console.error(error)
    );
    


}
//fonction declanchan la recherche des livre si apuit sur le bouton corespondent
function waitSearch(){

    document.getElementById("bt-search").addEventListener('click', function () {
        let title = document.getElementById("form-titre").value;
        let autor = document.getElementById("form-auteur").value;
        if (title !== "" && autor !== "" && title !== null && autor !== null ) {
            searchBook(document.getElementById("form-titre").value,document.getElementById("form-auteur").value);
        }else{
            alert("Tous les champs ne sont pas remplis !");
        }              
    });

}
//fontion de recuperation des livre dans le session storage
function getBooks() {
    return JSON.parse(sessionStorage.getItem("TabBooksSave"));
}
//fontion d'ajou de livre dans le sesion storage prend en parametre la liste des livre a sauvegarder
function setBooks(monSaveBook){
    sessionStorage.setItem("TabBooksSave", JSON.stringify(monSaveBook));
}
// fontion ajouten un listeneur a chaque icon de sauvegarde
function addEventSaveBook(){
    
    let classStrok = document.querySelectorAll(".addB");
             
            Array.from(classStrok).forEach(element => {
            element.addEventListener('click', function () {
                let idSave = this.parentNode.querySelector(".idbook").textContent.substr(4);
                let monSaveBook = getBooks();
                if (monSaveBook !== "" && monSaveBook !== null) {
                        if (monSaveBook.some((elem => elem === idSave))) {
                            alert("Item déja enregistrer");
                        }else {
                            monSaveBook.push(idSave);
                            setBooks(monSaveBook);
                        }
                }else{
                    setBooks([idSave]);
                }
                viewMyBook()                 
                });
            });
           
    
}
// fontion ajouten un listeneur a chaque icon de supresion
function addEventDeletebook(){
    
    let classStrok = document.querySelectorAll(".delB");
             
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
//fontion qui demande une requete pour chaque id stoker dans un tableau paser en parametre et le debut de l url de la requete
function TabPromesse(URL,monSaveBook){
    let listebooks=[];

    for(let i =0;i<monSaveBook.length;i++){
        listebooks.push(requestGet(URL+monSaveBook[i]+"?key="+ApiK));        
    }
    return listebooks;

}
//fontion qui affiche les livre
function viewMyBook(){


    document.getElementById("content").innerHTML="<h2>Ma poch'liste</h2>";
    let monSaveBook =getBooks();
    console.log(monSaveBook);
    if (monSaveBook !== "" && monSaveBook !== null ) {//si le tableau existe       
        let URL="https://www.googleapis.com/books/v1/volumes/";       
        Promise.all(TabPromesse(URL,monSaveBook)).then((tabpromise) =>{
            document.getElementById("content").appendChild(displaybook({items: tabpromise},"1")); 
            addEventDeletebook();          
        }).catch((error) =>
        console.error(error)
       );
    
} 
  


}

// fontion qui se lance une foi que la page est charger pour inisialiser tout les fontion js et listeneur
window.onload = function () {
    let SelectorBook = document.querySelector("#myBooks h2");
    htmlAddBook(SelectorBook);
    htmlCancelSearchBt(SelectorBook);
    htmlform(SelectorBook);
    hideBt();
    viewMyBook();
    waitSearch();
  
}


