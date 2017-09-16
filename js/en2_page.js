$(document).ready(function(){

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
	// here navbar toggle function defination's are finished

	// for navbar links
	$(function () {
		$("nav a").click(function (e) {
			e.stopImmediatePropagation();
			e.preventDefault();
			// console.log(this.href);
			location.href=this.href;

			$("nav a").addClass("active").not(this).removeClass("active");
		});
	});

	

	// to make step bar boxes active
	$("#b1").on('click',function(e){
		
		window.location='https://matchball.org/en1_page.html';
	});
	$("#b2").on('click',function(e){
		
		window.location='https://matchball.org/en2_page.html';
	});

	// browsed file
	$("#u_avatar").on('change',function(event){
		var location_input=document.getElementById("u_filename");
	    imageName=$("#u_avatar").val().split("\\")[2];
		// console.log("el.value="+imageName);
		location_input.value=imageName;
		imageFile=event.target.files[0];
		// console.log("file="+file);
		// $email='v@g.com';
		// $emailFirstPart=$email.split('.')[0];
		// console.log("$email="+$email);
		// var imageStorageRef=firebase.storage().ref('userPhotos/'+$emailFirstPart);

		// imageStorageRef.put(imageFile).then(function(snapshot){
		// 	console.log("snapshot="+snapshot);
		// }).catch(function(error){
		// 	console.log("error message="+error.message);
		// });
	});

	//set user details in form after page has loaded/reloaded/refreshed
	window.onload=setUserDetailsInForm;
	
	//get previous user details in form before page is going to unload/reload/refreshed
	window.onbeforeunload=getUserDetailsFromForm;
	

	//function to set values in from from session stirage
	function setUserDetailsInForm(){
		console.log("setUserDetailsInForm is called");
		if(typeof(Storage)=="undefined"){
			console.log("System doesn't have valid storage");
			return;
		}

		
		// Note- typeOf(Storage) will return function in chrome if it has valid storage and value of a key will be "null" if it haven't set earlier or
		// isn't there in storage

		// variable name is used to get value of key that has been marked as "name" and assign it to "Username"
		var name=sessionStorage.getItem("name");
		if(name!=null){
			$("#u_name").val(name);
		}

		// variable email is used to get value of key that has been marked as "email" and assign it to "E-mail"
		var email=sessionStorage.getItem("email");
		if(email!=null){
			$("#u_email").val(email);
		}

		// variable password is used to get value of key that has been marked as "password" and assign it to "Password"
		var password=sessionStorage.getItem("password");
		if(password!=null){
			$("#u_password").val(password);
		}

		// variable rpassword is used to get value of key that has been marked as "rpassword" and assign it to "Re-type Password"
		var rpassword=sessionStorage.getItem("rpassword");
		if(rpassword!=null){
			$("#u_rpassword").val(rpassword);
		}

		// variable mobilenumber is used to get value of key that has been marked as "mobilenumber" and assign it to "Mobile Number"
		var mobilenumber=sessionStorage.getItem("mobilenumber");
		if(mobilenumber!=null){
			$("#u_mobilenumber").val(mobilenumber);
		}

		// variable dob is used to get value of key that has been marked as "dob" and assign it to "Date of Birth"
		var dob=sessionStorage.getItem("dob");
		if(dob!=null){
			$("#u_dob").val(dob);
		}

		// variable address is used to get value of key that has been marked as "address" and assign it to "Address"
		var address=sessionStorage.getItem("address");
		// if(address!=null){
			$("#u_address").val(address);
		// }

		
		// variable filename is used to get value of key that has been marked as "filename" and assign it to id "u_filename"
		// var filename=sessionStorage.getItem("filename");
		// if(filename!=null){
		// 	$("#u_filename").val(filename);
		// }

		// variable file is used to get value of key that has been marked as "file" and assign it to "Profile picture"
		// var file=sessionStorage.getItem("file");
		// if(file!=null){
		// 	$("#u_avatar").val(file);
		// }

	}


	//function to set values in session storage from form
	function getUserDetailsFromForm(){
		console.log("getUserDetailsFromForm is called");
		alert("refesh!");
		//set the values in sessionStorage before page unlaod, key names should be same as that of earlier used to get values in getting items
		sessionStorage.setItem("name",$("#u_name").val());
		sessionStorage.setItem("email",$("#u_email").val());
		sessionStorage.setItem("password",$("#u_password").val());
		sessionStorage.setItem("rpassword",$("#u_rpassword").val());
		sessionStorage.setItem("mobilenumber",$("#u_mobilenumber").val());
		sessionStorage.setItem("dob",$("#u_dob").val());
		sessionStorage.setItem("address",$("#u_address").val());
		sessionStorage.setItem("filename",$("#u_filename").val());
		sessionStorage.setItem("file",$("#u_avatar").val());
	}

	$isAlreadyAuthenticated=false;	//global variable to check if authentication is done or not

	// click on next step button
	$("#createUserAndNext").on('click',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		// if not authenticated via social sites
		if($isAlreadyAuthenticated==false){

			//check email

			var x = $("#u_email").val();;
		    var atpos = x.indexOf("@");
		    var dotpos = x.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
		   		alert("Email address is not valid");
		        return false;
		    }

		    $email=$("#u_email").val();
			// check if passwords are matching or not

			$password=$("#u_password").val();
			$rpassword=$("#u_rpassword").val();
			if($password!=$rpassword){
				alert("Passwords are not matching");
				return false;
			}

		}

		// below checks will be in every case

		// check if mobile number is valid or not
	    var num=$("#u_mobilenumber").val();
	    if(!(/^\d{10}$/.test(num))){
	   		alert("Mobile Number should be of 10 digits");
	    	return false;
	    }

	    // terms and conditions check or not
	    $areTnPCheked=$("#accept").prop('checked');
	    
	    if(!$("#u_avatar").val()){
	    	alert('Please select display picture');
	    	return false;
	    }

	    if(!$areTnPCheked){
	    	alert("You must agree to terms and conditions.");
	    	return false;
	    }

	    // newslater ??
	    $isNewsLetterSigned=$("#newsletter").prop('checked');

	    // if not authenticated via social media sites
	    if(!$isAlreadyAuthenticated){
	    	firebase.auth().createUserWithEmailAndPassword($email,$password)
				.catch(function(error){
					var errorMessage=error.message;
					alert(errorMessage);
					return false;
			}).then(function(user){
					console.log("user="+user.email);
					if(user){
						$isAlreadyAuthenticated=true;
						saveUserDetailsInDatabase();
					}
				});
	    }
	    else{
	    	saveUserDetailsInDatabase();
	    }
		
	});

	
});

