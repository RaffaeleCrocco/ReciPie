window.addEventListener('load',()=>{
    maxIngredients();
});

function maxIngredients(){
    var slider = document.getElementById('slider');
    var maxIngredients = document.document.getElementById('maxIngredients');
    if(slider.value!=20){
        maxIngredients.textContent=slider.value;
    }else{
        maxIngredients.textContent="unlimited"
    }
    
}