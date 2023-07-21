class Egreso extends Dato {
    
    static contadorIngresos = 0;    
    id = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this.id = Egreso.contadorIngresos + 1;
        Egreso.contadorIngresos++;
    }

    get id(){
        return this.id;
    }
    
}