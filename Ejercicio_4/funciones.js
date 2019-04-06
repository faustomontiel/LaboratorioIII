window.addEventListener("load",function(){

	var btnGuardar = document.getElementById("btnGuardar");
	btnGuardar.addEventListener("click",agregar);

	btnAgregar.addEventListener("click",abrir);
	btnCerrar.addEventListener("click",cerrar);
});

function agregar(){
	var apellido = document.getElementById('Apellido').value;
	var nombre = document.getElementById('Nombre').value;

	if (apellido == "" || nombre =="") {
		document.getElementById('Apellido').className="error";
		document.getElementById('Nombre').className="error";
		alert("Debe ingresar un nombre y un apellido");
		return;
	}
	var respuesta = confirm("Esta seguro que quiere agregar esta persona?");
	if (respuesta == true) {
		document.getElementById('Apellido').className="sinError";
		document.getElementById('Nombre').className="sinError";

	idTbody.innerHTML = idTbody.innerHTML + 
	"<td>" +nombre+"</td>"+
	"<td>" +apellido+"</td>"+
	"<td><a href=''>borrar</a></td>";
	}
	
}

function abrir()
{
	var contAgregar = document.getElementById("contAgregar");
	var btnAgregar = document.getElementById("btnAgregar");
	btnAgregar.hidden=true;
	contAgregar.hidden=false;
}

function cerrar(){
	var contAgregar = document.getElementById('contAgregar');
	var btnCerrar = document.getElementById('btnCerrar');
	//contAgregar.className = "contenedor"
	document.getElementById('Nombre').value = "";
	document.getElementById('Apellido').value= "";
	contAgregar.hidden=true;
	btnCerrar.hidden=false;

}