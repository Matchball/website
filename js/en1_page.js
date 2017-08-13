$(document).ready(function(){
	$("#date").datepicker();

	$dateContainer=$(".ui-datepicker");
	$dateContainer.css({
		"width":"300px",
		// "border":"none",
		// "background-color":"white"
	});
	// console.log($dateContainer.css("width"));

	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});
});	


	