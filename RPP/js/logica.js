$(document).ready(function CargarRegistros()
{
    $("#fondo").toggle();

    $.get("http://localhost:3000/personajes", Callback);
});

function Callback(data, status)
{
    $("#fondo").toggle();

    if (status == "success") 
    {
        CargarPersonas(data);
    }
    else
    {
        alert("Error en el servidor");
    }
}

function CargarPersonas(personas)
{
    var tbody = document.getElementById("tbody");
	for (var i = 0; i < personas.length; i++) 
	{
		var fila = document.createElement("tr");
		var obj = personas[i];
		var columnas = Object.keys(obj);

		for (var j = 0; j < columnas.length; j++) 
		{
            if (columnas[j] === "foto")
            {
                var cel = document.createElement("td");
                var foto =  document.createElement("img");
                foto.setAttribute("src", obj.foto);
                foto.setAttribute("id", obj.id);
                cel.append(foto);
                var boton = document.createElement("input");
                boton.setAttribute("type", "file");
                boton.setAttribute("accept", "image/png, image/jpeg");
                boton.addEventListener("change", CambiarFoto);
                cel.append(boton);
            } 
            else if (columnas[j] === "estado")
            {
                var cel = document.createElement("td");
                var estado =  document.createElement("select");
                var opVivo = document.createElement("option");
                opVivo.append(document.createTextNode("Vivo"));
                if (obj.estado == "Vivo") opVivo.setAttribute("selected", true);
                var opMuerto = document.createElement("option");
                opMuerto.append(document.createTextNode("Muerto"));
                if (obj.estado == "Muerto") opMuerto.setAttribute("selected", true);
                estado.append(opVivo);
                estado.append(opMuerto);
                estado.addEventListener("change", CambiarEstado);
                cel.append(estado);
            } 
            else
            {
                var cel = document.createElement("td");
                if (columnas[j] === "id") cel.setAttribute("hidden", true);
                var texto = document.createTextNode(obj[columnas[j]]);
                cel.appendChild(texto);
            }
            fila.appendChild(cel);
        }
		tbody.appendChild(fila);
	}
    // console.log(personas);
    // var tbody = $("#tbody");
	// for (var i = 0; i < personas.length; i++) 
	// {
    //     var fila = document.createElement("tr");
    //     tbody.append(fila);
    //     var persona = personas[i];
    //     AgregarPersona(persona, fila);
    // }
}

// function AgregarPersona(persona, fila)
// {
//     var tdId = document.createElement("td");
//     tdId.setAttribute("hidden", true);
//     var id =  document.createTextNode(persona.id);
//     tdId.append(id);
//     fila.append(tdId);
    
//     var tdFoto = document.createElement("td");
//     var foto =  document.createElement("img");
//     foto.setAttribute("src", persona.foto);
//     foto.setAttribute("id", persona.id);
//     tdFoto.append(foto);
//     var boton = document.createElement("input");
//     boton.setAttribute("type", "file");
//     boton.setAttribute("accept", "image/png, image/jpeg");
//     boton.addEventListener("change", CambiarFoto);
//     tdFoto.append(boton);
//     fila.append(tdFoto);

//     var tdNombre = document.createElement("td");
//     var nombre =  document.createTextNode(persona.nombre);
//     tdNombre.append(nombre);
//     fila.append(tdNombre);

//     var tdApellido = document.createElement("td");
//     var apellido =  document.createTextNode(persona.apellido);
//     tdApellido.append(apellido);
//     fila.append(tdApellido);

//     var tdEstado = document.createElement("td");
//     var estado =  document.createElement("select");
//     var opVivo = document.createElement("option");
//     opVivo.append(document.createTextNode("vivo"));
//     if (persona.estado == "Vivo") opVivo.setAttribute("selected", true);
//     var opMuerto = document.createElement("option");
//     opMuerto.append(document.createTextNode("muerto"));
//     if (persona.estado == "Muerto") opMuerto.setAttribute("selected", true);
//     estado.append(opVivo);
//     estado.append(opMuerto);
//     estado.addEventListener("change", CambiarEstado);
//     tdEstado.append(estado);
//     fila.append(tdEstado);
// }

function CambiarFoto()
{
    
    var tr = event.currentTarget.parentNode.parentNode;
    var id = tr.firstChild.innerText;         
    if (this.files && this.files[0]) 
    {
        var fReader = new FileReader();
        
        fReader.addEventListener("load", function(e) 
        {
          $("#" + id).attr("src",e.target.result);
          EnviarPost(id, e.target.result);
        }); 
        fReader.readAsDataURL(this.files[0]);
    }
}

function EnviarPost(id, src)
{
    var obj = 
    {
        "id" : id,
        "foto" : src
    };

    console.log(obj);

    $("#fondo").toggle();
    $.post("http://localhost:3000/editarFoto", obj, CallbackEditar);    
}

function CallbackEditar(data, status)
{
    console.log(status);
    console.log(data);
    $("#fondo").toggle();
}

function CambiarEstado()
{
    var tr = event.currentTarget.parentNode.parentNode;
    var id = tr.firstChild.innerText;
    var select = event.currentTarget;
    // for(var i = 0; i<select.lengtth; i++){ 
    //     select[i].setAttribute("selected", false); 
    //     console.log(select[i]); 
    // } 
    //select.options[select.selectedIndex].setAttribute("selected", true);
    console.log(select.value);

    var obj = 
    {
        "id" : id,
        "estado" : select.value
    };

    $("#fondo").toggle();
    $.post("http://localhost:3000/editarEstado", obj, CallbackEstado);
}

function CallbackEstado(data, status)
{
    console.log(status);
    console.log(data);
    $("#fondo").toggle();
}