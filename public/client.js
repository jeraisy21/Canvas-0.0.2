var canvas;
var context;
var socket;
document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };
   // get canvas element and create context
   canvas  = document.getElementById('drawing');
   context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   socket  = io.connect();


   var radius = 10;
   context.lineWidth = 5;

   // set canvas to full browser width/height
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;

   

      // register mouse event handlers
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };

   // draw line received from server

      socket.on('draw_line', function (data) {
      var line = data.line;
      context.beginPath();
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
      context.arc(data.clientX, data.clientY, radius, 0, Math.PI*2); 
      context.lineWidth = '5';
   });
   
   // main loop, running every 25ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
         // send line to to the server
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();
});






 var resizeStart = _.debounce(function() {

   context.save();
    // Use the identity matrix while clearing the canvas
   context.setTransform(1, 0, 0, 1, 0, 0);
   context.clearRect(0, 0, canvas.width, canvas.height);
    // Restore the transform
   context.restore();
    // clear drawing history count
   draw_line_count = 0;
   
   socket.emit('get-line-history', canvas)

   }, 200);


   window.addEventListener('resize', resizeStart);


   