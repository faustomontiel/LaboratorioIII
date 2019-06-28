//sobre esta lista voy agregar,modificar y eliminar los empleados (JSON)
var lista = new Array();
var target;
$(function () {
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
function promediar() {
    var turno = $("#selectPromedio").val();
    var promedio = lista.reduce(function (sum, empleado) { return (JSON.parse(empleado)).horario == turno ? sum + 1 : sum; }, 0) / lista.length;
    $("#pPromedio").html("Promedio: " + String(promedio));
}
function agregarEmpleado() {
    var nombre = String($("#inputNombre").val());
    var apellido = String($("#inputApellido").val());
    var edad = Number($("#inputEdad").val());
    var horario = String($("#selectHorario").val());
    var legajo = Number($("#inputLegajo").val());
    lista.push(new persona.Empleado(nombre, apellido, edad, horario, legajo).empleadoToJson());
    limpiarFormulario();
    localStorage.setItem("empleados", JSON.stringify(lista));
}
function limpiarFormulario() {
    $("#inputNombre").val("");
    $("#inputApellido").val("");
    $("#inputEdad").val("");
    $("#selectHorario").val("Mañana");
    $("#inputLegajo").val("");
    $("#btnAgregar").text("Agregar");
    $("#btnAgregar").off("click");
    $("#btnAgregar").click(agregarEmpleado);
    $("#headerForm").html("Alta empleado");
}
function mostrarEmpleados() {
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < lista.length; i++) {
        var empleado = JSON.parse(lista[i]);
        var tr = document.createElement("tr");
        var tdNombre = document.createElement("td");
        var nombre = document.createTextNode(empleado.nombre);
        tdNombre.appendChild(nombre);
        tr.appendChild(tdNombre);
        var tdApellido = document.createElement("td");
        var apellido = document.createTextNode(empleado.apellido);
        tdApellido.appendChild(apellido);
        tr.appendChild(tdApellido);
        var tdEdad = document.createElement("td");
        var edad = document.createTextNode(String(empleado.edad));
        tdEdad.appendChild(edad);
        tr.appendChild(tdEdad);
        var tdLegajo = document.createElement("td");
        var legajo = document.createTextNode(String(empleado.legajo));
        tdLegajo.appendChild(legajo);
        tr.appendChild(tdLegajo);
        var tdTurno = document.createElement("td");
        var turno = document.createTextNode(empleado.horario);
        tdTurno.appendChild(turno);
        tr.appendChild(tdTurno);
        var btnModificar = document.createElement("button");
        btnModificar.addEventListener("click", cambiarForm);
        btnModificar.innerHTML = "Modificar";
        tr.appendChild(btnModificar);
        var btnEliminar = document.createElement("button");
        btnEliminar.addEventListener("click", wrapEliminar);
        btnEliminar.innerHTML = "borrar";
        tr.appendChild(btnEliminar);
        $("#tBody").append(tr);
    }
}
function cambiarForm(e) {
    var trigger = e.target;
    var horario = trigger.previousSibling;
    var legajo = horario.previousSibling;
    var edad = legajo.previousSibling;
    var apellido = edad.previousSibling;
    var nombre = apellido.previousSibling;
    ($("#inputNombre").val(nombre.innerHTML));
    ($("#inputApellido").val(apellido.innerHTML));
    ($("#inputEdad").val(edad.innerHTML));
    ($("#selectHorario").val(horario.innerHTML));
    ($("#inputLegajo").val(legajo.innerHTML));
    target = legajo;
    $("#btnAgregar").text("Modificar");
    $("#btnAgregar").off("click");
    $("#btnAgregar").click(wrapModificar);
    $("#headerForm").html("Modificar empleado");
}
function wrapModificar() {
    var i = getIndex(target.innerHTML);
    modificar(i);
}
function modificar(i) {
    //console.log(i);
    var nombre = String($("#inputNombre").val());
    var apellido = String($("#inputApellido").val());
    var edad = Number($("#inputEdad").val());
    var horario = String($("#selectHorario").val());
    var legajo = Number($("#inputLegajo").val());
    var empleado = JSON.parse(lista[i]);
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
function getIndex(legajo) {
    console.log(legajo);
    for (var i = 0; i < lista.length; i++) {
        console.log(i);
        if (JSON.parse(lista[i]).legajo == legajo) {
            return i;
        }
    }
    return -1;
}
function wrapEliminar(e) {
    var trigger = e.target;
    var legajo = trigger.previousSibling.previousSibling.previousSibling.innerHTML;
    alert(legajo);
    eliminar(legajo);
}
function eliminar(i) {
    lista = lista.filter(function (empleado) { return (JSON.parse(empleado)).legajo != i; });
    localStorage.setItem("empleados", JSON.stringify(lista));
    mostrarEmpleados();
}
function filtrarPorHorario() {
    console.log($("#selectFiltrar").val());
    var horario = $("#selectFiltrar").val();
    lista = lista.filter(function (empleado) { return JSON.parse(empleado).horario == horario; });
    mostrarEmpleados();
}
function FiltrarNombre() {
    var listaFiltradaPorNombreApellido = lista.map(function (empleado) { return { nombre: JSON.parse(empleado).nombre, apellido: JSON.parse(empleado).apellido }; });
    //let listaApellido = lista.map(empleado => JSON.parse(empleado).apellido);
    soloNombres(listaFiltradaPorNombreApellido);
}
function soloNombres(listaFiltradaPorNombreApellido) {
    console.log(lista);
    $("#tBody").empty();
    for (var i = 0; i < listaFiltradaPorNombreApellido.length; i++) {
        var empleado = listaFiltradaPorNombreApellido[i];
        var tr = document.createElement("tr");
        var tdNombre = document.createElement("td");
        var nombre = document.createTextNode(empleado.nombre);
        tdNombre.appendChild(nombre);
        tr.appendChild(tdNombre);
        var tdApellido = document.createElement("td");
        var apellido = document.createTextNode(empleado.apellido);
        tdApellido.appendChild(apellido);
        tr.appendChild(tdApellido);
        $("#tBody").append(tr);
    }
}
