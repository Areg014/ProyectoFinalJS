class Dato {
    
    valor;
    descripcion;

    constructor(descripcion, valor){
        this.valor = valor;
        this.descripcion = descripcion;
    }

    get descripcion() {
        return this.descripcion;
    }
    set descripcion(descripcion) {
        this.descripcion = descripcion;
    }

    get valor() {
        return this.valor;
    }
    set valor(valor) {
        this.valor = valor;
    }

}