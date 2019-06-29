namespace vehiculoName{
    export class Camioneta extends Vehiculo{

        cuatroXcuatro:boolean;

        constructor(id:number, marca:string, modelo:string, precio:number,cuatro:boolean)
        {
            super(id, marca, modelo,precio);
            this.cuatroXcuatro = cuatro;
        }

    }
}