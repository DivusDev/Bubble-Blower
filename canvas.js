let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let ctx = canvas.getContext("2d");

// ctx.fillStyle = "cyan";


// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = "blue";

// ctx.fillRect(100, 300, 100, 100);
// ctx.fillStyle = "teal";

// ctx.fillRect(300, 300, 100, 100);

// ctx.beginPath();

// ctx.moveTo(200, 210);

// ctx.lineTo(300, 300);
// ctx.lineTo(200, 300);
// ctx.strokeStyle = "green";
// ctx.stroke();

// ctx.strokeStyle = "yellow";
// ctx.beginPath();
// ctx.arc(100,  100, 20, 0, Math.PI * 2, false);
// ctx.stroke()

// for (var i = 0; i < 70  ; i += 1){
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;

//     ctx.beginPath();
//     ctx.arc(x, y, 20, 0, Math.PI * 2, false);
//     ctx.strokeStyle = "yellow";
//     ctx.stroke();
// }



// var x = 200;    //define x value 
// var dx = 5;     //define velocity

// var y = Math.random() * window.innerHeight; //random y position
// var dy = ((Math.random() - 0.5) * 2) * 5; //make dy random POSITIVE OR NEGATIVE number between -5 and 5

// ((Math.random() - 0.5) * 2) intuitive function for creating random + OR - numbers

var mouse = {
    x: undefined,
    y: undefined
}

var minRadius = 2;
var maxRadius = 40;

var colorArray = [
    "#CDDC39",
    "#2196F3",
    "#E91E63",
    "#9C27B0",
    "#FF5722",
    "#FF9800"

]


window.addEventListener("mousemove", (event) => {
    
    mouse.x = event.x;
    mouse.y = event.y
    console.log(mouse);
})

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})


//use a js object constructor function to create and maintain multiple circles

function Circle(x, y, dx, dy, radius){       


    //define constructor function variables
    this.x = x;
    this.y =  y;
    this.dx = dx; 
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * (colorArray.length + 1))];
    this.minRadius = radius;
    //define draw function
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);     //create a new circle at a different location every time
        ctx.strokeStyle = this.color;
        ctx.fill();
        ctx.fillStyle = this.color;
    }


        //define update function 
        //we call this inside our canvas to draw and update the function
    this.update = () => {

        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0){  
            //if center of circle + radius is BIGGER than the window width
            //or if center of circle - radius is SMALLER than 0 (left side of window)
                this.dx = -this.dx;   //flip velocity value
            }
        
        if (this.y + this.radius > window.innerHeigh  || this.y - this.radius < 0){
                this.dy = -this.dy;
            }
        
            this.x += this.dx;   //change x value location by dx/velocity
            this.y += this.dy;

            this.draw();    //draw new circle with updated location values

        if (mouse.x - this.x < 40 && mouse.x - this.x > -40  && mouse.y - this.y < 40  && mouse.y - this.y > -40 ) {
            if( this.radius < maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > this.minRadius ) {
            this.radius -= 1;
        }
       

    }
}







var circleArray = [];

for (var i = 0; i < 1000; i++){
    var x = Math.random() * canvas.width ;
    var dx = ((Math.random() - 0.5) * 2) * 2;
    var y = Math.random() * canvas.height ;
    var dy = ((Math.random() - 0.5) * 2) * 2;    ;
    var radius = Math.random() * 3 + 1;



    circleArray.push(new Circle(x, y, dx, dy, radius));

}




//animation
function animate() {
    requestAnimationFrame(animate); 
    //after this is like a for loop for every frame (speculation 60 times a second)




    ctx.clearRect(0 , 0, canvas.width, canvas.height);
    //clear the entire canvas of drawings every frame

    // circle.update();    //call update function for both circles every frame

    // circle1.update();



    for (let i = 0; i < circleArray.length; i++) {
        const element = circleArray[i];

        element.update();
        
    }
}


animate();  //call animate function