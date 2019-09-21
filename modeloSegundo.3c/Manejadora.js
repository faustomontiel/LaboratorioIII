var Vehiculo;
(function (Vehiculo) {
    $("#document").ready(function () {
        $("#btnAlta").click(function () {
            limpiarFormulario();
            $("#containerMult").modal("show");
            $("#btnAgregar").show();
            $("#btnModificar").hide();
        });
        $("#btnAgregar").click(agregarVehiculo);
        $("#chkId").click(mostrarVehiculos);
        $("#chkMarca").click(mostrarVehiculos);
        $("#chkModelo").click(mostrarVehiculos);
        $("#chkPrecio").click(mostrarVehiculos);
        $("#btnPromedio").click(calcularPromedio);
        $("#selectTipo").change(mostrarVehiculos);
        if (localStorage.getItem("lista")) {
            var listaString = localStorage.getItem("lista");
            lista = JSON.parse(listaString);
        }
        mostrarVehiculos();
    });
    var lista = new Array();
    function agregarVehiculo() {
        //genero el id
        var id = buscarId();
        //tomo los valores del modal
        var marca = String($("#txtMarca").val());
        var modelo = String($("#txtModelo").val());
        var precio = Number($("#txtPrecio").val());
        var tipo = String($("#tipo").val());
        var vehiculo;
        //dependiento del tipo creo el objeto
        if (tipo == "Auto") {
            vehiculo = new Vehiculo.Auto(id, marca, modelo, precio, 2);
        }
        else {
            vehiculo = new Vehiculo.Camioneta(id, marca, modelo, precio, true);
        }
        //guardo y muestro el vehiculo,
        LocalStorage(vehiculo);
        mostrarVehiculos();
    }
    /*
    public static BuscarIDMasAlto():number{
            let IDMasAlto: number = this.listaClientes.reduce(function (IDMasAlto, cliente, i, array) {
                if(cliente.getID() > IDMasAlto){
                    IDMasAlto = cliente.getID();
                }
                return IDMasAlto;
            }, 0);

            return IDMasAlto;
        }
    */
    function buscarId() {
        if (lista.length === 0) {
            return 1;
        }
        var ultimo = lista.reduce(function (prev, act) { return (prev.id > act.id) ? prev : act; });
        return ultimo.id + 1;
    }
    function filtrar() {
        var tipo = $("#selectTipo").val();
        var listaFilt;
        var toParse = localStorage.getItem("lista");
        var carga = JSON.parse(toParse);
        if (tipo == "Auto") {
            listaFilt = carga.filter(function (a) { return a.cantidadPuertas != null; });
        }
        else {
            listaFilt = carga.filter(function (a) { return a.cuatroXcuatro != null; });
        }
        return listaFilt;
    }
    /*
     //Calcula el promedio de edades y lo muestra.
        public static GenerarEstadisticas(): void{
            let sumaNotas:number = this.listaClientes.reduce(function(total,cliente,i,array){
                return total += cliente.getEdad();
            },0);
            let promedio:number = sumaNotas / this.listaClientes.length;
            $("#txtPromedio").val(String(promedio));
        }*/
    function calcularPromedio() {
        var listaFilt = new Array();
        listaFilt = filtrar();
        var numVehiculos = listaFilt.length;
        var promedio = listaFilt.reduce(function (total, vehiculo) {
            return total += vehiculo.precio;
        }, 0);
        $("#Promedio").val(promedio / numVehiculos);
    }
    function mostrarVehiculos() {
        $("#tBody").empty();
        var listaFilt = filtrar();
        var nodoTrTh = $("<tr>");
        var nodoTh1 = $("<th>");
        var nodoTh2 = $("<th>");
        var nodoTh3 = $("<th>");
        var nodoTh4 = $("<th>");
        var nodoTh5 = $("<th>");
        $(nodoTh1).text("ID");
        $(nodoTh2).text("Marca");
        $(nodoTh3).text("Modelo");
        $(nodoTh4).text("Precio");
        $(nodoTh5).text("Accion");
        if ($('#chkId').prop('checked')) {
            $(nodoTrTh).append(nodoTh1);
        }
        if ($('#chkMarca').prop('checked')) {
            $(nodoTrTh).append(nodoTh2);
        }
        if ($('#chkModelo').prop('checked')) {
            $(nodoTrTh).append(nodoTh3);
        }
        if ($('#chkPrecio').prop('checked')) {
            $(nodoTrTh).append(nodoTh4);
        }
        $(nodoTrTh).append(nodoTh5);
        $("#tBody").append(nodoTrTh);
        for (var i = 0; i < listaFilt.length; i++) {
            //$("#filaNueva" + i).remove();
            var vehiculo = listaFilt[i];
            var nodoTr = $("<tr>");
            var nodoTd1 = $("<td>");
            var nodoTd2 = $("<td>");
            var nodoTd3 = $("<td>");
            var nodoTd4 = $("<td>");
            var nodoTd5 = $("<td>");
            $(nodoTd1).text(String(vehiculo.id));
            $(nodoTd2).text(vehiculo.marca);
            $(nodoTd3).text(vehiculo.modelo);
            $(nodoTd4).text(String(vehiculo.precio));
            if ($('#chkId').prop('checked')) {
                $(nodoTr).append(nodoTd1);
            }
            if ($('#chkMarca').prop('checked')) {
                $(nodoTr).append(nodoTd2);
            }
            if ($('#chkModelo').prop('checked')) {
                $(nodoTr).append(nodoTd3);
            }
            if ($('#chkPrecio').prop('checked')) {
                $(nodoTr).append(nodoTd4);
            }
            var btnModificar = $("<button>");
            btnModificar.click(Modificar);
            btnModificar.text("Modificar");
            btnModificar.addClass("btn btn-success");
            var btnEliminar = $("<button>");
            btnEliminar.click(borrar);
            btnEliminar.text("Borrar");
            btnEliminar.addClass("btn btn-danger");
            $(nodoTd5).append(btnModificar);
            $(nodoTd5).append(btnEliminar);
            $(nodoTr).append(nodoTd5);
            $("#tBody").append(nodoTr);
        }
    }
    function Modificar(event) {
        $("#btnModificar").show();
        $("#btnAgregar").hide();
        var tagTd = event.target;
        var tagButton = $(tagTd).parent();
        var tag = $(tagButton).parent();
        var tr = $(tag).children();
        var id = String($(tr[0]).text());
        var marca = $(tr[1]).text();
        var modelo = $(tr[2]).text();
        var precio = String($(tr[3]).text());
        var tipo = String($(tr[4]).text());
        $("#txtId").val(id);
        $("#txtMarca").val(marca);
        $("#txtModelo").val(modelo);
        $("#txtPrecio").val(precio);
        $("#tipo").attr("value", tipo);
        var toParse = localStorage.getItem("lista");
        var carga = JSON.parse(toParse);
        for (var i = 0; i < carga.length; i++) {
            if (id == carga[i].id) {
                var index = i;
                break;
            }
        }
        $("#btnModificar").click(function () {
            var tipo = String($("#tipo").val());
            var vehiculo;
            if (tipo == "Auto") {
                vehiculo = new Auto(id, String($("#txtMarca").val()), String($("#txtModelo").val()), Number($("#txtPrecio").val()), 2);
            }
            else {
                vehiculo = new Camioneta(id, String($("#txtMarca").val()), String($("#txtModelo").val()), Number($("#txtPrecio").val()), true);
            }
            lista = [];
            localStorage.clear();
            for (var i = 0; i < carga.length; i++) {
                if (i == index) {
                    lista.push(vehiculo);
                }
                else {
                    lista.push(carga[i]);
                }
            }
            localStorage.setItem('lista', JSON.stringify(lista));
            mostrarVehiculos();
            limpiarFormulario();
        });
        $("#header2").html("Modificar vehiculo");
        $("#containerMult").modal("show");
    }
    function limpiarFormulario() {
        $("#txtId").val("");
        $("#txtMarca").val("");
        $("#txtModelo").val("");
        $("#txtPrecio").val("");
        $("#btnAgregar").show();
        $("#btnModificar").hide();
        $("#header2").html("Alta Vehiculo");
    }
    function borrar(event) {
        var elemento = event.target;
        var nodo = $(elemento).parent();
        var tr = $(nodo).parent();
        var td = $(tr).children();
        var id = String($(td[0]).text());
        var toParse = localStorage.getItem("lista");
        var carga = JSON.parse(toParse);
        localStorage.clear();
        lista = [];
        for (var i = 0; i < carga.length; i++) {
            if (id != carga[i].id) {
                LocalStorage(carga[i]);
            }
        }
        mostrarVehiculos();
    }
    function LocalStorage(vehiculo) {
        if (localStorage.getItem("lista") === null) {
            lista.push(vehiculo);
            localStorage.setItem('lista', JSON.stringify(lista));
        }
        else {
            var toParse = localStorage.getItem('lista');
            lista = JSON.parse(toParse);
            lista.push(vehiculo);
            localStorage.setItem('lista', JSON.stringify(lista));
        }
    }
})(Vehiculo || (Vehiculo = {}));
