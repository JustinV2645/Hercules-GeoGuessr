let score = 0;
let guessMarker;
let distance;
let played = false;
let level = 1;
let usedLocations = []; 

document.getElementById("nxtBtn").onclick = function () {
  alert("You must place a guess or reveal the location before you can move on")
};

var locations = [
  [{ lat: 37.991654, lng: -122.242933 }, { city: 'Midship Dr' }, { difficulty: 'Hard'}],
  [{ lat: 37.999816, lng: -122.235547 }, { city: `Coronado st` }, { difficulty: 'Hard'}],
  [{ lat: 38.007739, lng: -122.274955 }, { city: 'Amber Ct' }, { difficulty: 'Normal'}],
  [{ lat: 38.027942, lng: -122.275978 }, { city: 'Trestle Cove' }, { difficulty: 'Normal'}],
  [{ lat: 38.009741, lng: -122.282567 }, { city: 'Hercules Ave' }, { difficulty: 'Easy'}],
  [{ lat: 38.011235, lng: -122.270548 }, { city: 'Creekside Center' }, { difficulty: 'Normal'}],
  [{ lat: 38.011108, lng: -122.265649 }, { city: 'Police Station' }, { difficulty: 'Hard'}],
  [{ lat: 37.989283, lng: -122.234317 }, { city: 'Grenadine Way' }, { difficulty: 'Normal'}],
  [{ lat: 38.022585, lng: -122.277040 }, { city: 'Alfred Nobel Dr' }, { difficulty: 'Hard'}],
  [{ lat: 38.010872, lng: -122.277021 }, { city: 'Forest Park' }, { difficulty: 'Hard'}],
  [{ lat: 38.013688, lng: -122.256773 }, { city: 'Willow Ave' }, { difficulty: 'Easy'}],
  [{ lat: 38.011151, lng: -122.259138 }, { city: 'Palm Ave' }, { difficulty: 'Normal'}],
  [{ lat: 38.017916, lng: -122.281959 }, { city: 'Willet St' }, { difficulty: 'Hard'}],
  [{ lat: 38.033202, lng: -122.273515 }, { city: 'Regatta Point' }, { difficulty: 'Hard'}],
  [{ lat: 38.018533, lng: -122.287789 }, { city: 'Railroad Ave' }, { difficulty: 'Hard'}],
  [{ lat: 38.014920, lng: -122.289291 }, { city: 'Camden Ln' }, { difficulty: 'Hard'}],
  [{ lat: 38.007289, lng: -122.270727 }, { city: 'Luckys' }, { difficulty: 'Normal'}],  
  [{ lat: 38.006878, lng: -122.254267 }, { city: 'Lupine Rd' }, { difficulty: 'Easy'}],
  [{ lat: 37.994808, lng: -122.269114 }, { city: 'Turqoise Dr' }, { difficulty: 'Hard'}],
  [{ lat: 37.994928, lng: -122.260313 }, { city: 'Malachite Ct' }, { difficulty: 'Hard'}],
  [{ lat: 38.0194342, lng: -122.2783655 }, { city: 'Shasta Ln' }, { difficulty: 'Normal'}],
  [{ lat: 38.0150788, lng: -122.2693670 }, { city: 'CA-4' }, { difficulty: 'Easy'}],
  [{ lat: 37.998134, lng: -122.274434 }, { city: 'Topaz Ct' }, { difficulty: 'Hard'}],
  [{ lat: 38.010041, lng: -122.273135 }, { city: 'Sycamore Place' }, { difficulty: 'Hard'}],
  [{ lat: 38.006976, lng: -122.277874 }, { city: '2-98 Mission Springs' }, { difficulty: 'Hard'}],
  [{ lat: 38.021417, lng: -122.272798}, { city: 'CC Gov Office' }, { difficulty: 'Hard'}],
  [{ lat: 38.013067, lng: -122.288957 }, { city: 'HBB Clubhouse' }, { difficulty: 'Hard'}],
  [{ lat: 38.012454, lng: -122.293534 }, { city: '243 Variz' }, { difficulty: 'Hard'}],  
  [{ lat: 38.009408, lng: -122.288480 }, { city: 'Outskirts farmland' }, { difficulty: 'Hard'}],
  [{ lat: 38.012822, lng: -122.261057 }, { city: 'Valley Bible Church' }, { difficulty: 'Normal'}],  
  [{ lat: 38.020108, lng: -122.266385 }, { city: 'Eucalyptus Knoll' }, { difficulty: 'Easy'}],
  [{ lat: 38.006511, lng: -122.272031 }, { city: 'Pheasant Dr' }, { difficulty: 'Normal'}],
  [{ lat: 37.990192, lng: -122.237081 }, { city: 'Vierra Way' }, { difficulty: 'Hard'}],
  [{ lat: 37.989489, lng: -122.230433 }, { city: 'Aruba Ct' }, { difficulty: 'Hard'}],
  [{ lat: 38.015823, lng: -122.265958 }, { city: 'Newbury St' }, { difficulty: 'Hard'}],
  [{ lat: 38.010185, lng: -122.263492 }, { city: 'Silver Maple Dr' }, { difficulty: 'Hard'}],
  [{ lat: 38.006863, lng: -122.263848 }, { city: 'Moraine Ct' }, { difficulty: 'Hard'}],
  [{ lat: 38.029302, lng: -122.269783}, { city: 'Schooner Cove' }, { difficulty: 'Hard'}],
  [{ lat: 38.023140, lng: -122.271899 }, { city: 'Multiple Organics store' }, { difficulty: 'Hard'}],
  [{ lat: 37.997548, lng: -122.239735 }, { city: 'Halsey Ct' }, { difficulty: 'Hard'}],

];

