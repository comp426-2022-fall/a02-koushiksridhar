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
// default action
if (args.h) {
    try {console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
    `)
    process.exit(0);
    } 
    catch (err) {
        process.exit(1);
    }
}

const lat = '35';
if (args.n) {
    let lat = parseFloat(args.n).toFixed(2);
}

if (args.s){
    let lat = parseFloat(args.s).toFixed(2);

}

const long = '-79';
if (args.e) {
    let long = parseFloat(args.e).toFixed(2);
}

if (args.w) {
    let long = parseFloat(args.e).toFixed(2);
}

const time = moment.tz.guest();

const base_url = 'https://api.open-meteo.com/v1/forecast'
const data_string = 'latitude=' + lat + '&longitude=' + long + '&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone
const url = base_url + '?' + data_string;


const response = await fetch(url);

const data = await response.json();

if (args.d) {
    const days = args.d 

    //find if day is today, future, or tomorrow

    if (days == 0) {
      console.log("today.")
    } else if (days == 1) {
      console.log("tomorrow.")
    } else {
      console.log("in " + days + " days.")
    }

    //precipation data 
    if (data.daily.precipitation_hours[days] != 0.0) {
        console.log("You might need your galoshes");
    } else{
        console.log("You will not need your galoshes");
    }
}

if (args.j) {
    console.log(data);
    exit(0);
}


