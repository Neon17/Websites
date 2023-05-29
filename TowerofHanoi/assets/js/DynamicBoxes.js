var container = [];
var n; //n is number of boxes
var htmlboxes = []; //creates boxes in div and store them as node
var boxes = []; //It contains width and height of all boxes
var boxheight; //boxheight is same for all box

class box {
    constructor(width, height, towernumber, position) {
        this.width = width;
        this.height = height;
        this.towernumber = towernumber //which tower box is in
        this.position = position; //position means 1 for top and 2 to second after top ......
    }
}

window.onload = function () {
    setup(5, 400, 250);
    setupmakebox();
    drawbox();
    // I don't know how to pause the program execution
    movebox(4,2);
    clearallboxinhtm();
    drawbox();
}

// The below function is like draw box rather than setup
var setup = function (nbox, cwidth, cheight) { //cwidth=container width & cheight=container height
    n = nbox;
    // n is number of boxes
    container = document.getElementsByClassName("container");
    containerwidth = cwidth;
    containerheight = cheight;

    container[0].setAttribute("style", `width: ${containerwidth.toString()}px; height: ${containerheight.toString()}px;`);
    container[1].setAttribute("style", `width: ${containerwidth.toString()}px; height: ${containerheight.toString()}px;`);
    container[2].setAttribute("style", `width: ${containerwidth.toString()}px; height: ${containerheight.toString()}px;`);

    setupmakebox();
}

var setupmakebox = function () {
    boxheight = containerheight / n;
    let minwidth = 50;
    if (n <= 5) {
        minwidth = 100;
    }
    if (n <= 2) {
        minwidth = 150;
    }
    let maxwidth = containerwidth;
    let d = (maxwidth - minwidth) / (n - 1);
    let i = (n - 1);
    for (; i >= 0; i--) {
        let width = minwidth + i * d;
        boxes[i] = new box(width, boxheight, 1, (i+1));
    }
}

var movebox = function(boxnumber, requiredtowernumber){
    //Call this only if after htmlboxes has value
    boxes[boxnumber - 1].towernumber = requiredtowernumber;
    boxes[boxnumber - 1].position = positionintower(requiredtowernumber);
}

var makeboxhtm = function() {
    for (i = (n-1); i >= 0; i--) {
        if ((boxes[i].towernumber > 0) && (boxes[i].towernumber < 4)) {
            htmlboxes[i] = document.createElement("div");
            htmlboxes[i].setAttribute("id", "box" + i);
            container[(boxes[i].towernumber - 1)].appendChild(htmlboxes[i]);
        }
    }
}

var positionintower = function (towernumber){
    // It checks available position for incoming box in tower
    // It is necessary just to check if rules are followed or not
    var i =0;
    var position = 1;
    for (;i<n;i++){
        if (towernumber==boxes[i].towernumber){
            position = position+1;
        }
    }
    return position;
}

var clearallboxinhtm = function() { //to clear all boxes in htm
    for (i = 0; i<n; i++){
        htmlboxes[i].remove();
    }
}

// It puts width and height to html elements 
var drawbox = function () {
    // container.style.height = containerheight.toString()+"px"; //It is not supported now
    makeboxhtm();
    var i = 0;
    for (; i < n; i++) {
        if ((boxes[i].towernumber > 0) && (boxes[i].towernumber < 4)) {
            htmlboxes[i].setAttribute("style", `width: ${boxes[i].width}px; height: ${boxes[i].height}px;
            background-color: aqua; border-radius: 5px; border-bottom: 1px solid black;`);
            // Consider in border-bottom property if it exceeds container
        }
    }
    // After executing this, we should reset it or move to another container before recalling

} //In setAttribute, only last one is done if written multiple setAttribute in same node