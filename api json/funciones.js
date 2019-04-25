        var tbody=document.querySelector('tbody');
        window.addEventListener("load",listar);
        window.addEventListener("load",cargar);
        var xml = new XMLHttpRequest();

        function cargar(){
            document.getElementById("btnAgregar").addEventListener('click', Abrir);
            document.getElementById("btnCerrar").addEventListener('click', Cerrar);
            document.getElementById("btnGuardar").addEventListener('click', Agregar);
            
            
        }

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
						miTabla.innerHTML=miTabla.innerHTML+"<tr>"+"<td>"+obj[i].nombre+"</td>"+"<td>"+obj[i].apellido+"</td>"+"<td>"+obj[i].telefono+"</td>"+"<td>"+obj[i].fecha+"</td>"+"<td>"+"<a href='#'>"+"borrar"+"</a>"+"</td>"+"</tr>";
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
			xml.open("GET", "http://localhost:3000/personas", true);
			xml.onreadystatechange = callback;
  			xml.send();
		}
			function Agregar()
			{
				var apellido = document.getElementById("apellido").value;
				var nombre = document.getElementById("nombre").value;
				if(nombre == "")
				{
					document.getElementById("nombre").className = "error";
					alert("Debe ingresar un nombre y un apellido");
					return;
				}
				if (apellido == "")
				{
					document.getElementById("apellido").className = "error";
					alert("Debe ingresar un nombre y un apellido");
					return;
				}
				if(confirm("¿Esta seguro que desea agregar una persona"))
				{
					document.getElementById("apellido").className = "sinError";
					document.getElementById("nombre").className = "sinError";
					var tCuerpo = document.getElementById("tbody");
					tCuerpo.innerHTML = tCuerpo.innerHTML +
					"<td>" +nombre+ "</td>"+
					"<td>" +apellido+ "</td>"+
					"<td><a href=''>borrar</a></td>"
				}
			}
			function Abrir()
			{
				var contAgregar = document.getElementById("contAgregar");
				var btn = document.getElementById("btnAgregar");
				btn.hidden = true;
				contAgregar.hidden = false;
			}
			function Cerrar()
			{
				var contAgregar = document.getElementById("contAgregar");
				var btn = document.getElementById("btnCerrar");
				var btnAg = document.getElementById("btnAgregar");
				btn.hidden = false;
				contAgregar.hidden = true;
				btnAg.hidden = false;
			}
		