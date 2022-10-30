// Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
//     -h            Show this help message and exit.
//     -n, -s        Latitude: N positive; S negative.
//     -e, -w        Longitude: E positive; W negative.
//     -z            Time zone: uses tz.guess() from moment-timezone by default.
//     -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
//     -j            Echo pretty JSON from open-meteo API and exit.


//Imports
import minimist from 'minimist'; //minimist is the parser on any args on the command line
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));
console.log(args);


//h
if (args.h) {
  
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE")
    console.log("-h            Show this help message and exit.")
    console.log("-n, -s        Latitude: N positive; S negative.")
    console.log("-e, -w        Longitude: E positive; W negative.")
    console.log("-z            Time zone: uses tz.guess() from moment-timezone by default.")
    console.log("-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.")
    console.log("-j            Echo pretty JSON from open-meteo API and exit.")
    process.exit(0);
}

//timezone
const timezone = args.z || moment.tz.guess();

//lat and long

var lat = args.n || (args.s * -1);
var long = args.e || (args.w * -1);

//make request
const resp = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m,precipitation,windspeed_10m,temperature_80m&daily=precipitation_hours&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&timezone=' + timezoned);

const data = await resp.json();
if (args.j){
    console.log(data);
    process.exit(0);
}

//create a day variable to check next day precipitation level
var day = args.d || 1;

if (data.daily.precipitation_hours[day] == 0){
    console.log("No need to war galoshes");
} else {
    console.log("Wear your galoshes");
}

//print precipiration for selected day
const days = args.day
if (days == 0){
    console.log("today.");
} else if (days > 1){
    console.log("in " + days + " days.")
} else {
    console.log("tomorrow.")
}
