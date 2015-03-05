(function(){

 var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
 // var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPIID=" + API_WEATHER_KEY; + "&";
 var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?";
 var celsConv = 272.15;
 var API_WORLDTIME_KEY = "6ae77c55b4769e63bab0552f5b536";
 var API_WOLRDTIME_URL = "https://api.worldweatheronline.com/free/v2/tz.ashx?key=" + API_WORLDTIME_KEY + "&format=json&q=";
 var cityWeather = {};
 cityWeather.zone;
 cityWeather.icon;
 cityWeather.temp;
 cityWeather.temp_max;
 cityWeather.temp_min;
 cityWeather.main;

 var cities= [];

 var $body = $("body");
 var $loader = $(".loader");
 var nombreNuevaCiudad = $("[data-input='cityAdd']");
 var buttonAdd = $("[data-button='add']");
 var buttonLoad = $("[data-button='cities']");


 $(buttonAdd).on("click", addNewCity);
 $(nombreNuevaCiudad).on("keypress", function(event){
 	if (event.which === 13){
 		addNewCity(event);
 	}
 });

$(buttonLoad).on("click", loadSaveCities);


 function DateFormate(dateFormate) {
    var d = new Date();
    // return $.datepicker.formatDate(dateFormate, datetime).timeFormat;
    // return $.datepicker.formatDate(dateFormate, d) + " " + d.toString("hh:mm tt");
    return $.datepicker.formatDate(dateFormate, d) + " " + d.toLocaleTimeString();

 };

   if(navigator.geolocation){

  

   	navigator.geolocation.getCurrentPosition(getCoords,errorFound);
   	
   }else{
   	alert("Tu no tienes un navegador avanzado");
   }

 	function errorFound(err){
   	alert("Ocurrio un error: " + err);
   }

   function getCoords(position){
   	
   	var geo = [{}];
   	var lat = position.coords.latitude;
   	var lon = position.coords.longitude;
   	geo.lat = lat;
   	geo.lon = lon;
   	console.log("La posición es: " + lat + "," + lon);
   	// console.log(JSON.parse(geo));
   	// console.log(geo.lat);
   $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon , getCurrentWeather);

   }

   function getCurrentWeather(data){
   	if (data.cod === 200){

   		
	   	 cityWeather.zone = data.name;
		 cityWeather.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		 cityWeather.temp = data.main.temp - celsConv;
		 cityWeather.temp_max = data.main.temp_max - celsConv;
		 cityWeather.temp_min = data.main.temp_min - celsConv;
		 cityWeather.main = data.weather[0].main;

	   	  
	 	  console.log(data);
	 	  console.log(Math.round(cityWeather.temp));
	 	  console.log(cityWeather.icon);
	 	  console.log(cityWeather.zone);

	 	  //render
	 	  renderTemplate(cityWeather);

	 };

	

	
   }

    function renderTemplate(cityWeather, localtime){
	 	var clone = activateTemplate("#template--city");
	 	// clone.QuerySelector("[data-time]").innerHTML = "";
	 	// console.log(clone);
	 	// var $p = clone;
	 	
	 	// console.log($p.find("[data-city]"));
	 	// $clone.find(el.nodeName + "[data-city]");
	 	var fecha;
	 	if(!localtime){
	 	 fecha = DateFormate("dd/mm/yy");
	 	}else{
	 	 // fecha = localtime.split(" ")[1];
	 	 fecha = localtime;

	 	}
	 	clone.querySelector("[data-city]").innerHTML = cityWeather.zone;
	 	clone.querySelector("[data-city]").id = cityWeather.zone;

	 	clone.querySelector("[data-time]").innerHTML = fecha;

	 	clone.querySelector("[data-icon]").src = cityWeather.icon;
	 	clone.querySelector("[data-icon]").alt = cityWeather.zone;
	 	clone.querySelector("[data-temp=max]").innerHTML = Math.round(cityWeather.temp_max);
	 	clone.querySelector("[data-temp=min]").innerHTML = Math.round(cityWeather.temp_min);
	 	// clone.querySelector("[data-temp=current]").innerHTML = Math.round(cityWeather.temp);
	 	clone.querySelector("[data-temp=current]").innerHTML = cityWeather.temp.toFixed(1);

	 	// document.body.appendChild(clone);
	 	$( $loader ).hide();
	 	$($body).append(clone);
	 	
		
		
		
		console.log(fecha);
	 	console.log(clone);

	 	// $("[data-city]").click(datacityC);



	 }

    function activateTemplate(id) {
	 	var t = document.querySelector(id);

	 	return document.importNode(t.content, true);

	 };
 	
 	function datacityC(e){
	 		navigator.geolocation.getCurrentPosition(getCoords,errorFound);
	 		// console.log($(this).text());
	 	}

	 function addNewCity(event){
	 	event.preventDefault();
	 	$.getJSON(API_WEATHER_URL + "q=" + $(nombreNuevaCiudad).val(), getWeatherNewCity);
	 }

	 function getWeatherNewCity(data){
	 	$.getJSON(API_WOLRDTIME_URL + $(nombreNuevaCiudad).val(), function(response){
	 	 $(nombreNuevaCiudad).val("");	
	 	 cityWeather = {};
	 	 cityWeather.zone = data.name;
		 cityWeather.icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
		 cityWeather.temp = data.main.temp - celsConv;
		 cityWeather.temp_max = data.main.temp_max - celsConv;
		 cityWeather.temp_min = data.main.temp_min - celsConv;
		 cityWeather.main = data.weather[0].main;

		 var fecha = response.data.time_zone[0].localtime;


	 		
	 	renderTemplate(cityWeather, fecha);
	 	cities.push(cityWeather);
		localStorage.setItem("cities", JSON.stringify(cities));


	 	});
	 	
	 }

	 function loadSaveCities(event){
	 	event.preventDefault();

	 	function renderCities(cities) {
	 		cities.forEach(function(city){
	 			renderTemplate(city);
	 		});
	 	};

	 	var cities = JSON.parse(localStorage.cities);
	 	renderCities(cities);
	 }

   // $.getJSON("http://192.168.21.121/ecom/loginC.cfc?method=ValidarAD&user=rsosa&pass=Andr355051f3(&returnFormat=JSON", function( data ) {
   // 	console.log(data);
   // });

//    $.ajax({
//   type: "POST", 	
//   dataType: "json",
//   // crossDomain: true,
//   url: "http://localhost/ecom/loginC.cfc?method=Validar&user=rsosa&pass=Andr355051f3(&returnFormat=JSON",
//   success: function (data){
//       console.log(data);
//   }
// });

})();