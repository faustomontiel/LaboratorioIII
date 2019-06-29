var vehiculoName;
(function (vehiculoName) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            //super(nombre, apellido, edad);
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        Vehiculo.prototype.toJSON = function () {
            return '{"id":' + this.id + ',"marca":"' + this.marca + '","modelo":"' + this.modelo + '","precio":' + this.precio + '"}';
        };
        return Vehiculo;
    }());
    vehiculoName.Vehiculo = Vehiculo;
})(vehiculoName || (vehiculoName = {}));
