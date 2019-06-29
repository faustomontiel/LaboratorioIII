namespace vehiculoName {
    export class Funciones {
        private static lista: Array<Vehiculo> = new Array();

        public static CargarFormulario(id:number){
            for (var i = 0; i < this.lista.length; i++) {
                let vehiculo:Vehiculo = this.lista[i];
                if (vehiculo.id === id) {
                    $("#id").val(vehiculo.id);
                    $("#marca").val(vehiculo.marca);
                    $("#modelo").val(vehiculo.modelo);
                    $("#precio").val(vehiculo.precio);

                    
                    break;
                }
            }
        }

        public static Borrar() {
            let id:number = Number($("#id").val());
            let flagBorro:boolean = false;
            for (var i = 0; i < this.lista.length; i++) {
                let vehiculo = this.lista[i];
                if (vehiculo.id === id) {
                    this.lista.splice(i, 1);
                    flagBorro = true;
                    break;
                }
            }

            if(!flagBorro){
                alert("No se encontró coincidencia con el ID.");
            }

            localStorage.setItem("vehiculos", this.listaClientesToJson());
            this.llenarGrilla(this.lista);
            this.LimpiarFormulario();
            //this.default();
        }

        //Busca el ID más alto de la lista.
        public static BuscarIDMasAlto():number{
            let IDMasAlto: number = this.lista.reduce(function (IDMasAlto, vehiculo, i, array) {
                if(vehiculo.id > IDMasAlto){
                    IDMasAlto = vehiculo.id;
                }
                return IDMasAlto;
            }, 0);

            return IDMasAlto;
        }

        //Carga un nuevo cliente a la lista. 
        public static Alta(): void {
            let marca: string = String($("#marca").val());
            let modelo: string = String($("#modelo").val());
            let precio: number = Number($("#precio").val());
            //let sexo: string = String($("#selectTipo").val());

            let vehiculo = new Vehiculo(this.BuscarIDMasAlto()+1,marca, modelo,precio);
            this.lista.push(vehiculo);
            localStorage.setItem("vehiculos", this.listaClientesToJson());
            this.llenarGrilla(this.lista);
            this.LimpiarFormulario();
           // this.default();
        }

        //Pasa la lista de clientes a formato JSON (string)
        private static listaClientesToJson(): string {
            if(this.lista.length > 0){
                let listaJson: string = "[";
                this.lista.forEach(function (vehiculo) {
                    listaJson += vehiculo.toJSON();
                    listaJson += ",";
                });
                listaJson = listaJson.slice(0, -1);
                listaJson += "]";
                return listaJson;
            }
            return "";
        }

        //Pasa el JSON almacenado en el LocalStorage y genera a lista de clientes.
        private static LocalStorageTolistaClientes(): void {
            let LSString:string = String(localStorage.getItem("vehiculos"));
            if(LSString != null && LSString != ""){
                let listaJson = JSON.parse(LSString);
                {
                    if(listaJson != null){
                        for (var i = 0; i < listaJson.length; i++) {
                            let id = listaJson[i].id;
                            let marca = listaJson[i].marca;
                            let modelo = listaJson[i].modelo;
                            let precio = listaJson[i].precio;
            
                            var vehiculo = new Vehiculo(id, marca, modelo, precio);
                            this.lista.push(vehiculo);
                        }
                    }                    
                } 
            }                       
        }

        //Limpia el formulario
        public static LimpiarFormulario(): void {
            $("#id").val("");
            $("#marca").val("");
            $("#modelo").val("");
            $("#precio").val("");
            $("#selectTipo").val("");
        }

        //Se llama cuando cambia el estado de los checkbox y llama a llenar grilla.
        public static Checkbox_OnChange():void{
            this.llenarGrilla(this.lista);
        }

        //Dibuja la grilla y la llena de los datos correspondientes. 
        public static llenarGrilla(arrayVehiculos: Array<Vehiculo>): void {
            let mostrarID: boolean = Boolean($("#mostrarID").is(":checked"));
            let mostrarMarca: boolean = Boolean($("#mostrarMarca").is(":checked"));
            let mostrarModelo: boolean = Boolean($("#mostrarModelo").is(":checked"));
            let mostrarPrecio: boolean = Boolean($("#mostrarPrecio").is(":checked"));
            
            let html = "<thead>" +
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
                html += "<tr class='trSeleccionable' onclick='vehiculo.Funciones.CargarFormulario("+vehiculo.id+")'>";
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
                html += "<button>Borrar</button>"
                
                html += "</tr>";
            });

            html += "</tbody>";

            $("#tabla").html(html);
        }
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
        public static OnLoad(): void {
          //  this.default();
            this.LocalStorageTolistaClientes();
            this.llenarGrilla(this.lista);
        }
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
        public static LimpiarLocalStorage(){
            localStorage.setItem("vehiculos", "");
        }
    }
}