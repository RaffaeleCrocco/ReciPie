window.addEventListener('load', (event) => {
    undesireds = localStorage.getItem('UNDESIREDS');
    max = localStorage.getItem('MAX_INGREDIENTS');
    health = localStorage.getItem('HEALTH');
    diet = localStorage.getItem('DIET');
    
    if(undesireds){
        document.getElementById('undesiredsList').innerHTML = undesireds;
    }

    if(max){
        document.getElementById('slider').value = max;
        document.getElementById('max-ingredients').textContent = max;
    }

    if(diet){
        var checkboxArray = document.getElementById('diet-parameters').getElementsByTagName("div");
        for(i = 0;i<checkboxArray.length; i++){
            if(checkboxArray[i].children[0].id == diet){
                checkboxArray[i].children[0].checked = true;
            }
        }
    }

    if(health){
        var healthArray = health.split(" ");
        var checkboxArray = document.getElementById('health-parameters').getElementsByTagName("div");
        for(i = 0;i<checkboxArray.length; i++){
            for(j=0; j<healthArray.length; j++){
                if(healthArray[j]==checkboxArray[i].children[0].name){
                    checkboxArray[i].children[0].checked = true;
                }
            }
        }
    }
    
});