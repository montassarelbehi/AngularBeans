
angular.module('VirtualClassRoomModule')
.directive("drawing", function(canvasService,$rootScope,$window){
  return {
    restrict: "A",
    link: function(scope, element){
    
    	var mousemove="mousemove";
		var mousedown="mousedown";
		var mouseup="mouseup";
    	
		var color=getRandomColor();
		
		 var offsetX =0;
		 var offsetY = 0;
	
    	 if (Modernizr.touch === true) {
    		 mousemove="touchmove";
     		mousedown="touchstart";
     		mouseup="touchend";
     		
     		offsetX=element.offset().left;
     		offsetY=element.offset().top-100;
     		
    		
         }
    	
    	
    	
    	
    var ctx = element[0].getContext('2d');
      
      // variable that decides if something should be drawn on mousemove
      var drawing = false;
      
      
      // the last coordinates before the current move
      var lastX;
      var lastY;
      
      $rootScope.$on("drawEvent",function(event,data){
    	  
    	  draw(data.lastX, data.lastY, data.currentX, data.currentY,data.color);
      });
      
      
      // touchstart touchmove
      
      element.bind(mousedown, function(event){
        
    	  
    	  if (Modernizr.touch === true) {
      		
    		
				
    		  lastX = (event.originalEvent.targetTouches[0].clientX)-offsetX;
    		  lastY =(event.originalEvent.targetTouches[0].clientY)-offsetY;
    		  
    		  
    		  
      	
      	}else{
      		 lastX = event.offsetX;
             lastY = event.offsetY;
          }
    	  
    	  
       
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      
      });
      element.bind(mousemove, function(event){
        if(drawing){
        	
        	
        	 if (Modernizr.touch === true) {
        		event.preventDefault();
        		currentX = (event.originalEvent.targetTouches[0].clientX)-offsetX;
                currentY = (event.originalEvent.targetTouches[0].clientY)-offsetY;
        	
        	}else{
        	currentX = event.offsetX;
            currentY = event.offsetY;
            }
        	
        
          // get current mouse position
           
      
          canvasService.notifyAllCanvas(lastX, lastY, currentX, currentY,color);
          
          draw(lastX, lastY, currentX, currentY,color);
          
          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
        
      });
      element.bind(mouseup, function(event){
        // stop drawing
        drawing = false;
      });
        
      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }
      
      function draw(lX, lY, cX, cY,color){
        
    	  ctx.strokeStyle = color;
    	  // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        
        // draw it
        ctx.stroke();
      }
      
      
      function getRandomColor() {
    	    var letters = '0123456789ABCDEF'.split('');
    	    var color = '#';
    	    for (var i = 0; i < 6; i++ ) {
    	        color += letters[Math.floor(Math.random() * 16)];
    	    }
    	    return color;
    	}
      
    }
  };
});