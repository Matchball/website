$(document).ready(function(){
	var nav=$("#s1_2");
	
	// var btn_container=document.getElementById("s6_3");
	$btn_container=$("#s6_3 button");

	// first call onwidthChange by default with parameter as current width of screen
	width=$(window).width();
	onWidthChange(width);


	// call widthChange on resize to handle images and links in navbar appropriately
	$(window).resize(function(){
		width=$(window).width();
		onWidthChange(width);
	});

	// handle different sizes of content in navbar on scroll
	function onWidthChange(width){
		// console.log("width in onWidthChange="+width);
		// Note $img is an html elemrnt as we we have accessed i'th index from a jquery element which will return a html element , to convert it in jquery we have to use $();
		if(width>1000){
			// console.log("passed in if");
			$img_src_l="images/Png - Only Text - White.png";
			$(window).on("scroll",function(){
				var pos=$(this).scrollTop();
				// console.log("y="+pos);
				// console.log("passed in scroll");
				$img_s=$(".navbar-brand img")[0];
				$img_l=$(".navbar-brand img")[1];
					// console.log($img);
					$img_src_l="images/Png - Only Text - White.png";

					// console.log($(img).css("height"));
					// console.log("passed in if");
					
					if(pos>570){
						// $img.src=$img_src_l;
						// console.log($img.src);
						// $($img).css({
						// 	"height":"50px"
						// });
						$($img_s).css({
							"opacity":"0",
						});
						$($img_l).css({
							"opacity":"1",
						});
						// console.log($($img_s).css("opacity")+"    "+$($img_l).css("opacity"));
					}
					else{
						// $img.src="images/Png - Only Logo - Variant 2.png";
						// $($img).css({
						// 	"height":"80px"
						// });
						$($img_s).css({
							"opacity":"1",
						});
						$($img_l).css({
							"opacity":"0",
						});
						// console.log($($img_s).css("opacity")+"    "+$($img_l).css("opacity"));
					}
			});

		}
		else{
			nav.addClass("navbar-fixed");
		}
		
	}
	
	
	// $("#myCarousel").carousel("pause");

	// to make a link underlined on click
	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});

	// to give appropriate background color to span bars of button
	// focus on icon-bar
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
		    // setTimeout(expandHeight,10);
		    // expandHeight();
		 //    setTimeout(function(){
		 //    	$("#myNavbar").css({
			// 	"height":"100%",
			// 	});
			// },10);
		    
		    // $("#myNavbar").toggleClass('is_open',1000);
		    
		   

		    console.log("clicked");
		    // $navMenuCont.animate({'width':'toggle'}, 400, "linear");
		    // console.log("$isExpanded "+$isExpanded);
		    if(!($isExpanded)){
		    	
		    // 	// $navMenuCont.css({
		    // 	// 	 "right":"0",
		    // 	// 	 // "transform":"translateX(-200px)"
		    // 	// });
		    	console.log("at 1_1 and $isExpanded is "+ $isExpanded);
		    	// $navMenuCont.animate({
		    	// 	'right':'0'
		    	// },400);
		    	$navMenuCont.stop().animate({
		    		'right':'0'
		    	},'slow');
		    	console.log("at 1_2 and $isExpanded is "+ $isExpanded);
		    	
	    		$isExpanded=true;
		    	
		    	console.log("$isExpanded "+$isExpanded);
		    	console.log("at 1_3 and $isExpanded is "+ $isExpanded);
		    }
		    else{
		    	
		    // 	// $navMenuCont.css({
		    // 	// 	"right":"-200px",
		    // 	// 	// "transform":"translateX(0)"
		    // 	// });
		    // 	// console.log("at 2_1 and $isExpanded is "+ $isExpanded);
		    	// $navMenuCont.animate({
		    	// 	'right':'-200px'
		    	// },400);
		    	$navMenuCont.stop().animate({
		    		'right':'-240px'
		    	},'slow');
		    // 	// console.log("at 2_2 and $isExpanded is "+ $isExpanded);
		    	
	    		$isExpanded=false;
		    	
		    	console.log("$isExpanded "+$isExpanded);
		    	console.log("at 2_3 and $isExpanded is "+ $isExpanded);
		    }
		    // console.log($isExpanded);
		    // setTimeout(expandHeight,100);
		    // $navMenuCont.animate({'width':'toggle'}, 1000, "linear")

		});

	    // to toggle navabr in mobile on clicking anywhere
	    // remove .off() from document as it will remove .on() event handlers but .on() is necessarary for toggling slides
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

	// function expandHeight(){
	// 	$("#myNavbar").css({
	// 		"height":"100%"
	// 	});
	// }

	// function expandWidth(){
	// 	$("#myNavbar").css({
	// 		"width":"250px"
	// 	});
	// }

	// to scroll to content attached as reference on button
	$(".navLink").off().on("click",function(e){
		e.preventDefault();

		$("body,html").animate({
			scrollTop: $($(this).attr('href')).offset().top-100
		},1000);
	});
		
});


