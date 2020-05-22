//global var 
var body = "";

//get api request based on user preferences
function apiRequest(){
    
    //ingredients-------------------------------------------------------------------------------------------------------------
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
    var undesiredsList = "";
    /*local storage:*/ var undesireds ="";
    for(i = 0; i<tmpUndesiredsArray.length; i++){
        undesiredsList += "&excluded="+tmpUndesiredsArray[i].innerText;
        /*local storage:*/ undesireds += '<li class="list-group-item d-flex justify-content-between align-items-center"><span>' + tmpUndesiredsArray[i].innerText + '</span><a class="badge badge-primary badge-pill" onclick="deleteItem(this)">&times;</a></li>';
    } 
    //maxIngredients------------------------------------------------------------------------------------------------------------
    if(document.getElementById('max-ingredients').innerText!="unlimited"){
        var maxIngredients = "&ingr="+document.getElementById('max-ingredients').innerText;
        /*local storage:*/ var max = document.getElementById('max-ingredients').innerText;
    }else{
        var maxIngredients ="";
    }
    //dietArray and healthArray-------------------------------------------------------------------------------------------------
    var checkboxArray = document.getElementById('health-parameters').getElementsByTagName("div");
    healthArray = "";
    /*local storage:*/ var health ="";
    for(i = 0;i<checkboxArray.length; i++){
        if(checkboxArray[i].children[0].checked){
            healthArray += "&health="+checkboxArray[i].children[0].name;
            /*local storage:*/ health += checkboxArray[i].children[0].name + " ";
        }
    }
    var checkboxArray = document.getElementById('diet-parameters').getElementsByTagName("div");
    dietArray = "";
    for(i = 0;i<checkboxArray.length; i++){
        if(checkboxArray[i].children[0].checked){
            dietArray += "&diet="+checkboxArray[i].children[0].id;
            /*local storage:*/ var diet = checkboxArray[i].children[0].id;
        }
    }

    //Save user preferences on local storage
    localStorage.setItem('UNDESIREDS', undesireds);
    localStorage.setItem('MAX_INGREDIENTS', max);
    localStorage.setItem('HEALTH', health);
    localStorage.setItem('DIET', diet);

    //api request----------------------------------------------------------------------------------------------------------------
    return `https://api.edamam.com/search?q=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=100${dietArray}${healthArray}${maxIngredients}${undesiredsList}`;
}

