$(document).ready(function(){
	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});
});

function CopyMe(el){
		var location_input=document.getElementById("u_filename");
		el_value=el.value.split("\\")[2];
		// console.log(el_value);
		
		location_input.value=el_value;
} 
	