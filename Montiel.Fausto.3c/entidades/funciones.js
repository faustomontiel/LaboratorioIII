var vehiculoName;
(function (vehiculoName) {
    var Funciones = /** @class */ (function () {
        function Funciones() {
        }
        Funciones.CargarFormulario = function (id) {
            for (var i = 0; i < this.lista.length; i++) {
                var vehiculo = this.lista[i];
                if (vehiculo.id === id) {
                    $("#id").val(vehiculo.id);
                    $("#marca").val(vehiculo.marca);
                    $("#modelo").val(vehiculo.modelo);
                    $("#precio").val(vehiculo.precio);
                    break;
                }
            }
        };
        Funciones.Borrar = function () {
            var id = Number($("#id").val());
            var flagBorro = false;
            for (var i = 0; i < this.lista.length; i++) {
                var vehiculo = this.lista[i];
                if (vehiculo.id === id) {
                    this.lista.splice(i, 1);
                    flagBorro = true;
                    break;
                }
            }
            if (!flagBorro) {
                alert("No se encontró coincidencia con el ID.");
            }
            localStorage.setItem("vehiculos", this.listaClientesToJson());
            this.llenarGrilla(this.lista);
            this.LimpiarFormulario();
            //this.default();
        };
        //Busca el ID más alto de la lista.
        Funciones.BuscarIDMasAlto = function () {
            var IDMasAlto = this.lista.reduce(function (IDMasAlto, vehiculo, i, array) {
                if (vehiculo.id > IDMasAlto) {
                    IDMasAlto = vehiculo.id;
                }
                return IDMasAlto;
            }, 0);
            return IDMasAlto;
        };
        //Carga un nuevo cliente a la lista. 
        Funciones.Alta = function () {
            var marca = String($("#marca").val());
            var modelo = String($("#modelo").val());
            var precio = Number($("#precio").val());
            //let sexo: string = String($("#selectTipo").val());
            var vehiculo = new vehiculoName.Vehiculo(this.BuscarIDMasAlto() + 1, marca, modelo, precio);
            this.lista.push(vehiculo);
            localStorage.setItem("vehiculos", this.listaClientesToJson());
            this.llenarGrilla(this.lista);
            this.LimpiarFormulario();
            // this.default();
        };
        //Pasa la lista de clientes a formato JSON (string)
        Funciones.listaClientesToJson = function () {
            if (this.lista.length > 0) {
                var listaJson_1 = "[";
                this.lista.forEach(function (vehiculo) {
                    listaJson_1 += vehiculo.toJSON();
                    listaJson_1 += ",";
                });
                listaJson_1 = listaJson_1.slice(0, -1);
                listaJson_1 += "]";
                return listaJson_1;
            }
            return "";
        };
        //Pasa el JSON almacenado en el LocalStorage y genera a lista de clientes.
        Funciones.LocalStorageTolistaClientes = function () {
            var LSString = String(localStorage.getItem("vehiculos"));
            if (LSString != null && LSString != "") {
                var listaJson = JSON.parse(LSString);
                {
                    if (listaJson != null) {
                        for (var i = 0; i < listaJson.length; i++) {
                            var id = listaJson[i].id;
                            var marca = listaJson[i].marca;
                            var modelo = listaJson[i].modelo;
                            var precio = listaJson[i].precio;
                            var vehiculo = new Vehiculo(id, marca, modelo, precio);
                            this.lista.push(vehiculo);
                        }
                    }
                }
            }
        };
        //Limpia el formulario
        Funciones.LimpiarFormulario = function () {
            $("#id").val("");
            $("#marca").val("");
            $("#modelo").val("");
            $("#precio").val("");
            $("#selectTipo").val("");
        };
        //Se llama cuando cambia el estado de los checkbox y llama a llenar grilla.
        Funciones.Checkbox_OnChange = function () {
            this.llenarGrilla(this.lista);
        };
        //Dibuja la grilla y la llena de los datos correspondientes. 
        Funciones.llenarGrilla = function (arrayVehiculos) {
            var mostrarID = Boolean($("#mostrarID").is(":checked"));
            var mostrarMarca = Boolean($("#mostrarMarca").is(":checked"));
            var mostrarModelo = Boolean($("#mostrarModelo").is(":checked"));
            var mostrarPrecio = Boolean($("#mostrarPrecio").is(":checked"));
            var html = "<thead>" +
                "<tr>";
            if (mostrarID) {
                html += "<th>ID</th>";
            }
            if (mostrarMarca) {
                html += "<th>Marca</th>";
            }
            if (mostrarModelo) {
                html += "<th>Modelo</th>";
            }
            if (mostrarPrecio) {
                html += "<th>Precio</th>";
            }
            html += "<th>Accion</th>";
            html += "</tr>" +
                "</thead>" +
                "<tbody>";
            arrayVehiculos.forEach(function (vehiculo) {
                html += "<tr class='trSeleccionable' onclick='vehiculo.Funciones.CargarFormulario(" + vehiculo.id + ")'>";
                if (mostrarID) {
                    html += "<td>" + vehiculo.id + "</td>";
                }
                if (mostrarMarca) {
                    html += "<td>" + vehiculo.marca + "</td>";
                }
                if (mostrarModelo) {
                    html += "<td>" + vehiculo.modelo + "</td>";
                }
                if (mostrarPrecio) {
                    html += "<td>" + vehiculo.precio + "</td>";
                }
                html += "<button>Borrar</button>";
                html += "</tr>";
            });
            html += "</tbody>";
            $("#tabla").html(html);
        };
        /*
                //Filtra por nombre la grilla.
                public static FiltrarNombre(): void {
                    let filtro: String = String($("#txtFiltroNombre").val());
                    let arrayFiltrado: Array<Cliente> = this.listaClientes.filter(function (Cliente: Cliente, i: Number, array: Array<Cliente>) {
                        if (Cliente.getNombre().match("^" + filtro + "[a-zA-Z\s]*")) {
                            return true;
                        }
                        return false;
                    });
                    this.llenarGrilla(arrayFiltrado);
                }
        */
        Funciones.OnLoad = function () {
            //  this.default();
            this.LocalStorageTolistaClientes();
            this.llenarGrilla(this.lista);
        };
        /*
                public static default(): void {
                    $("#helpNombre").hide();
                    $("#helpApellido").hide();
                    $("#helpEdad").hide();
                }
        */
        /*
                //Calcula el promedio de edades y lo muestra.
                public static GenerarEstadisticas(): void{
                    let sumaNotas:number = this.listaClientes.reduce(function(total,cliente,i,array){
                        return total += cliente.getEdad();
                    },0);
                    let promedio:number = sumaNotas / this.listaClientes.length;
                    $("#txtPromedio").val(String(promedio));
                }
        **/
        //Limpia el localstorage. ATENCION: Si se vuelve a cargar un cliente se volverá a llenar el LS con toda la lista.
        Funciones.LimpiarLocalStorage = function () {
            localStorage.setItem("vehiculos", "");
        };
        Funciones.lista = new Array();
        return Funciones;
    }());
    vehiculoName.Funciones = Funciones;
})(vehiculoName || (vehiculoName = {}));
