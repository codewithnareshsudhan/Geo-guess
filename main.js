// initial global vars

var clevel = 1
var remap = 0
var score = 0
var w = ""
var choiceCities = []
mapboxgl.accessToken = 'meow';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Nob29sb2ZjaXRpZXMiLCJhIjoiY2w2bnFhaWJrMDNibjNqdGZibmhtNXpxbyJ9.ogVJPKMFm_JGVv8wNDsi9A';


// function for a random int within a range

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// initialize the map

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/schoolofcities/cl6nnmkks003q14pax679hpw4', // stylesheet location
  center: [0,0], // starting position [lng, lat]
  zoom: 12, // starting zoom
  maxZoom: 16,
  minZoom: 11.05,
  // pitchWithRotate: false,
  maxBounds: [[-0.42,-0.42],[0.42,0.42]] // Sets bounds as max
});

nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

bar = new mapboxgl.ScaleControl({
  maxWidth: 100,
  unit: 'metric'
});
map.addControl(bar);



// function for showing the map given a level and stage

function showMap(level) {

  // generating an array of cities for this level, based on the level, stage criteria

  level_array = []

  if (level < 11) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["WORLDCITY"] > 0) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 11 && level < 21) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["ADM0CAP"] > 0 || cities["features"][c]["properties"]["WORLDCITY"] > 0) {
        level_array.push(cities["features"][c])
      }
    }
  }
  else if (level >= 21 && level < 31) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["SCALERANK"] <= 3) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 31 && level < 41) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["GN_POP"] > 999999 || cities["features"][c]["properties"]["ADM0CAP"] > 0) {
        level_array.push(cities["features"][c])
      }
    }
  } else if (level >= 41 && level < 51) {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["MEGACITY"] > 0) {
        level_array.push(cities["features"][c])
      }
    }
  }  else if (level >= 51 && level < 71)
  for (var c in cities["features"]) {
    if (cities["features"][c]["properties"]["SCALERANK"] < 5) {
      level_array.push(cities["features"][c])
    }
  }
  else {
    for (var c in cities["features"]) {
      if (cities["features"][c]["properties"]["SCALERANK"] < 12) {
        level_array.push(cities["features"][c])
      }
    }
  };

  // remove cities that have already been selected

  level_array = level_array.filter( ( el ) => !choiceCities.includes( el ) );


  // a random 4 cities from the array of cities

  rando_m0 = getRandomInt(0, level_array.length - 1)
  rando_m1 = getRandomInt(0, level_array.length - 1)
  while (rando_m1 === rando_m0) {
    rando_m1 = getRandomInt(0, level_array.length - 1)
  }
  rando_m2 = getRandomInt(0, level_array.length - 1)
  while (rando_m2 === rando_m0 || rando_m2 === rando_m1) {
    rando_m2 = getRandomInt(0, level_array.length - 1)
  }
  rando_m3 = getRandomInt(0, level_array.length - 1)
  while (rando_m3 === rando_m0 || rando_m3 === rando_m1 || rando_m3 === rando_m2) {
    rando_m3 = getRandomInt(0, level_array.length - 1)
  }



  // setting up an array of just these citeis

  var cities_select = [level_array[rando_m0],level_array[rando_m1],level_array[rando_m2],level_array[rando_m3]]

  // random city of these 4

  rando_i = getRandomInt(0, 3)

  p_score = score + 100 * (5 + 5 * (1 - cities_select[rando_i]["properties"]["WORLDCITY"]) + parseInt(cities_select[rando_i]["properties"]["SCALERANK"]))


  choiceCities.push(cities_select[rando_i])


  // setting up the map to centre on a City

  var cx = cities_select[rando_i]["geometry"]["coordinates"][0]
  var cy = cities_select[rando_i]["geometry"]["coordinates"][1]

  w = cities_select[rando_i]["properties"]["NAME"]

  var bounds = [
      [cx - 0.42, cy - 0.42], // Southwest
      [cx + 0.42, cy + 0.42]  // Northeast
  ];

  

  map.dragRotate._pitchWithRotate = false;

  // adding controls to the map
  
  map.setMaxBounds(bounds);
  map.panTo([cx,cy]);
  
  

  // adding names to the form

  document.getElementById("p1").innerHTML = "<b>" + cities_select[0]["properties"]["NAME"] + "</b>, " + cities_select[0]["properties"]["ADM0NAME"]
  document.getElementById("p2").innerHTML = "<b>" + cities_select[1]["properties"]["NAME"] + "</b>, " + cities_select[1]["properties"]["ADM0NAME"]
  document.getElementById("p3").innerHTML = "<b>" + cities_select[2]["properties"]["NAME"] + "</b>, " + cities_select[2]["properties"]["ADM0NAME"]
  document.getElementById("p4").innerHTML = "<b>" + cities_select[3]["properties"]["NAME"] + "</b>, " + cities_select[3]["properties"]["ADM0NAME"]

};




// show the initial map

showMap(clevel)




// function for what happens when submit is clicked

function submitAnswers() {

  // messages for when somone answeres correct

  var yesses = [
    "Yes! Yes! Yes!",
    "Indeed",
    "Correct!",
    "Well Done!",
    "Ole!",
    ":)",
    "Perfecto",
    "Excellent!",
    "Wonderful!",
    "Fabulous!",
    "Hooray!",
    "Huzzah",
    "Top Notch",
    "Are you cheating?",
    "S M R T",
    "Woohoo!",
    "Amazing!",
    "Superstar!",
    "You're good!",
    "You got it!",
    "Great Job!",
    "Good!",
    "Great!",
    "Totally",
    "Tubular!"
    ]

  // grab the value of result (1 to 4)

  var q1 = document.forms['quizForm']['q1'].value;
  console.log(eval(q1))

  // if correct

  if (eval(q1) === rando_i + 1) {
    console.log("correcto")
    //update the level
    clevel = clevel + 1
    // show the next map
    showMap(clevel)

    // update the level
    var count_score = parseInt(document.getElementById("level").innerHTML) + 1
    document.getElementById("level").innerHTML = count_score + ""

    // update the score
    score = p_score
    document.getElementById("score").innerHTML = score + ""

    // display a correct message
    document.getElementById("message").innerHTML = yesses[getRandomInt(0, yesses.length - 1)]

  }

  // if wrong

  else {

    console.log("boourns")

    // say game over
    document.getElementById("message").innerHTML = "<b><span id='end'>GAME OVER :(</b> <br><br>&nbsp;The correct answer was " + w

    // assign high scores
    var escore = document.getElementById("hscore").innerHTML
    var elevel = document.getElementById("hlevel").innerHTML

    if (clevel > elevel) {
      document.getElementById("hlevel").innerHTML = (clevel - 1) + ""
    }

    if (score > escore) {
      document.getElementById("hscore").innerHTML = score + ""
    }

    // refresh scores and start the game over again
    clevel = 1
    remap = 1
    p_score = 0
    score = 0
    choiceCities = []
    showMap(clevel)
    document.getElementById("score").innerHTML = "0"
    document.getElementById("level").innerHTML = "1"

  }

  return false;
}
