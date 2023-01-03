let schedule = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

$(document).ready(function(){
  if(!localStorage.getItem('schedule')) {updateTasks(schedule)} 
  else {updateTasks(JSON.parse(localStorage.getItem('schedule')))}})

$('#current-date').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm A'));

let counter = 1;
for(const property in schedule) {
  let textInput = "#text-entry" + counter;
  $(textInput).text(schedule[property]);
  let timeId = "#time" + counter;
  let presentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = stringToNumber(timeString);  
  if(timeNumber < presentHour) {
    $(textInput).addClass("past-hour");
  } else if (timeNumber > presentHour) {
    $(textInput).addClass("future-hour");
  } else {
    $(textInput).addClass("present-hour");
  }
  counter ++;
}

$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  saveSchedule(hourString, value);
});


function stringToNumber(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

const loadCorrectDataset = () => {result = localStorage.getItem('schedule'); return (result ? result : schedule)};

const initializeLocalStorage = () => {localStorage.setItem('schedule', JSON.stringify(schedule))};

const saveToLocal = (dayObj) => {localStorage.setItem('schedule', JSON.stringify(dayObj))};

const saveSchedule = (hourString, val) => {if(!localStorage.getItem('schedule')) {initializeLocalStorage()}
  let workHours = JSON.parse(localStorage.getItem('schedule')); workHours[hourString] = val; saveToLocal(workHours)};

const updateTasks = function(dayObject) {$(".calendar-row").each(function(index) {let res = $(this).children("div");
  $(this).children("textarea").text(dayObject[res.text()])})};