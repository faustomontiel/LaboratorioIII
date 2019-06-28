var persona;
(function (persona) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = "";
            this.apellido = "";
            this.edad = 0;
            //if (nombre != undefined && apellido != undefined && edad != undefined)
            //{
            this.nombre = nombre;
            this.edad = edad;
            this.apellido = apellido;
            //  }   
        }
        Persona.prototype.personaToJson = function () {
            var json = {
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad
            };
            return JSON.stringify(json);
        };
        return Persona;
    }());
    persona.Persona = Persona;
})(persona || (persona = {}));
