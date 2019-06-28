var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var persona;
(function (persona) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, horario, legajo) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.horario = horario;
            _this.legajo = legajo;
            return _this;
        }
        Empleado.prototype.empleadoToJson = function () {
            var obj = {
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                horario: this.horario,
                legajo: this.legajo
            };
            return JSON.stringify(obj);
        };
        return Empleado;
    }(persona.Persona));
    persona.Empleado = Empleado;
})(persona || (persona = {}));
