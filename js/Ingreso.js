class Ingreso extends Dato {
    
    static contadorIngresos = 0;   
    id = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this.id = Ingreso.contadorIngresos + 1;
        Ingreso.contadorIngresos++;
    }

    get id(){
        return this.id;
    }
    
}