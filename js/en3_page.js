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

	var callFlag='n';
	var otpFlag='n';
	// decide otp and call images on page load
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			console.log("user 11="+user);
			var userRef=firebase.database().ref("newRegistrations/"+user.uid);
			userRef.on('value',function(snapshot){
				var userDetails=snapshot.val();

				
				var otpImageFlag=userDetails.OTPConfirmation;

				otpFlag=otpImageFlag;
				console.log("otpImageFlag="+otpImageFlag);

				if(otpImageFlag=='y'){
					$("#otp_image").attr('src',"images/correct-signal.png");
				}
				else{
					$("#otp_image").attr('src',"images/wrong.png");
				}

				var callImageFlag=userDetails.CallConfirmation;
				console.log("callImageFlag="+callImageFlag);

				callFlag=callImageFlag;
				if(callImageFlag=='y'){
					$("#call_image").attr('src',"images/correct-signal.png");
				}
				else{
					$("#call_image").attr('src',"images/wrong.png");
				}

				// UserUID , so that don't need to use onAuth again and again 
				UserUID=user.uid;
				// MobileNumber
				UserMobileNumber=userDetails.MobileNumber;
			});
		}
		else{
			console.log("User haven't signed yet");
		}
	});
	

	// verify otp button
	$("#verifyOTP").on('click',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		$filledOTP=$("#u_otp").val();

		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				$user_uid=user.uid;
				var otpRef=firebase.database().ref("newRegistrations/"+$user_uid+"/OTP");
				otpRef.on('value',function(snapshot){
					$user_otp=snapshot.val();
					console.log("user otp="+$user_otp+" filledOTP="+$filledOTP);
					if($user_otp==$filledOTP){
						changeOTPCrossImageToRight();
						firebase.database().ref("newRegistrations/"+$user_uid).update({"OTPConfirmation":'y'}).catch(function(error){
							console.log("error in updating="+error.message);
						});
					}
				});
			}
			else{
				alert("Not signed in");
			}
		});
	});

	function changeOTPCrossImageToRight(){
		$("#otp_image").stop().fadeOut("slow",function(){
			$("#otp_image").attr('src',"images/correct-signal.png");
		}).fadeIn("slow");
	}

	$("#resendOTP").on('click',function(e){
		e.stopImmediatePropagation();
		generateSendAndUpdateOTP();
		console.log("resend otp called");
	});

	function generateSendAndUpdateOTP(){

		var randomOTP=Math.floor(Math.random()*(9000)+1000);
		var contactNumber="91"+$("#u_mobilenumber").val();

		$url="https://api.msg91.com/api/sendhttp.php?route=4&country=India&flash=0&unicode=0&authkey=173943AYNwd1wDwR7k59b43b46&mobiles="+UserMobileNumber+"&message="+randomOTP+"%20is%20your%20One%20Time%20Password.%20Thank%20you%20for%20choosing%20MatchBall.&sender=MABALL"
		console.log("url="+$url);
		
		var xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange=function(){
			console.log("current state="+ this.readyState+" status="+this.status);
			if(this.readyState==4){
				$otp=randomOTP;
				console.log("UserUID="+UserUID);
				var updateOtpRef=firebase.database().ref("newRegistrations/"+UserUID).update({"OTP":$otp});
			}
		}

		xhttp.open("GET",$url);
		xhttp.send();
	}

	$("#nextStep").on('click',function(e){
		e.stopImmediatePropagation();
		console.log("callFlag="+callFlag+" otpFlag="+otpFlag);
		if(callFlag=='y' && otpFlag=='y'){
			alert("You can go to payment gateway.");
		}
		else if(otpFlag=='y'){
			alert("Call confirmation is pending, please wait.");
		}
		else{
			alert("Confirmation is pending.")
		}
	})
		
	
});
