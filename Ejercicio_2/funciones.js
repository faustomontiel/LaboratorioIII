window.addEventListener("load",function(){
	var btnSumar = document.getElementById("btnSumar");
	btnSumar.addEventListener("click",sumar);
	var btnGuardar = document.getElementById("btnGuardar");
	btnGuardar.addEventListener("click",guardar)
});

	function sumar(){			
			var numero1 =  document.getElementById("idNumero1").value; 
			var numero2 =  document.getElementById("idNumero2").value;
			numero1 = parseInt(numero1);
			numero2 = parseInt(numero2);
			var resultado = numero1 + numero2;
			document.getElementById("IdResultado").value = resultado;
			/*
				var num1 = document by id .... num1
				var num2 = document by id .... num2
				var res = document by id .... res

				var resultado = parseInt(num1.value) + parseInt(num2.value)

				result.value = resultado 
			*/
		}
	function guardar(){
		    var numero1 =  document.getElementById("idNumero1").value; 
			var numero2 =  document.getElementById("idNumero2").value;
			var resultado=document.getElementById("IdResultado").value;
			var tbody = document.getElementById("idTbody").value;
			var tabla = document.getElementById("IdTabla").value;

			tbody.innerHtml = "<tr><td>"+numero1.value+"</tr></td>";





	}