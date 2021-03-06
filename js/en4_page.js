$(document).ready(function(){

	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});

	$(function(){
	  		// mobile menu slide from the right
	  		$isExpanded=false;


	    $('[data-toggle="collapse"]').on('click', function() {
		    $navMenuCont = $($(this).data('target'));
		    setTimeout(expandHeight,0);
		    $navMenuCont.animate({'width':'toggle'}, 400, "linear");
		    if(!($isExpanded)){
		    	
		    	$navMenuCont.css({
		    		"right":"0",
		    	});
		    	$isExpanded=true;
		    }
		    else{
		    	
		    	$navMenuCont.css({
		    		"right":"-200px",
		    		
		    	});
		    	$isExpanded=false;
		    }
		    // console.log($isExpanded);
		    // setTimeout(expandHeight,100);
		    // $navMenuCont.animate({'width':'toggle'}, 1000, "linear")

		});

		$(document).click(function (event) {
	        var clickover = $(event.target);
	        // console.log(clickover);
	        // var _opened = $(".navbar-collapse").hasClass("in");
	        // console.log("_opened="+$isExpanded);
	        if ($isExpanded === true && !clickover.hasClass("navbar-toggle")) {
	            $("button.navbar-toggle").click();
	        }
	    });
	});

	function expandHeight(){
		$("#myNavbar").css({
			"height":"100%",
		});
	}

	 // for selecting month and year
	var months=document.getElementById("exp_month");
	var i=0;
	for(i=1;i<=12;i++){
		months.innerHTML=months.innerHTML+"<option>"+ i +"</option";
		// console.log(months.innerHTML);
	}
	var years=document.getElementById("exp_year");
	for(i=1;i<=100;i++){
		years.innerHTML=years.innerHTML+"<option>"+ (2017+i) +"</option";
		// console.log(years.innerHTML);
	}

});