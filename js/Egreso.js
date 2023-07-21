class Egreso extends Dato {
    
    static contadorEgresos = 0;    
    id = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this.id = Egreso.contadorEgresos + 1;
        Egreso.contadorEgresos++;
    }

    get id(){
        return this.id;
    }
    
}