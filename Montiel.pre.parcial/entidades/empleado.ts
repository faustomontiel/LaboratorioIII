namespace persona
{
    export class Empleado extends Persona
    {
        horario:string;
        legajo:number;

        constructor(nombre:string, apellido:string, edad:number, horario:string, legajo:number)
        {
            super(nombre, apellido, edad);
            this.horario = horario;
            this.legajo = legajo;
        }

        empleadoToJson():string
        {
            let obj = {
                nombre : this.nombre,
                apellido : this.apellido,
                edad : this.edad,
                horario : this.horario,
                legajo : this.legajo
            }
            return JSON.stringify(obj);
        }
    }
}