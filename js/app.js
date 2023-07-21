
var ingresos = [new Ingreso('Hola', 500), new Ingreso('Siguiente', 1000)];
var egresos = [new Egreso('Hola', 500), new Egreso('Adios', 500)];

const cargaCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

function cargarApp() {
    cargaCabecero();
    cargarIngresos();
    cargarEgresos();
}

const totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

const totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

const formatoMoneda = (valor) => {
    let valorFormateado = valor.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: "2" });
    return valorFormateado;
}

const formatoPorcentaje = (valor) => {
    let valorFormateado = valor.toLocaleString("es-MX", { style: "percent", minimumFractionDigits: "2" });
    return valorFormateado;
}

const cargarIngresos = () => {
    let ingresosHtml = '';
    for (let ingreso of ingresos) {
        ingresosHtml += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHtml;
}

const cargarEgresos = () => {
    let egresosHtml = '';
    for (let egreso of egresos) {
        egresosHtml += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHtml;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
                <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento-eliminar-btn" onclick="eliminarIngreso(${ingreso.id})">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `
    return ingresoHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento-descripcion">
                ${egreso.descripcion}
                <div class="derecha limpiarEstilos">
                    <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                    <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento-eliminar-btn" onclick="eliminarEgreso(${egreso.id})">
                            <ion-icon name="close-circle-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
    return egresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex( (ingresos) => { ingresos.id === id});
    ingresos.splice(indiceEliminar, 1);
    cargaCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( (egresos) => { egresos.id === id});
    egresos.splice(indiceEliminar, 1);
    cargaCabecero();
    cargarEgresos();
}