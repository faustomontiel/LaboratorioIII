namespace persona
{
    export class Persona
    {
        nombre:string = "";
        apellido:string = "";
        edad:number = 0;

        constructor(nombre:string, apellido:string, edad:number)
        {
            //if (nombre != undefined && apellido != undefined && edad != undefined)
            //{
                this.nombre = nombre;
                this.edad = edad;
                this.apellido = apellido;
          //  }   
        }

        personaToJson():string
        {
            let json = {
                nombre : this.nombre,
                apellido : this.apellido,
                edad: this.edad
            };
            return JSON.stringify(json);
        }
    }
}