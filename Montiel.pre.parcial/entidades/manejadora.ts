//sobre esta lista voy agregar,modificar y eliminar los empleados (JSON)
var lista:Array<string> = new Array<string>();
var target:number;

$(function()
{
    $("#btnAgregar").click(agregarEmpleado);
    $("#btnCancelar").click(limpiarFormulario);
    $("#aMostrar").click(mostrarEmpleados);
    $("#btnPromedio").click(promediar);
   // $("#btnCerrarPromedio").click(borrarPromedio);
    $("#btnFiltrar").click(filtrarPorHorario);
    $("#soloNomApellido").click(FiltrarNombre);
    {
        lista = JSON.parse(localStorage.getItem("empleados"));  
    }
}); 

function promediar()
{
    var turno = $("#selectPromedio").val();
    let promedio = lista.reduce((sum, empleado) => {return (JSON.parse(empleado)).horario == turno ? sum + 1 : sum}, 0) / lista.length;
    $("#pPromedio").html("Promedio: " + String(promedio));
}

function  agregarEmpleado():void
{
    let nombre = String($("#inputNombre").val());
    let apellido = String($("#inputApellido").val());
    let edad = Number($("#inputEdad").val());
    let horario = String($("#selectHorario").val());
    let legajo = Number($("#inputLegajo").val());
    
    lista.push(new persona.Empleado(nombre, apellido, edad, horario, legajo).empleadoToJson());
    
    limpiarFormulario();
    localStorage.setItem("empleados", JSON.stringify(lista));
}

function limpiarFormulario():void
{
    $("#inputNombre").val("");
    $("#inputApellido").val("");
    $("#inputEdad").val("");
    $("#selectHorario").val("Mañana");
    $("#inputLegajo").val("");

    $("#btnAgregar").text("Agregar");
    $("#btnAgregar").off( "click" );
    $("#btnAgregar").click(agregarEmpleado);

    $("#headerForm").html("Alta empleado");
}

function  mostrarEmpleados():void
{
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < lista.length; i++) 
    {
        let empleado = JSON.parse(lista[i]);

        let tr = document.createElement("tr");

        let tdNombre = document.createElement("td");
        let nombre =  document.createTextNode(empleado.nombre);
        tdNombre.appendChild(nombre);
        tr.appendChild(tdNombre);

        let tdApellido = document.createElement("td");
        let apellido =  document.createTextNode(empleado.apellido);
        tdApellido.appendChild(apellido);
        tr.appendChild(tdApellido);

        let tdEdad = document.createElement("td");
        let edad =  document.createTextNode(String(empleado.edad));
        tdEdad.appendChild(edad);
        tr.appendChild(tdEdad);

        let tdLegajo = document.createElement("td");
        let legajo =  document.createTextNode(String(empleado.legajo));
        tdLegajo.appendChild(legajo);
        tr.appendChild(tdLegajo);

        let tdTurno = document.createElement("td");
        let turno =  document.createTextNode(empleado.horario);
        tdTurno.appendChild(turno);
        tr.appendChild(tdTurno);

       let btnModificar = document.createElement("button");
       btnModificar.addEventListener("click", cambiarForm);
       btnModificar.innerHTML = "Modificar";
       tr.appendChild(btnModificar);

       let btnEliminar = document.createElement("button");
       btnEliminar.addEventListener("click", wrapEliminar);
       btnEliminar.innerHTML = "borrar";

       tr.appendChild(btnEliminar);

        $("#tBody").append(tr);
    }
}

function cambiarForm(e:Event) 
{
    let trigger = e.target as HTMLElement;
    let horario = trigger.previousSibling;
    let legajo = horario.previousSibling;
    let edad = legajo.previousSibling;
    let apellido = edad.previousSibling;
    let nombre = apellido.previousSibling;

    ($("#inputNombre").val(nombre.innerHTML));
    ($("#inputApellido").val(apellido.innerHTML));
    ($("#inputEdad").val(edad.innerHTML));
    ($("#selectHorario").val(horario.innerHTML));
    ($("#inputLegajo").val(legajo.innerHTML));

    target = legajo;

    $("#btnAgregar").text("Modificar");
    $("#btnAgregar").off( "click" );
    $("#btnAgregar").click(wrapModificar);

    $("#headerForm").html("Modificar empleado");
}

function wrapModificar()
{
    var i = getIndex(target.innerHTML);
    modificar(i);
}

function  modificar(i:number):void
{
    //console.log(i);
    let nombre = String($("#inputNombre").val());
    let apellido = String($("#inputApellido").val());
    let edad = Number($("#inputEdad").val());
    let horario = String($("#selectHorario").val());
    let legajo = Number($("#inputLegajo").val());

    let empleado = JSON.parse(lista[i]);

    empleado.nombre = nombre;
    empleado.apellido = apellido;
    empleado.edad = edad;
    empleado.horario = horario;
    empleado.legajo = legajo;

    lista[i] = JSON.stringify(empleado);

    localStorage.setItem("empleados", JSON.stringify(lista));

    mostrarEmpleados();
    limpiarFormulario();
}

function getIndex(legajo)
{
    console.log(legajo);
    for (let i = 0; i < lista.length; i++) {
        console.log(i);
        if (JSON.parse(lista[i]).legajo == legajo) {
            return i;
        }
    }
    return -1;
}

function wrapEliminar(e:Event)
{
    let trigger = e.target as HTMLElement;
    let legajo = trigger.previousSibling.previousSibling.previousSibling.innerHTML;
    alert(legajo);
    eliminar(legajo);
}

function eliminar(i:number):void
{
    lista = lista.filter(empleado => (JSON.parse(empleado)).legajo != i);
    localStorage.setItem("empleados", JSON.stringify(lista));
    mostrarEmpleados();
}

function  filtrarPorHorario():void
{
    console.log($("#selectFiltrar").val());
    let horario = $("#selectFiltrar").val();
    lista = lista.filter(empleado => JSON.parse(empleado).horario == horario);
    mostrarEmpleados();
}

function FiltrarNombre(): void {
    
    let listaFiltradaPorNombreApellido = lista.map(empleado => {return {nombre:JSON.parse(empleado).nombre,apellido:JSON.parse(empleado).apellido}});
    //let listaApellido = lista.map(empleado => JSON.parse(empleado).apellido);
    soloNombres(listaFiltradaPorNombreApellido);
}

function soloNombres(listaFiltradaPorNombreApellido): void {
    
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < listaFiltradaPorNombreApellido.length; i++) 
    {
        let empleado = listaFiltradaPorNombreApellido[i];

        let tr = document.createElement("tr");

        let tdNombre = document.createElement("td");
        let nombre =  document.createTextNode(empleado.nombre);
        tdNombre.appendChild(nombre);
        tr.appendChild(tdNombre);

        let tdApellido = document.createElement("td");
        let apellido =  document.createTextNode(empleado.apellido);
        tdApellido.appendChild(apellido);
        tr.appendChild(tdApellido);
        $("#tBody").append(tr);
    }
}