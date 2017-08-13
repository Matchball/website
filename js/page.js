$(document).ready(function(){
	var nav=$("#s1_2");
	
	// var btn_container=document.getElementById("s6_3");
	$btn_container=$("#s6_3 button");

	width=$(window).width();
	onWidthChange(width);


	$(window).resize(function(){
		width=$(window).width();
		onWidthChange(width);
	});

	function onWidthChange(width){
		// console.log("width in onWidthChange="+width);
		if(width>1000){
			console.log("passed in if");
			$(window).on("scroll",function(){
				var pos=$(this).scrollTop();
				// console.log("passed in scroll");
				$img=$(".navbar-brand img")[0];
				
				
					// console.log("passed in if");

					if(pos>=674){
						nav.addClass("navbar-fixed");
						$img.src="images/Whole_Logo_custom_1.png";
					}
					else{
						nav.removeClass("navbar-fixed");
						$img.src="images/logo-v1_4_c.jpg";
					}
			});

		}
		else{
			nav.addClass("navbar-fixed");
		}
		
	}
	
	
	// $("#myCarousel").carousel("pause");

	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});

	// $(function(){
	//   		// mobile menu slide from the right
	//     $('[data-toggle="collapse"]').on('click', function() {
	//     $navMenuCont = $($(this).data('target'));
	//     $navMenuCont.animate({'width':'toggle'}, 200);
	//     });
	// });
		
});

