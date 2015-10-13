var rootURL = "http://localhost:8080/SpareHands/rest";
var menuLeft = document.getElementById( 'cbp-spmenu-s1' );

$(document).ready(function() {
	$('#jobs-section').show();
	$('#profile-section').hide();
	$('#applications-section').hide();

	var cookie = getCookie("UserLoggedIn=");

	if(!cookie){
		displayNoUserLoggedIn();
	}
	else{
		displayUserLoggedIn();
	}
	
	$("#jobsNav").click(function(event) {
		jobsSelected();
	});
	$("#myJobsNav").click(function(event) {
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#myjobs-section').show();
		$('#applications-section').hide();
		$('#profile-section').hide();
		generateMyJobs();
		});
	$("#applicationsNav").click(function(event) {
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#myjobs-section').hide();
		$('#applications-section').show();
		$('#profile-section').hide();
		});
	$("#profileNav").click(function(event) {
		$('#jobsNav').addClass('inactive').removeClass('active');
		$('#jobs-section').hide();
		$('#myjobs-section').hide();
		$('#applications-section').hide();
		$('#profile-section').show();
		generateProfile();
	});

	$("#logout").click(function(event) {
		displayNoUserLoggedIn();
		document.cookie = "UserLoggedIn="+getCookie("UserLoggedIn=")+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		$('#nav_list').removeClass('active').addClass('inactive');
		$('.pushmenu-push').removeClass('pushmenu-push-toright');
		$('.pushmenu-left').removeClass('pushmenu-open');
		jobsSelected();
	});
	
	$("#showLeft").click = function() {
		classie.toggle( this, 'active' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		disableOther( 'showLeft' );
	};
	
	$(document).on("click", '#jobPanelClickable', function(){showJobDetails($(this).data('identity'));});
});

function displayNoUserLoggedIn(){
	$('#nav_list').hide();
	$('#login').show();
	$('#register').show();
	$('#jobModalApplyButton').hide();
}

function displayUserLoggedIn(){
	$('#nav_list').show();
	$('#logout').show();
	$('#login').hide();
	$('#register').hide();
	$('#jobModalApplyButton').show();
	$('#createJobButton').show();
}

function jobsSelected() {
	$('#jobsNav').addClass('active').removeClass('inactive');
	$('#jobs-section').show();
	$('#applications-section').hide();
	$('#profile-section').hide();
}


function generateProfile(){
	var userDetails = findUserById(getCookie("UserLoggedIn="));
	var date = new Date(userDetails.dob);
	date = date.customFormat( "#YYYY#-#MM#-#DD#" );
	$("#myDetailsSection").show();
	$("#myPasswordSection").hide();
	$("#myAccountSection").hide();
	$('#myDetailsTab').addClass('active').removeClass('inactive');
	$('#myPasswordTab').addClass('inactive').removeClass('active');
	$('#myAccountTab').addClass('inactive').removeClass('active');
	$('#profileForeName').val(userDetails.forename);
	$('#profileSurname').val(userDetails.surname);
	$('#profileEmail').val(userDetails.email);
	$('#profileDOB').val(date);
}

function showJobDetails(id){
	var jobData = getJobById(id);
	$('#jobModalTitle span').text(jobData.title);
	$('#jobModalDescription span').text(jobData.description);
	$('#jobModalDate span').text(jobData.date);
	$('#jobModalLocation span').html('<a href="https://www.google.ie/maps/search/'+jobData.location+'">'+jobData.location+'</a>');
	$('#jobModalReward span').text(jobData.reward);
}

function generateMyJobs(){

}
