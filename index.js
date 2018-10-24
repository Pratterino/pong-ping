var clapDetector = require('clap-detector');
// Define configuration
var clapConfig = {
   AUDIO_SOURCE: 'alsa hw:1,0'// default for linux
};

var time;
var timer;
var lastClap;
 
function checkAvailability() {
	
	var isAvailable = lastClap ? (new Date().getTime() - lastClap.time) > 5000 : false;
	if (isAvailable)  {
		console.log('Bollen har inte studsat på 5 sekunder bordet är ledigt');
	} else {
		console.log('Bordet är upptaget');
	}
}

// Start clap detection
function startApplication() {
	clapDetector.start(clapConfig);
	setInterval(checkAvailability, 2000)

}	
 
// Register on clap event
clapDetector.onClap(function(history) {
	lastClap = history[history.length -1];
    console.log('your callback code here ', history.length);
    
    //new clap
    // check if time is older then 30 sec
    //if(time compare)
});
 
 
// Update the configuration
clapDetector.updateConfig({
	DETECTION_PERCENTAGE_START : '5%', // minimum noise percentage threshold necessary to start recording sound
	DETECTION_PERCENTAGE_END: '5%',  // minimum noise percentage threshold necessary to stop recording sound
	CLAP_AMPLITUDE_THRESHOLD: 0.2, // minimum amplitude threshold to be considered as clap
	CLAP_ENERGY_THRESHOLD: 0.3,  // maximum energy threshold to be considered as clap
	MAX_HISTORY_LENGTH: 10 // all claps are stored in history, this is its max length
});

startApplication();