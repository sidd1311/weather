// Set the Cesium Ion access token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWFiYTk2YS05ODNjLTRhOGMtYjAxMi1hZTZlNTBiZjhhNjciLCJpZCI6MjIwMjE2LCJpYXQiOjE3MTc1Nzc1MjZ9.YlTuNHJxUCMwExzJ6lFkXv2whLH8llfgBtPSBtCpzFE';

// Initialize the Cesium Viewer
var viewer = new Cesium.Viewer('cesiumContainer');

var weatherApiKey = 'fb8233e0dcf39dd5ed47a488ef139102';

// Create a ScreenSpaceEventHandler
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// Set up the click event handler
handler.setInputAction(function (movement) {
    // Get the Cartesian coordinates of the click position
    var cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
    if (cartesian) {
        // Convert Cartesian to Cartographic coordinates
        var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
        // Convert radians to degrees
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        
        // Update the coordinate box
        document.getElementById('latitude').textContent = latitude.toFixed(6);
        document.getElementById('longitude').textContent = longitude.toFixed(6);

        // Fetch and display weather data
        fetchWeather(latitude, longitude);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

function fetchWeather(latitude, longitude) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var weather = data.weather[0].description;
            var temperature = data.main.temp;

            document.getElementById('weather').textContent = weather;
            document.getElementById('temperature').textContent = temperature.toFixed(1);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}