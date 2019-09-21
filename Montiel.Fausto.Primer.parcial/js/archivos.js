  var tbody=document.querySelector('tbody');
        window.addEventListener("load",listar);
        var xml = new XMLHttpRequest();

		function callback() 
		{
			if(xml.readyState === 4)
			{
				if (xml.status === 200) 
				{
	    		 	var res = xml.responseText;
	     		 	var obj = JSON.parse(res);
	     		 	var miTabla = document.getElementById('tbody');
	     
	    		 	for (var i=0;i<obj.length;i++)
	   			 	{
						var nodoTr = document.createElement("tr");
	     		 		var nodoTd1 = document.createElement("td");
	     		 		var nodoTd2 = document.createElement("td");
	     		 		var nodoTd3 = document.createElement("td");
	     		 		var nodoTd4 = document.createElement("td");
	     		 		var nodoTd5 = document.createElement("td");
	     		 		var nodoId;
	     		 		var nodoNombre;
	     		 		var nodoCuatrimestre;
	     		 		var nodoFecha;
	     		 		var nodoTurno;
	     		 		var nodoModificar;



	     		 		nodoId = document.createTextNode(obj[i].id);
	     		 		nodoNombre = document.createTextNode(obj[i].nombre);
	     		 		nodoCuatrimestre = document.createTextNode(obj[i].cuatrimestre);
	     		 		nodoFecha = document.createTextNode(obj[i].fechaFinal);
	     		 		nodoTurno = document.createTextNode(obj[i].turno);

	     		 		nodoTd1.appendChild(nodoId);
	     		 		nodoTd2.appendChild(nodoNombre);
	     		 		nodoTd3.appendChild(nodoCuatrimestre);
	     		 		nodoTd4.appendChild(nodoFecha);
	     		 		nodoTd5.appendChild(nodoTurno);

	     		 		nodoTr.appendChild(nodoTd1);
	     		 		nodoTr.appendChild(nodoTd2);
	     		 		nodoTr.appendChild(nodoTd3);
	     		 		nodoTr.appendChild(nodoTd4);
	     		 		nodoTr.appendChild(nodoTd5);

	     		 		//nodoTr.addEventListener("dblclick",Modificar);

	     		 		
	     		 		miTabla.appendChild(nodoTr);

					}
	  			}
	  			else
	  			{
	  				alert("Error del servidor ", xml.status);
	  			}
  			}
		}
		function listar()
		{
			xml.open("GET", "http://localhost:3000/materias", true);
			xml.onreadystatechange = callback;
  			xml.send();
		}
		function mostrar(event)
		{
			event.preventDefault();
			Abrir('contMostrar');
			var tagA = event.target;
			var tagTd = tagA.parentNode;
			var tagTr = tagTd.parentNode;
			var id = tagTr.firstElementChild;
			var nombre = id.nextElementSibling;
			var cuatrimestre = nombre.nextElementSibling;
			var fecha = cuatrimestre.nextElementSibling;
			var turno = fecha.nextElementSibling;
			var textNombre = document.getElementById("nombre");
			var textFecha = document.getElementById("fecha");
			var textTurno = document.getElementById("turno");
			textNombre.placeholder = nombre.innerHTML;
			textFecha.placeholder = fecha.innerHTML;
			textTurno.placeholder = turno.innerHTML;

		}

		function Abrir(cont)
			{
				var contMostrar = document.getElementById(cont);
				var btn = document.getElementById("btnMostrar");
				btn.hidden = true;
				contMostrar.hidden = false;
			}
