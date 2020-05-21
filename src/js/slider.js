function maxIngredients(){
    var slider = document.getElementById('slider');
    var maxIngredients = document.getElementById('max-ingredients');
    if(slider.value!=20){
        maxIngredients.textContent=slider.value;
    }else{
        maxIngredients.textContent="unlimited"
    }
    
}