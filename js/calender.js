$(document).ready(function(){

	console.log($("date"));
	$("#date").datepicker();

	$icon=$("span .ui-icon");
	$icon.removeClass("ui-icon-circle-triangle-w");
	$icon.addClass("ui-icon-caret-1-w");
	console.log($icon.class);
	console.log("5");
});
