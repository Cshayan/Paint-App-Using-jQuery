$(()=>{var canvas, context,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 10,
        down: false,
    },
    strokes = [],
    currentStroke = null;
    
function reDraw(){
     context.clearRect(0, 0, canvas[0].width, canvas[0].height);
     context.lineCap = 'round';
     for( var i=0; i < strokes.length; i++ )
     {
         var s = strokes[i];
         context.strokeStyle = s.color;
         context.lineWidth = s.size;
         context.beginPath();
         context.moveTo(s.points[0].x, s.points[0].y);
         for(j=0 ; j < s.points.length; j++)
         {
             var p = s.points[j];
             context.lineTo(p.x, p.y);
         }
         context.stroke();
     }

}   


function init(){
    canvas = $('#draw');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });

   context = canvas[0].getContext('2d');

   function mouseEvent(e){

    brush.x = e.pageX ;
    brush.y = e.pageY ;
    
    currentStroke.points.push({
        x: brush.x,
        y: brush.y,
    });
    
    reDraw();
   }
   canvas.mousedown((e)=>{
       brush.down = true ;

       currentStroke = {
           color: brush.color,
           size: brush.size,
           points: [],
       }

       strokes.push(currentStroke);

       mouseEvent(e);

   }).mouseup((e)=>{

    brush.down = false ;
        
    mouseEvent(e);

    currentStroke = null;

   }).mousemove((e)=>{

       if(brush.down)
       {
           mouseEvent(e);
       }
   });

   $('#save').click(function(){
    var image = canvas[0].toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    window.location.href = image; // it will save locally
    
   });
   $('#undo').click(function(){
        strokes.pop();
        reDraw();
   });
    $('#clear').on('click', ()=>{
        strokes = []; 
        reDraw();
    });
    $('#pickColor').on('input', function(){
        brush.color = this.value;
    });
    $("#brush").on('input', function(){
        brush.size = this.value;
    });

}



init();


});
