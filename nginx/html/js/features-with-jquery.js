/* miscelleaou features , generalised initialisation
 *
 */
  
 //$(window).ready(function(){
 //  alert("window).ready event2");
   
$(document).ready(function(){

  timeLog("features initialization  starts", false);
  
  //page change effect features
  $("body").css("display", "none");
    $("body").fadeIn(2000);
    
   $("a.transition").click(function(event){
      event.preventDefault();
      linkLocation = this.href;
     $("body").fadeOut(100, redirectPage);	
   });
    function redirectPage() {
   window.location = linkLocation;
  }
  
  
    //toggle table hide/show features
 	$(".table_head").click(function(){
	    $(this).find('img:first').slideToggle(550);
		$(this).next(".table_body").slideToggle(500);
 
		return false;
	});
	
	 
	//flaotimg menu management
    $("#sidebar .label").click(function(){
	     $(this).find('img:first').slideToggle(550);
		 $("#sidebar .footlink").slideToggle(500);
		return false;
	});
	
          //right click menu
			$('#content').bind('contextmenu',function(e){
			var $cmenu = $(this).next();
			$('<div class="overlay"></div>').css({left : '0px', top : '0px',position: 'absolute', width: '100%', height: '100%', zIndex: '100' }).click(function() {
				$(this).remove();
				$cmenu.hide();
			}).bind('contextmenu' , function(){return false;}).appendTo(document.body);
			$(this).next().css({ left: e.pageX, top: e.pageY, zIndex: '101' }).show();

			  return false;
			 });

			 $('.vmenu .first_li').live('click',function() {
				if( $(this).children().size() == 1 ) {
					//alert($(this).children().text());
					$('.vmenu').hide();
					$('.overlay').hide();
				}
			 });

			 $('.vmenu .inner_li span').live('click',function() {
					//alert($(this).text());
					$('.vmenu').hide();
					$('.overlay').hide();
			 });

	
			$(".first_li , .sec_li, .inner_li span").hover(function () {
				$(this).css({backgroundColor : '#E0EDFE' , cursor : 'pointer'});
			if ( $(this).children().size() >0 )
					$(this).find('.inner_li').show();	
					$(this).css({cursor : 'default'});
			}, 
			function () {
				$(this).css('background-color' , '#5286B5' );
				$(this).find('.inner_li').hide();
			});
	
	
     //drag left/right or up/down to change  pages
	  /* Stop default Firefox etc. drag */
     $(document).bind("dragstart", function() {
         return false;
     });

     /* Capture start of flings */
     $('#content').mousedown(function (event) {
        startDownX = event.pageX;
        startDownY = event.pageY; 
		ismouseDown=true;
     });

     /* Work out fling direction on end of fling */
     $(document).mouseup(function(event){
        /* Page y-axis is different from graph */
        var down = event.pageY - startDownY; 
        var run = event.pageX - startDownX;
		startDownX = event.pageX;
        startDownY = event.pageY; 
		
		$('.vmenu').hide(); //important		
		if(ismouseDown==true &&(down>400 || run>400))
		{
		    ismouseDown=false;
			 if(typeof $('#backlink_id').attr("href") !='undefined')
			 window.location=$('#backlink_id').attr("href");
		    
		}
		else if(ismouseDown==true &&(down <-400 || run< -400))
		{
		  ismouseDown=false;
		  // document.getElementById('forwardlink_id').click();
		   if(typeof $('#forwardlink_id').attr("href") !='undefined')
			  window.location=$('#forwardlink_id').attr("href");
		}
		
		ismouseDown=false;
     });
 
  
});	


var startDownX, startDownY; 
var ismouseDown=false;
 
