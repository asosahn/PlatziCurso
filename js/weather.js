(function(){

 	

   if(navigator.geolocation){

  

   	navigator.geolocation.getCurrentPosition(getCoords,errorFound);
   	
   }else{
   	alert("Tu no tienes un navegador avanzado");
   }

 	function errorFound(err){
   	alert("Ocurrio un error: " + err);
   }

   function getCoords(position){
   	var lat = position.coords.latitude;
   	var lon = position.coords.longitude;
   	console.log("La posición es: " + lat + "," + lon);
   }

})();