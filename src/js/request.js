//prendere tutti i dati della dashboard ed elaborare la richiesta all'API
function apiRequest(){
    
    //ingredients----------------------------------------------------------------------------------------------------------------
    var tmpIngredientsArray = document.getElementById('ingredientsList').getElementsByTagName("span");
    var ingredients = "";
    for(i = 0; i<tmpIngredientsArray.length; i++){
        ingredients += tmpIngredientsArray[i].innerText;
        if(i<tmpIngredientsArray.length-1){
            ingredients += "-";
        }
    }
    //undesired----------------------------------------------------------------------------------------------------------------
    var tmpUndesiredsArray = document.getElementById('undesiredsList').getElementsByTagName("span");
    var undesireds = "";
    for(i = 0; i<tmpUndesiredsArray.length; i++){
        undesireds += "&excluded="+tmpUndesiredsArray[i].innerText;
    } 
    //maxIngredients----------------------------------------------------------------------------------------------------------------
    if(document.getElementById('max-ingredients').innerText!="unlimited"){
        var maxIngredients = "&ingr="+document.getElementById('max-ingredients').innerText;
    }else{
        var maxIngredients ="";
    }
    //dietArray and healthArray----------------------------------------------------------------------------------------------------------------
    var checkboxArray = document.getElementById('health-parameters').getElementsByTagName("div");
    healthArray = "";
    for(i = 0;i<checkboxArray.length; i++){
        if(checkboxArray[i].children[0].checked){
             healthArray += "&health="+checkboxArray[i].children[0].name;
        }
    }
    var checkboxArray = document.getElementById('diet-parameters').getElementsByTagName("div");
    dietArray = "";
    for(i = 0;i<checkboxArray.length; i++){
        if(checkboxArray[i].children[0].checked){
            dietArray += "&diet="+checkboxArray[i].children[0].id;
        }
    }
    //api request----------------------------------------------------------------------------------------------------------------
    var apiRequest = `https://api.edamam.com/search?q=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=100${dietArray}${healthArray}${maxIngredients}${undesireds}`;
}