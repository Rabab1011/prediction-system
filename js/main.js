

//navbar
$(document).ready(function(){
  $(".link1").click(function(){
  $(".menu1 li a").removeClass("active");
    $(this).addClass("active");
    
  });
});


      AOS.init();
 




// tabs in predict page
let tabs=document.querySelectorAll(".tabs li");
let tabsarray =Array.from(tabs); 
    

const divs=document.querySelectorAll(".tcontent > div");
let divsarray =Array.from(divs); 


tabsarray.forEach((ele)=>{
   ele.addEventListener("click",function(e){
   // console.log(ele);
      tabsarray.forEach((ele)=>{
        ele.classList.remove("active2"); 
        
      });
      e.currentTarget.classList.add("active2");
      divsarray.forEach((div)=>{
        div.style.display='none';
       
      });
     // console.log(e.currentTarget.dataset.contt);
      document.querySelector( e.currentTarget.dataset.contt).style.display="block";
   });
});



//-------------------------------------------------
// bottons in index page
const btn1=document.getElementsByClassName("eqday");
const btn22=document.getElementsByClassName("mmorning");
const btn3=document.getElementsByClassName("mevening");

//console.log("btn1");
let bottonns=document.querySelectorAll(".radio li");
let bottonnsarray=Array.from(bottonns);

bottonnsarray.forEach((x)=>{
  x.addEventListener("click",function(e){
     bottonnsarray.forEach((r)=>{
      r.classList.remove("btnactive");
     });
     //console.log( e.currentTarget)
     e.currentTarget.classList.add("btnactive");
     
  });
});

// tabs in index page
let tabs2=document.querySelectorAll(".tabs2 li");
let tabsarray2 =Array.from(tabs2); 
    

const divs2=document.querySelectorAll(".dcontent > div");
let divsarray2 =Array.from(divs2); 


tabsarray2.forEach((ele)=>{
   ele.addEventListener("click",function(e){
   // console.log(ele);
      tabsarray2.forEach((ele)=>{
        ele.classList.remove("active3"); 
        
      });
      e.currentTarget.classList.add("active3");
      divsarray2.forEach((div)=>{
        div.style.display='none';
       
      });
     // console.log(e.currentTarget.dataset.contt);
      document.querySelector( e.currentTarget.dataset.cont2).style.display="block";
   });
});



/* ----------- map------------*/
let map, infoWindow;

var drawingManager;
var selectedShape;
var colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
var selectedColor;
var colorButtons = {};

function clearSelection() {
  if (selectedShape) {
    selectedShape.setEditable(false);
    selectedShape = null;
  }
}

function setSelection(shape) {
  clearSelection();
  selectedShape = shape;
  shape.setEditable(true);
  selectColor(shape.get('fillColor') || shape.get('strokeColor'));
  google.maps.event.addListener(shape.getPath(), 'set_at', calcar);
  google.maps.event.addListener(shape.getPath(), 'insert_at', calcar);
}

function calcar() {
    var area = google.maps.geometry.spherical.computeArea(selectedShape.getPath());
    document.getElementById("area").innerHTML = " " + area.toFixed(2);
}

function deleteSelectedShape() {
  if (selectedShape) {
    selectedShape.setMap(null);
  }
}

function selectColor(color) {
  selectedColor = color;
  for (var i = 0; i < colors.length; ++i) {
    var currColor = colors[i];
    colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
  }

  // Retrieves the current options from the drawing manager and replaces the
  // stroke or fill color as appropriate.
  var polylineOptions = drawingManager.get('polylineOptions');
  polylineOptions.strokeColor = color;
  drawingManager.set('polylineOptions', polylineOptions);

  var rectangleOptions = drawingManager.get('rectangleOptions');
  rectangleOptions.fillColor = color;
  drawingManager.set('rectangleOptions', rectangleOptions);

  var circleOptions = drawingManager.get('circleOptions');
  circleOptions.fillColor = color;
  drawingManager.set('circleOptions', circleOptions);

  var polygonOptions = drawingManager.get('polygonOptions');
  polygonOptions.fillColor = color;
  drawingManager.set('polygonOptions', polygonOptions);
}

function setSelectedShapeColor(color) {
  if (selectedShape) {
    if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
      selectedShape.set('strokeColor', color);
    } else {
      selectedShape.set('fillColor', color);
    }
  }
}

function makeColorButton(color) {
  var button = document.createElement('span');
  button.className = 'color-button';
  button.style.backgroundColor = color;
  google.maps.event.addDomListener(button, 'click', function() {
    selectColor(color);
    setSelectedShapeColor(color);
  });

  return button;
}

function buildColorPalette() {
  var colorPalette = document.getElementById('color-palette');
  for (var i = 0; i < colors.length; ++i) {
    var currColor = colors[i];
    var colorButton = makeColorButton(currColor);
    colorPalette.appendChild(colorButton);
    colorButtons[currColor] = colorButton;
  }
  selectColor(colors[0]);
}
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 31.027233, lng: 31.378741 },  //31.027233, 31.378741
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    zoomControl: true
  });
  // the beginning of code to determine location 
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            
          };
          
      //marker in location
     new google.maps.Marker({
      position: pos,
        map,
       title: "location",
    });
  

          infoWindow.open(map);
          
          map.setCenter(pos);
          map.setZoom(18);
         // duration( 50000);
          
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }); 
  // the end of code to determine location 

 // drow in map
 var polyOptions = {
    strokeWeight: 0,
    fillOpacity: 0.45,
    editable: true
  };
  // Creates a drawing manager attached to the map that allows the user to draw
  // markers, lines, and shapes.
  drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    markerOptions: {
      draggable: true
    },
    polylineOptions: {
      editable: true
    },
    rectangleOptions: polyOptions,
    circleOptions: polyOptions,
    polygonOptions: polyOptions,
    map: map
  });
  /*------------*/

  
  google.maps.event.addListener(map, "rightclick", function (event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // populate your box/field with lat, lng
    document.getElementById("space").value = lat + "," + lng;
    var location = lat + "," + lng;
}); 

  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
    if (e.type != google.maps.drawing.OverlayType.MARKER) {
      // Switch back to non-drawing mode after drawing a shape.
      drawingManager.setDrawingMode(null);

      // Add an event listener that selects the newly-drawn shape when the user
      // mouses down on it.
      var newShape = e.overlay;
      newShape.type = e.type;
      google.maps.event.addListener(newShape, 'click', function() {
        setSelection(newShape);
      });
      var area = google.maps.geometry.spherical.computeArea(newShape.getPath());
    var ar=  document.getElementById("area").innerHTML = " " + area.toFixed(2);
    // document.getElementById("area").setAttribute(value ,area.toFixed(2))  ;
   // document.getElementById("area").value = ar ;
   var ar=  document.getElementById("area").innerHTML = " " + area.toFixed(2);
    // document.getElementById("area").setAttribute(value ,area.toFixed(2))  ;
    document.getElementById("area").value = ar ;
      setSelection(newShape);
    }
  });

  // Clear the current selection when the drawing mode is changed, or when the
  // map is clicked.
  google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
  google.maps.event.addListener(map, 'click', clearSelection);
  google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);

  buildColorPalette();



}



// the beginning of code to determine location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
  
}

//window.initMap = initMap;
// the beginning of code to determine location */
google.maps.event.addDomListener(window, 'load', initialize);

//-------------------------------




