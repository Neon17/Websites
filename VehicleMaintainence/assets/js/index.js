
var imageslider = document.getElementsByClassName('containerimagesliderimage');
var imagesNumber = 0; //This means image[0] is loaded

imageslider[0].setAttribute('class','containerimagesliderimage');
for (i=1;i<imageslider.length;i++){
    imageslider[i].setAttribute('class','containerimagesliderimage hideimage');
}
setInterval(slideImage,3000);

function slideImage() {
    console.log();
    imageslider[imagesNumber].setAttribute('class','containerimagesliderimage');
    for (i=0;i<imageslider.length;i++){
        if (i==imagesNumber)
            continue;
        imageslider[i].className = "containerimagesliderimage hideimage";
    }
    imagesNumber++;
    if (imagesNumber>=5)
        imagesNumber = 0;
}