function signInWithGoogle(){
	
	var provider=new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result){
		$isAlreadyAuthenticated=true;
		hideEmailAndPasswords();
	}).catch(function(error){
		var errorMessage=error.message;
		alert(errorMessage);
	});
		
}

function signInWithFacebook(){

	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  $isAlreadyAuthenticated=true;
	  hideEmailAndPasswords();
	 }).catch(function(error) {
	  var errorMessage = error.message;
	  alert(errorMessage);
	});

}

// hide email,password,re-type password
function hideEmailAndPasswords(){
	$(".hideable").animate({'opacity':0},1000,function(){
		$(this).animate({'height':0},200,function(){
			$(this).hide();
		});
	});
}

// save details in firebase database
function saveUserDetailsInDatabase(){
	firebase.auth().onAuthStateChanged(function(user){
		$email=user.email;
		$uid=user.uid;
		console.log("uid="+$uid);
		console.log("email="+$email);
		storeImageAndRestDetails();
	});

	function storeImageAndRestDetails(){	
		// emailFirstPart will be the key for user credentials
		$emailFirstPart=$email.split('@')[0];
		var imageStorageRef=firebase.storage().ref('userPhotos/'+$uid);

		imageStorageRef.put(imageFile).then(function(snapshot){
			console.log("snapshot="+snapshot);

			imageStorageRef.getDownloadURL().then(function(url){
				$imageDownloadUrl=url;
				console.log("download url="+$imageDownloadUrl);
				$otp=generateAndSendOTPAndSaveRestDetails($uid);
				// saveRestDetails();
				// alert("Successfully Registered, we will reach to you as soon as possible");
			}).catch(function(error){
				console.log("error while generating download url::"+error.message);
			})
			
		}).catch(function(error){
			console.log("error message="+error.message);
		});
	}

	
}

function generateAndSendOTPAndSaveRestDetails($uid){
	var randomOTP=Math.floor(Math.random()*(9000)+1000);
	var contactNumber="91"+$("#u_mobilenumber").val();

	$url="https://api.msg91.com/api/sendhttp.php?route=4&country=India&flash=0&unicode=0&authkey=173943AYNwd1wDwR7k59b43b46&mobiles="+contactNumber+"&message="+randomOTP+"%20is%20your%20One%20Time%20Password.%20Thank%20you%20for%20choosing%20MatchBall.&sender=MABALL"
	console.log("url="+$url);
	
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){
		console.log("current state="+ this.readyState+" status="+this.status);
		if(this.readyState==4){
			$otp=randomOTP;
			saveRestDetails();
			// alert("Successfully Registered, we will reach to you as soon as possible");
			// window.location='https://matchball.org/en3_page.html';
		}
	}

	xhttp.open("GET",$url);
	xhttp.send();

	function saveRestDetails(){
		var databaseRef=firebase.database().ref('newRegistrations/'+$uid).set({
			Email:$email,
			Name:$("#u_name").val(),
			MobileNumber:$("#u_mobilenumber").val(),
			DateOfBirth:$("#u_dob").val(),
			Address:$("#u_address").val(),
			DisplayPicture:$imageDownloadUrl,
			StartingDate:localStorage.getItem("selectedDate"),
			CenterID:localStorage.getItem("center_id"),
			IsNewsLetterSigned:$isNewsLetterSigned ? 'y' :'n',
			CallConfirmation:'n',
			OTPConfirmation:'n',
			OTP:$otp,
		}).then(function(){
			alert("Successfully Registered, we will reach to you as soon as possible");
			window.location='https://matchball.org/en3_page.html';
		});
	}
}
