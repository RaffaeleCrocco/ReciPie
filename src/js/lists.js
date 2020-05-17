function isEnterPress(event, ingredientTxt, ingredientsList){
    if(event.keyCode == 13){
        console.log(ingredientTxt, ingredientsList);
        createItem(ingredientTxt, ingredientsList);
    }    
}
function createItem(ingredientTxt, ingredientsList){
    var text = document.getElementById(ingredientTxt).value;
    //get rid of white space
    text=text.replace(/\s/g, '');
    if(text){
        //create a new listed ingredient
        var li = '<li class="list-group-item d-flex justify-content-between align-items-center"><span>' + text + '</span><a class="badge badge-primary badge-pill" onclick="deleteItem(this)">&times;</a></li>'; 
        //add new ingredient to the correct list
        document.getElementById(ingredientsList).innerHTML += li;
        document.getElementById(ingredientTxt).value = null;
    }
}
function deleteItem(element){
    element.parentElement.remove();
}