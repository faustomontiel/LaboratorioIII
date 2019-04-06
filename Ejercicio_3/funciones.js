window.addEventListener("load",function(){
	var btnGuardar = document.getElementById("btnGuardar");
	btnGuardar.addEventListener("click",agregar);
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