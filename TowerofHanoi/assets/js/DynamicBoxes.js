var container = new Array(3); //because container are 3 always
var n; //n is number of boxes
var htmlboxes = []; //creates boxes in div and store them as node
var boxes = []; //It contains width and height of all boxes
var boxheight; //boxheight is same for all box
var drawboxstatus = 0; //drawboxstatus is needed because we have to copy node and add it to html elements
var containerwidth;
var containerheight;

//After movebox() change container pointing

class box {
    constructor(width, height, towernumber, position) {
        this.width = width;
        this.height = height;
        this.towernumber = towernumber; //which tower box is in
        this.position = position; //position means 1 for top and 2 to second after top ......
    }
}

window.onload = function () {
    setup(5, 400, 250);
    // I don't know how to pause the program execution
    solutionfor2(1, 2, 3);
};

var hello = function () {
    alert("Hello");
};

// The below function is like draw box rather than setup
var setup = function (nbox, cwidth, cheight) {
    //cwidth=container width & cheight=container height
    n = nbox;
    // n is number of boxes
    container = document.getElementsByClassName("container");
    containerwidth = cwidth;
    containerheight = cheight;

    widthheightcontainer();

    setupmakebox();
    drawbox();
};

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
    let i = n - 1;
    for (; i >= 0; i--) {
        let width = minwidth + i * d;
        boxes[i] = new box(width, boxheight, 1, i + 1);
    }
    setupmakeboxhtm();
};

var checkformove = function (boxnumber, requiredtowernumber) {
    //This function checks if we mistakenly move middle or last boxes except first box
    var previouspositionnumber = boxes[boxnumber - 1].position;
    if (previouspositionnumber != 1) {
        return 0;
    }
    var i = 0;
    for (; i < boxnumber; i++) {
        if (boxes[i].towernumber == requiredtowernumber) {
            return 0;
        }
    }
    return 1;
};

var movebox = function (boxnumber, requiredtowernumber) {
    //Call this only if after htmlboxes has value
    // if (checkformove(boxnumber,requiredtowernumber)==0){
    //     alert("Just move small box at the top in the tower above the bigger box!");
    //     return;
    // }
    var previoustowernumber = boxes[boxnumber - 1].towernumber;
    boxes[boxnumber - 1].towernumber = requiredtowernumber;
    boxes[boxnumber - 1].position = 1; //moved boxes are always in top so 1
    let i = 0;
    for (; i < n; i++) {
        if (boxes[i].towernumber == previoustowernumber) {
            boxes[i].position = boxes[i].position - 1;
        }
        if (boxes[i].towernumber == requiredtowernumber) {
            boxes[i].position = boxes[i].position + 1;
        }
    }
    createallHTMLcontainer();
    widthheightcontainer();
};

var setupmakeboxhtm = function () {
    // It creates html container
    for (i = n - 1; i >= 0; i--) {
        if (boxes[i].towernumber > 0 && boxes[i].towernumber < 4) {
            htmlboxes[i] = document.createElement("div");
            htmlboxes[i].setAttribute("id", "box" + i);
            container[boxes[i].towernumber - 1].appendChild(htmlboxes[i]);
        }
    }
};

var makeboxhtm = function () {
    setupmakeboxhtm();
};

var positionintower = function (towernumber) {
    // It checks available position for incoming box in tower
    // It is necessary just to check if rules are followed or not
    var i = 0;
    var position = 0;
    for (; i < n; i++) {
        if (towernumber == boxes[i].towernumber) {
            position = position + 1;
        }
    }
    return position;
};

var clearallboxinhtm = function () {
    //to clear all boxes in htm
    for (i = 0; i < n; i++) {
        htmlboxes[i].remove();
    }
};

// It puts width and height to html elements
var drawbox = function () {
    // container.style.height = containerheight.toString()+"px"; //It is not supported now
    makeboxhtm();
    var i = 0;
    for (; i < n; i++) {
        if (boxes[i].towernumber > 0 && boxes[i].towernumber < 4) {
            htmlboxes[i].setAttribute(
                "style",
                `width: ${boxes[i].width}px; height: ${boxes[i].height}px;
            background-color: aqua; border-radius: 5px; border-bottom: 1px solid black;`
            );
            // Consider in border-bottom property if it exceeds container
        }
    }
    // After executing this, we should reset it or move to another container before recalling
}; //In setAttribute, only last one is done if written multiple setAttribute in same node

var solutionfor2 = function (a, b, requiredtower_number) {
    //box_number is one dimensional array with 2 elements
    //requiredtower_number is destination tower and differenttower_number is tower different from origin and destination
    //boxes are in same tower and overlapping in increasing size

    origintower_number = boxes[a - 1].towernumber % 10;
    var cal;
    //I also supposed origintower_number and requiredtower_number to be valid
    cal = origintower_number + requiredtower_number;
    differenttower_number = cal == 3 ? 3 : cal == 4 ? 2 : 1;
    console.log(differenttower_number);
    console.log(origintower_number);

    movebox(a, differenttower_number);
    drawbox();

    movebox(b, requiredtower_number);
    drawbox();

    movebox(a, requiredtower_number);
    drawbox();
};

// function solution(box_number, num, requiredtower_number){ //Recursive Function of type void
//     //box_number stores n values : 0,1,2, .... n
//     var cal, topFromBottom, differenttower_number, i;

//     var origintower_number = boxes[box_number[0]-1]%10;
//     cal = origintower_number + requiredtower_number;
//     differenttower_number = (cal==3)?3:(cal==4)?2:1;

//     if (n==2){
//         solutionfor2(a, b, requiredtower_number);
//     }
//     else {
//         var mbox = new Array(n-1);
//         for (i=0; i<(n-1); i++){
//             mbox[i] = box_number[i];
//         }
//         topFromBottom = positionintower(requiredtower_number);
//         solution(mbox,(n-1),differenttower_number);
//         movebox(box_number[(n-1)],requiredtower_number);
//         drawbox();
//         solution(mbox,(n-1),requiredtower_number);
//     }
// }

function createallHTMLcontainer() {
    var containerofcontainer = document.createElement("div");
    containerofcontainer.setAttribute("class", "containerofcontainer");
    var totalcontainer = [];
    container = [];
    var justmakinghalf;
    for (var i = 0; i < 3; i++) {
        totalcontainer[i] = document.createElement("div");
        totalcontainer[i].setAttribute("class", "totalcontainer");
        justmakinghalf = document.createElement("div");
        justmakinghalf.setAttribute("class", "justmakinghalf");
        container[i] = document.createElement("div");
        container[i].setAttribute("class", "container");
        totalcontainer[i].appendChild(justmakinghalf);
        totalcontainer[i].appendChild(container[i]);
    }
    containerofcontainer.appendChild(totalcontainer[0]);
    containerofcontainer.appendChild(totalcontainer[1]);
    containerofcontainer.appendChild(totalcontainer[2]);
    document.body.appendChild(containerofcontainer);
}
function widthheightcontainer() {
    var i;
    for (i = 0; i < 3; i++) {
        if (container[i].style.height == null) {
            container[i].setAttribute(
                "style",
                `width: ${containerwidth.toString()}px; height: ${containerheight.toString()}px;`
            );
        }
    }
}
