

function animateProgressBar(idname) {  
    console.log(idname);
   window.setInterval(increaseprogressbar(idname),200);
}
function increaseprogressbar(idname){
    var progressbar = document.getElementById(idname);
    progressbar.value = progressbar.value + 20;
    if (progressbar>=100){
        window.clearInterval(myInterval);
    }
}