function getData(){
    var api = apiRequest();

    //save body and sobstitute it with a recipe container
    body = document.getElementById('body').innerHTML;
    document.getElementById('body').innerHTML = `<div class="container">
                                                    <a class="navbar-brand" onclick="bodyRecover()">
                                                        <img src="src/img/ReciPie-logo.svg" class="rounded float-left" alt="ReciPie" width="65px"/>
                                                        <span id="website-title">ReciPie</span>
                                                    </a>
                                                 </div><div class="container" id="loader">
                                                    <div class="text-center"><br><br><br>
                                                        <div class="spinner-border" role="status">
                                                            <span class="sr-only">Loading...</span>
                                                        </div><br/><br/>
                                                        <h5>Laying the table...</h5>
                                                    </div><br><br><br> 
                                                 </div>
                                                 <div class="container" id="recipe-container">
                                                    <!-- Recipes will be shown here -->
                                                 </div>`;

    fetch(api)
            .then(response=>{return response.json();})
            .then(data=>{
                var totalResults=data.hits.length;
                var reply = "";
                for(i=0; i<totalResults; i++){
                    if(i%2==0){

                        //prepare ingredients list
                        var modalIngredients = "";
                        for(j=0; j<data.hits[i].recipe.ingredientLines.length; j++){
                            modalIngredients += `<li>${data.hits[i].recipe.ingredientLines[j]}</li>`;
                        }

                        //prepare health stats list
                        var modalStats = `<li>Energy: ${Math.floor(data.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity)} kCal </li>
                                          <li> Carbs: ${Math.floor(data.hits[i].recipe.totalNutrients.CHOCDF.quantity)} g</li>
                                          <li>Fat: ${Math.floor(data.hits[i].recipe.totalNutrients.FAT.quantity)} g</li>
                                          <li>Cholesterol: ${Math.floor(data.hits[i].recipe.totalNutrients.CHOLE.quantity)} mg</li>
                                          <li>Sugar: ${Math.floor(data.hits[i].recipe.totalNutrients.SUGAR.quantity)} g</li>
                                          <li>Protein: ${Math.floor(data.hits[i].recipe.totalNutrients.PROCNT.quantity)} g</li>
                                          <li>Fiber: ${Math.floor(data.hits[i].recipe.totalNutrients.FIBTG.quantity)} g</li>`;

                        var reply = "";
                        reply = `
                        <div class="row">
                            <div class="col-md-6"><br/>
                                <div class="card">
                                    <div class="card-header">
                                        ${data.hits[i].recipe.healthLabels[0]}
                                        <div class="float-right">
                                            <a href="${data.hits[i].recipe.url}" target="_blank">Go to preparation</a>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <img id="recipe-img" src="${data.hits[i].recipe.image}" class="rounded float-left w-100" alt="ReciPie"/>
                                            </div>
                                            <div class="col-lg-9">
                                                <h5 class="card-title">${data.hits[i].recipe.label}</h5>
                                                <p id="card-subtitle"> Timing: ${data.hits[i].recipe.totalTime} minutes, Servings: ${data.hits[i].recipe.yield} people </p>
                                                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#Modal${i}"> Ingredients and Health </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div
                                class="modal fade"
                                id="Modal${i}"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLongTitle"
                                aria-hidden="true"
                            >
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Ingredienti</h5>
                                            <button
                                                type="button"
                                                class="close"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <ul>
                                                ${modalIngredients}
                                            </ul>
                                            <hr />
                                            <h5 class="modal-title" id="exampleModalLongTitle">Health stats</h5>
                                            <hr />
                                            <ul>
                                                ${modalStats}
                                            </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                    }
                    else if(i%2!=0){
                        
                        //prepare ingredients list
                        modalIngredients = "";
                        for(j=0; j<data.hits[i].recipe.ingredientLines.length; j++){
                            modalIngredients += `<li>${data.hits[i].recipe.ingredientLines[j]}</li>`;
                        }

                        //prepare health stats list
                        var modalStats = `<li>Energy: ${Math.floor(data.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity)} kCal </li>
                                          <li> Carbs: ${Math.floor(data.hits[i].recipe.totalNutrients.CHOCDF.quantity)} g</li>
                                          <li>Fat: ${Math.floor(data.hits[i].recipe.totalNutrients.FAT.quantity)} g</li>
                                          <li>Cholesterol: ${Math.floor(data.hits[i].recipe.totalNutrients.CHOLE.quantity)} mg</li>
                                          <li>Sugar: ${Math.floor(data.hits[i].recipe.totalNutrients.SUGAR.quantity)} g</li>
                                          <li>Protein: ${Math.floor(data.hits[i].recipe.totalNutrients.PROCNT.quantity)} g</li>
                                          <li>Fiber: ${Math.floor(data.hits[i].recipe.totalNutrients.FIBTG.quantity)} g</li>`;


                        reply += `
                            <div class="col-md-6"><br/>
                                <div class="card">
                                    <div class="card-header">
                                        ${data.hits[i].recipe.healthLabels[0]}
                                        <div class="float-right">
                                            <a href="${data.hits[i].recipe.url}" target="_blank">Go to preparation</a>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <img id="recipe-img" src="${data.hits[i].recipe.image}" class="rounded float-left w-100" alt="ReciPie"/>
                                            </div>
                                            <div class="col-lg-9">
                                                <h5 class="card-title">${data.hits[i].recipe.label}</h5>
                                                <p id="card-subtitle"> Timing: ${data.hits[i].recipe.totalTime} minutes, Servings: ${data.hits[i].recipe.yield} people </p>
                                                <button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#Modal${i}"> Ingredients and Health </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal -->
                        <div
                            class="modal fade"
                            id="Modal${i}"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLongTitle"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Ingredienti</h5>
                                        <button
                                            type="button"
                                            class="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <ul id="modal-ingredients">
                                            ${modalIngredients}
                                        </ul>
                                        <hr />
                                        <h5 class="modal-title" id="exampleModalLongTitle">Health stats</h5>
                                        <hr />
                                        <ul id="modal-stats">
                                            ${modalStats}
                                        </ul>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        
                        document.getElementById('recipe-container').innerHTML += reply;
                    }
                }
                //delete loading animation
                document.getElementById('loader').innerHTML = "";
            });
}


function bodyRecover(){
    document.getElementById('body').innerHTML = body;
}