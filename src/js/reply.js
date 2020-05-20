function getData(){
    var api = apiRequest();
    fetch(api)
            .then(response=>{return response.json();})
            .then(data=>{
                /* var totalResults=data.hits.length;
                document.querySelector('.recipeContainer').innerHTML = "";
                for(i=0; i<totalResults; i++){
                    
                } */
            });
}