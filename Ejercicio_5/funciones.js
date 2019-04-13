////////////////////ejemplo JSON/////////////////////////////

	var obj = {};
	var array=[1,2,3];
	var persona = {nombre:"Fausto",edad:20,apellido:"Montiel"};
	var personas = [{nombre:"Fausto",edad:20,apellido:"Montiel"},{nombre:"Juan",edad:23,apellido:"Perez"}];
	//alert(persona.nombre);
	//alert(persona.edad);

	//obtengo un valor de un elemento del array.
	//alert(personas[0].nombre);

	



//////////////////////////////////////////////////////////////
window.addEventListener("load",function(){
	var btn = $("btn");
	btn.addEventListener("click",enviarGet);
});
var xml = new XMLHttpRequest();

function enviarGet(){
	var usr = $("usr");
	var pass = $("pass");

	if(usr.value!="" && pass.value!=""){
	//var parametros ="?usr="+usr.value+"&pass="+pass.value;
	var parametros ="usr="+usr.value+"&pass="+pass.value;
	//xml.open("GET","http://localhost:3000/loginUsuario"+parametros,true);
	xml.open("POST","http://localhost:3000/loginUsuario",true);
	xml.setRequestHeader("Content-type",
	 "application/x-www-form-urlencoded");//avisandole lo que tiene que saber el server.
	xml.onreadystatechange = callback;
	xml.send(parametros);//body.

	}else{
		alert("Datos incorrectos, debe ingresar un usuario y contraseña");
	}
}

function $(id){
	return document.getElementById(id);
}

function callback()			{
	if (xml.readyState === 4) {
		if (xml.status === 200){
			//console.log("Llego la respuesta del servidor ",xml.readyState,xml.status,xml.responseText);
			var respuesta = xml.responseText;
			if (respuesta=="true") {
				alert("Login OK");
			}
			else if(respuesta=="false"){
				alert("FALLA");
			}else{
				alert(respuesta);
			}
		}else{
			alert("Error del servidor ",xml.status);
			}
}
}