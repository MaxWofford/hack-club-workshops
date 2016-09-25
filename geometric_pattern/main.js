var NUM_CIRCLES = 12;
var circleDiameter;
var circleRadius;
var rVal;
var gVal;
var bVal;

function setup()
{
    createCanvas(480, 600);
    frameRate(5);
    circleDiameter = width / NUM_CIRCLES;
    circleRadius = circleDiameter / 2;
    
    //Colors
    rVal = 255;
    gVal = 0;
    bVal = 0;
}

function draw()
{
    var isShifted = false;
    
    //Circles start at bottom and go upwards
    var y = height;
    
    while (y >= 0) 
    {
        fill(color(rVal, gVal, bVal));
        stroke(color(rVal, gVal, bVal));
        
        //Every other iteration, shift over the circles
        var x; 
        if (isShifted)
        {
            x = circleRadius;
        }
        else 
        {
            x = 0;
        }
        
        //Draw ellipse and increment x
        while (x <= width) 
        {
            ellipse(x, y, circleDiameter, circleDiameter);
            x = x + circleDiameter;
        }
        
        //Increment y
        y = y - circleRadius;
        
        //Color Gradient
        rVal = rVal - 2;
        gVal = gVal + 7;
        bVal = bVal + 3;
        
        //Shift cicles over
        isShifted = !isShifted;
        
        //Change colors
        rVal = (rVal - 2) % 256;
        gVal = (gVal + 53) % 256;
        bVal = (bVal + 3) % 256;
    }
}

function keyPressed() 
{
    if (keyCode === 115 || keyCode === 83)
    {
        saveCanvas('geometricPattern', 'png');
    }
    return false;
}