let currentLocation = locations[Math.floor(Math.random() * locations.length)];
let currentCords = currentLocation[0];
let currentCity = currentLocation[1].city;
let currentDifficulty = currentLocation[2].difficulty;

// Ensure the first location is added to usedLocations
usedLocations.push(locations.indexOf(currentLocation));

function goAgain() {
  const availableLocations = locations.filter((_, index) => !usedLocations.includes(index));

  if (availableLocations.length === 0) {
    alert("No more locations available this round.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableLocations.length);
  const selectedLocation = availableLocations[randomIndex];
  const originalIndex = locations.indexOf(selectedLocation);
  usedLocations.push(originalIndex);

  currentLocation = selectedLocation;
  currentCords = currentLocation[0];
  currentCity = currentLocation[1].city;
  currentDifficulty = currentLocation[2].difficulty;
  level += 1;
  initialize();

  document.getElementById("levelCounter").textContent = `Level: ${level} of 10`;
  document.getElementById("nxtBtn").onclick = function () {
    alert("You must place a guess or reveal the location before you can move on")
  };
}

function checkDistance() {
  var lat1 = guessMarker.position.lat();
  var lng1 = guessMarker.position.lng();
  var lat2 = currentCords.lat;
  var lng2 = currentCords.lng;

  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLng = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
let timerInterval;

function initialize() {
  document.getElementById("levelDifficulty").textContent = currentDifficulty
  if (timerInterval) { clearInterval(timerInterval); } 
  const timerElement = document.getElementById('timer'); let minutes = 0; let seconds = 0; function updateTimerDisplay() { const formattedMinutes = minutes.toString().padStart(2, '0'); const formattedSeconds = seconds.toString().padStart(2, '0'); timerElement.textContent = `Timer: ${formattedMinutes}:${formattedSeconds}`; } function startTimer() { timerInterval = setInterval(() => { seconds++; if (seconds === 60) { seconds = 0; minutes++; } updateTimerDisplay(); }, 1000); } startTimer();
  
  if (level > 10) {
    alert(`Round Over. Final score: ${score}`);
    window.location.replace("index.html");
  }
  else if (level == 10){
    document.getElementById("nxtBtn").value = "Continue"
  }



  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: currentCords,
      pov: {
        heading: 90,
        pitch: 10,
      },
      disableDefaultUI: true,
      showRoadLabels: false,
      mapTypeControl: false,
      clickToGo: false,
      zoomControl: false,
      keyboardShortcuts: false,
      
    },
  );

  document.getElementById("revealBtn").onclick = function() {
    const image = "Untitled design.png";
      let targetLatLng = new google.maps.LatLng(
        currentCords.lat,
        currentCords.lng
    );
      let targetMarker = new google.maps.Marker({
        position: targetLatLng,
        title: "Actual Location",
        draggable: false,
        icon: image,
        anchor: new google.maps.Point(15, 15),
    });
    targetMarker.setMap(map);
    let myinfowindow = new google.maps.InfoWindow({});
    myinfowindow.setContent(
      `The location was ${currentCity} </br>`
    );
    myinfowindow.open(map, targetMarker);
    document.getElementById("nxtBtn").onclick = function () {
      goAgain();
    };
  };  

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.009875, lng: -122.268012 },
    zoom: 14,
    mapTypeId: "roadmap",
    disableDefaultUI: true,
    zoomControl: true,
    disableDoubleClickZoom: true,
    clickableIcons: false,
  });

  map.addListener("dblclick", (mapsMouseEvent) => {
    if (played === true) {
      return;
    }

    let guessLocation = new google.maps.LatLng(
      mapsMouseEvent.latLng.lat(),
      mapsMouseEvent.latLng.lng()
    );

    guessMarker = new google.maps.Marker({
      position: guessLocation,
      title: "Your Guess",
    });
    guessMarker.setMap(map);

    const image = "Untitled design.png";
    let targetLatLng = new google.maps.LatLng(
      currentCords.lat,
      currentCords.lng
    );
    let targetMarker = new google.maps.Marker({
      position: targetLatLng,
      title: "Actual Location",
      draggable: false,
      icon: image,
      anchor: new google.maps.Point(15, 15),
    });
    targetMarker.setMap(map);

    distance = checkDistance();

    let pointsGained = 0
    if (distance <= 0.10) {
      score += 20;
      pointsGained = 20
    } 
    else if (distance <= 0.5) {
      score += 15;
      pointsGained = 15
    } else if (distance <= 1.0) {
      score += 10;
      pointsGained = 10
    } else if (distance <= 1.5) {
      score += 5;
      pointsGained = 5
    }

    let myinfowindow = new google.maps.InfoWindow({});
    myinfowindow.setContent(
      `The location was ${currentCity} </br>Your guess was ${distance.toFixed(1)} km off </br>Points Earned: ${pointsGained}`
    );
    myinfowindow.open(map, targetMarker);

    let lineCoordinates = [
      targetLatLng,
      guessLocation,
    ];
    let linePath = new google.maps.Polyline({
      path: lineCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    linePath.setMap(map);
    
    
    document.getElementById("scoreCounter").textContent = `${score}`;
    if (level != 7){
      document.getElementById("nxtBtn").value = "Next Level"
    }
    document.getElementById("nxtBtn").onclick = function () {
      goAgain();
    };
    document.getElementById("revealBtn").onclick = function() {
      alert("You Have already guessed the location")
    }  
  });
}

window.initialize = initialize;
