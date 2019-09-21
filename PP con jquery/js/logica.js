var xml = new XMLHttpRequest();
var nodo;

$(document).ready(CargarRegistros);
$(document).ready(function()
{
    $("#btnCerrar").click(Cerrar);
    $("#btnEliminar").click(Eliminar);
    $("#btnModificar").click(Modificar);
});

function CargarRegistros()
{
    var fondo = $("#fondo");
    fondo.hidden = false;

    $.get("http://localhost:3000/materias", Callback);
}

function Callback(data, status)
{
    $("#fondo").attr("hidden", true);

    if (status == "success") 
    {
        CargarMaterias(data);
    }
    else
    {
        alert("Error en el servidor");
    }
}
function CargarMaterias(materias)
{
	var tbody = $("#tbody");
	for (var i = 0; i < materias.length; i++) 
	{
		var fila = document.createElement("tr");
		var obj = materias[i];
		var columnas = Object.keys(obj);
        
		for (var j = 0; j < columnas.length; j++) 
		{

            var cel = document.createElement("td");
            if (j == 0) cel.setAttribute("hidden", true);
            var texto = document.createTextNode(obj[columnas[j]]);
            console.log(texto);
			cel.append(texto);
			fila.append(cel);
        }
        fila.addEventListener("dblclick", MostrarRecuadro);
		tbody.append(fila);
	}
}

function MostrarRecuadro()
{
    var elemento = event.target;
    nodo = elemento;
    $("#div").attr("hidden", false);
    var tr = nodo.parentNode;
    //var tds = tr.children;
   
    var id = tr.firstElementChild;
    var nombre = id.nextElementSibling;
    var cuatrimestre = nombre.nextElementSibling;
    var fecha = cuatrimestre.nextElementSibling;
    var turno = fecha.nextElementSibling;
    
    $("#nombre").val(nombre.innerText);
    $("#nombre").removeClass("conError");
    $("#cuatrimestre").val(cuatrimestre.innerText);
    $("#fecha").val(fecha.innerText.split("/").reverse().join("-"));
    $("#fecha").removeClass("conError");
    if (turno.innerText == "Mañana") // ACA ESTA FALLANDO??
    {
        $("#turnoN").prop("checked", false);
        $("#turnoM").prop("checked", true);
    }
    else
    {
        $("#turnoM").prop("checked", false);
        $("#turnoN").prop("checked", true);
    }
}

function Cerrar()
{
    $("#div").attr("hidden", true);
}

function Modificar()
{
    var tr = nodo.parentNode;
    var tds = tr.children;
    var id = tr.firstElementChild;
    var cuatrimestre = id.nextElementSibling.nextElementSibling;

    var nombre = $("#nombre").val();
    var fecha = $("#fecha").val();

    if($("#turnoM").is(':checked')) // ACA ESTA FALLANDO???
    {
        var turno = "Mañana";
    }
    else
    {
        var turno = "Noche";
    }

    if (Validar())
    {
        var obj = 
        {
            "id": id.innerText,
            "nombre": nombre,
            "cuatrimestre": cuatrimestre.innerText,
            "fechaFinal": fecha.split("-").reverse().join("/"),
            "turno": turno
        };
        
        $("#fondo").attr("hidden", false);

        $.post("http://localhost:3000/editar", obj, CallbackModificar);
    }
}

function CallbackModificar(data, status)
{
    $("#fondo").attr("hidden", true);
    if (status == "success") 
    {
        console.log(data);
        if (data.type == "ok")
        {
            ModificarRegistro();
        }
    }
    else
    {
        alert("Error en el servidor");
    }   
}

function ModificarRegistro()
{
    var tr = nodo.parentNode;
    var tds = tr.children;

    var id = tr.firstElementChild;
    var nombre = id.nextElementSibling;
    var cuatrimestre = nombre.nextElementSibling;
    var fecha = cuatrimestre.nextElementSibling;
    var turno = fecha.nextElementSibling;
    
    nombre.innerText = $("#nombre").val();
    fecha.innerText = $("#fecha").val().split("-").reverse().join("/");
    
    if($("#turnoM").is(':checked'))
    {
        turno.innerText = "Mañana";
    }
    else
    {
        turno.innerText = "Noche";
    }
}

function Eliminar()
{
    var tr = nodo.parentNode;
    var id = tr.firstElementChild;
    var obj = 
    {
        "id": id.innerText,
    };
    
    $("#fondo").attr("hidden", false);

    $.post("http://localhost:3000/eliminar", obj, CallbackEliminar);
}

function CallbackEliminar(data, status)
{
    $("#fondo").attr("hidden", true);
    if (status == "success") 
    {
        console.log(data);
        if(data["type"] == "ok")
        {
            BorrarRegistro();
        }
        else
        {
            alert("El servidor no permite eliminar ese registro");
        }
    }
    else
    {
        alert("Error en el servidor");
    }    
}

function BorrarRegistro()
{
    var tr = nodo.parentNode;
    tr.parentNode.removeChild(tr);
}

function Validar()
{
    var esValido;
    var fecha = new Date($("#fecha").val());
    var date = new Date();
    if ($("#nombre").val().length >= 6)
    {
        esValido = true;
    }
    else
    {
        $("#nombre").addClass("conError");
        esValido == false;
    }
    if (fecha >= date)
    {
        esValido = esValido && true;
    }
    else
    {
        $("#fecha").addClass("conError");
        esValido = esValido && false;
    }
    return esValido;
}