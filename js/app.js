
var ingresos = [];
var egresos = [];

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
    var totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos = totalIngresos + ingreso.valor;
    }
    return totalIngresos;
}

const totalEgresos = () => {
    var totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos = totalEgresos + egreso.valor;
    }
    return totalEgresos;
}

const formatoMoneda = (valor) => {
    let valorFormateado = valor.toLocaleString("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: "2" });
    return (valorFormateado +" MXN").substring(1);
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
                            <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
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
                        <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
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
    let indiceEliminar = ingresos.findIndex( (ingresos) => { return ingresos.id === id});
    ingresos.splice(indiceEliminar, 1);
    Ingreso.contadorIngresos--;
    cargaCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex( (egresos) => { return egresos.id === id});
    Egreso.contadorEgresos--;
    egresos.splice(indiceEliminar, 1);
    cargaCabecero();
    cargarEgresos();
}

const agregarDato = () => {
    let forma = document.getElementById('forma');
    let seleccion = forma.tipo.value;
    let descripcion = forma.descripcion.value;
    let valor = parseFloat(forma.valor.value);
    if(descripcion!=''&&descripcion!=undefined&&descripcion!=null&&valor!=''&&valor!=undefined&&valor!=null){
        if(seleccion==='ingreso'){
            ingresos.push(new Ingreso(descripcion, valor));
            cargarIngresos();
        }
        else{
            egresos.push(new Egreso(descripcion, valor));
            cargarEgresos();
        }
        cargaCabecero();
    }
    else {
        alert('Los valores ingresados no son válidos.');
    }
    forma.descripcion.value='';
    forma.valor.value='';
}

