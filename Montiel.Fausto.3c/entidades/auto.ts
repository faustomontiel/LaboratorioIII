namespace vehiculoName{
    export class Auto extends Vehiculo{

        cantidadPuertas:number;

        constructor(id:number, marca:string, modelo:string, precio:number,cantidad:number)
        {
            super(id, marca, modelo,precio);
            this.cantidadPuertas = cantidad;
        }

    }
}