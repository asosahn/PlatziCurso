var Contador = (function(numero){
	var _contadorPrivado = 0;

	function _cambiarValor(valor){
		_contadorPrivado += valor;
	}

	return {
		incrementar: function(numero){
			_cambiarValor(numero);
			// return _contadorPrivado;
		},
		decrementar: function(numero){
			_cambiarValor(-numero);
		},
		valor: function(){
			return _contadorPrivado;
		},
	};

})();