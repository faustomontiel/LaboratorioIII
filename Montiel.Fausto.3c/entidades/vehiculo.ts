namespace vehiculoName{
    export class Vehiculo{
        id:number;
        marca:string;
        modelo:string;
        precio:number;

        constructor(id:number, marca:string, modelo:string, precio:number)
        {
            //super(nombre, apellido, edad);
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        public toJSON():string{
            return '{"id":'+this.id+',"marca":"'+this.marca+'","modelo":"'+this.modelo+'","precio":'+this.precio+'"}';
        }
    }
}