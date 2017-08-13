$(document).ready(function(){

	//for enroll customisation
	$(function () {
		$("nav a").click(function (e) {
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});

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