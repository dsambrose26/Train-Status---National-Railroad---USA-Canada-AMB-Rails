 // This is the page view/styling that is rendered

 // On Page Load
 $(document).ready(function(){

	controller.captureFormFields();
	model.initialDatabasePull();
	setInterval(function() {model.initialDatabasePull()}, 60000);
	view.updateCurrentTime();
	setInterval(function() {view.updateCurrentTime()}, 1000);

});

// View Object
var view = {

};