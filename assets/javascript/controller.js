// This is for the workers that render the logic to the views (and generate the views)

// controller object
let controller = {

    // capture all the fields in the form area
    captureFormFields: () => {
        $('body').on("click", ".button-add", () => {
            // prevent form from submitting
            event.preventDefault();

            // variables from the form field values
            trainNumber = $('#train-number').val().trim();
            trainLine = $('#train-line').val().trim();
            trainDestination = $('#train-destination').val().trim();
            trainDeparture = $('#train-departure').val().trim();
            trainFrequency = $('#train-frequency').val().trim();
            trainPlatform = $('#train-platform').val().trim();

            // Console Log each variable
            // console.log(trainNumber)
            // console.log(trainLine)
            // console.log(trainDestination)
            // console.log(trainDeparture)
            // console.log(trainFrequency)
            // console.log(trainPlatform)
            controller.nextArrival();
            controller.minutesAway();

            // Clear the fields in the form
            $('.form-control').val("");

            model.pushNewTrain();
            // view.updateTrainScheduleTable();

        });
    },

    // Create functions for Time Calculation 

    nextArrival: () => {
        // First Time (back a year to keep time current)
        var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
        // Current Time
        var currentTime = moment();
        // Time difference
        var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
        // Time apart (remainder)
        var timeRemainder = diffTime % trainFrequency;
        // Time till arrival
        var timeInMinutesTillTrain = trainFrequency - timeRemainder;
        // Next train
        nextTrain = moment().add(timeInMinutesTillTrain, 'minutes');
        nextTrain = moment(nextTrain).format('h:mm A');
    },

    minutesAway: () => {
        // First Time (back a year to keep time current)
        var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
        // Current Time
        var currentTime = moment();
        // Time difference
        var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
        // Time apart (remainder)
        var timeRemainder = diffTime % trainFrequency;
        // Time till arrival
        minutesAway = trainFrequency - timeRemainder;
        minutesAway = moment().startOf('day').add(minutesAway, 'minutes').format('HH:mm');
        return moment(minutesAway).format('HH:mm');
    },
    convertFrequency: () => {
        trainFrequency = moment().startOf('day').add(trainFrequency, 'minutes').format('HH:mm');
    }

};