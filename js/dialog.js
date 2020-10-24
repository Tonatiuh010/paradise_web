var dialog;

var bar;

function createDialog() {

    dialog = document.createElement("DIALOG");
    dialog.setAttribute("class", "dialog");
    dialog.style.width = "30%";
    dialog.style.height = "10%";    
    
    document.body.appendChild(dialog);
    dialog.showModal();

    bar = new action();
    var response = theCanvas.start();
   
}

var theCanvas = {
    canvas: document.createElement("canvas"),
    start: function () {       
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.context=this.canvas.getContext("2d");
        dialog.insertBefore(this.canvas, dialog.childNodes[0]);
        this.interval = setInterval(function (a) {
           update_Bar(1);                       
        }, 1);       
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function action() {    
    this.x = 0;
    this.y = theCanvas.canvas.height * 0.5;

    this.x1 = 5;
    this.y1 = 20;    

    
    this.update = function () {
        ctx = theCanvas.context;
        ctx.fillColor = "red";
        ctx.fillRect(this.x, this.y, this.x1, this.y1);
        //ctx.fillText();        
    }
    

}

function update_Bar(a) {

    
    theCanvas.clear();    
    if (bar.x1 >= theCanvas.canvas.width) {        
        clearInterval(theCanvas.interval);       
        dialog.close();       
    }

    bar.x1 += 3;
    bar.update();    
}