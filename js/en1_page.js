$(document).ready(function(){

	//color to toggle button lines
	$('.navbar-toggle').blur(function() {
        $('.icon-bar').css({
        	"background-color":"white"
        });
      })
      .focus(function() {
        $('.icon-bar').css({
        	"background-color":"#F3CF43"
        });
    });
		
	
	// to handle toggling of navbar in small-devices
	$(function(){
  		// mobile menu slide from the right
  		$isExpanded=false;

	    $('[data-toggle="collapse"]').on('click',function(e) {
	    	 e.stopImmediatePropagation();
		    $navMenuCont = $($(this).data('target'));
		    
		    if(!($isExpanded)){
		    	
		    	$navMenuCont.stop().animate({
		    		'right':'0'
		    	},'slow');
		    	
		    	
	    		$isExpanded=true;
		    	
		    }
		    else{
		    
		    	$navMenuCont.stop().animate({
		    		'right':'-240px'
		    	},'slow');
		   
		    	
	    		$isExpanded=false;
		    	
		    }
		    

		});

	    // to toggle navabr in mobile on clicking anywhere
	    // remove .off() from document as it will remove .on() event handlers but .on() is necessarary for toggling slides

		$(document).click(function (event) {
	        var clickover = $(event.target);
	        
	        if ($isExpanded === true && !clickover.hasClass("navbar-toggle")) {
	            $("button.navbar-toggle").click();
	        }
	    });
	});

	
	$("#date").datepicker({
		dateFormat:"dd/mm/yy",
		beforeShowDay:function(date){
    		return [false, ''];
    	}
	});
	
	

	function showHighlights(showAfterDate){
		$("#date").datepicker("destroy");
		
		$("#date").datepicker({
			dateFormat:"d/m/yy",
			minDate:showAfterDate,
			onSelect:function(){
				
	        	//fade-in and out effects on image and text div
	        	$("#right_text").stop().fadeOut("slow",function(){
	        		$("#tickImage").attr('src',"images/correct-signal.png");
	        		$("#avaialbleText").text("Free Slot is Available");
	        	}).fadeIn("slow");

	        	$("#nextStep").prop('disabled',false);
	        	$("#s6").css({
	        		"opacity":"1",
	        	});

	        	//store selected date in local storage to use on next page
	        	localStorage.setItem("selectedDate",$(this).val());
			},
		});
	}


	
	
	//get selected center from list and highlight dates onwards from starting date 
	$("#s4 button").on('focus',function(){
		
		//get id of the selected center
		$id=$(this).attr('id');
		
		$todayDate=$.datepicker.formatDate('d/m/yy',new Date());
		
		//add "selected" class to the selected center and remove from others
		$("#s4 button").addClass("selected").not(this).removeClass("selected");

		// read starting date of selected center from database
		var startingDate=firebase.database().ref('Center/'+$id+'/StartingDate');
		var highlightAfter;
		
		startingDate.on('value',function(snapshot){

			//starting date from database

			var d_starting_val=snapshot.val();
			var d_starting=$.datepicker.parseDate("d/m/yy",d_starting_val);
			
			//today's date from datepicker

			var d_today=$.datepicker.formatDate('d/m/yy',new Date());
			var d_today_parseDate=$.datepicker.parseDate("d/m/yy",d_today);
			

			// to compare two dates both should be in same format and best way is to parse them using datepicker parseDate function that takes two 
			// arguments as parameters, first one is the format and second is value of date that is going to be parsed.This is more convineient because 
			// formats can be same for two dates but then their type would be different ex. a string and a date may look like same but actually they are differ.

			// farther date is assigned to highlightAfter
			var t_starting=(d_starting).getTime();
			var t_today=(d_today_parseDate).getTime();
			if(t_starting > t_today){
				highlightAfter=d_starting_val;
			}
			else{
				highlightAfter=d_today;
			}
			
			// console.log($id);
			localStorage.setItem("center_id",$id);

			showHighlights(highlightAfter);
		});

		

	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});

	

		$(document).on('click',function (event) {
	        var clickover = $(event.target);

	  		if(clickover.hasClass("ui-state-default") || clickover.hasClass("ui-state-disabled")){
	        	
	        	// fade-in and out effect on image and text box
	        	$("#right_text").stop().fadeOut("slow",function(){
	        		$("#tickImage").attr('src',"images/wrong.png");
		        	
		        	$("#avaialbleText").text("Free Slot is not Available");
	        	}).fadeIn("slow");
		        	
	        	$("#nextStep").prop('disabled',true);
	        	$("#s6").css({
	        		"opacity":"0.3",
	        	});
	        }

	        
	    });
	});

	
});	


	