const SerieCorrelative = (codigo) => {
    // Extraer la letra(s) y el número por separado
    const letraParte = codigo.match(/[A-Za-z]+/)[0];
    const numeroParte = parseInt(codigo.match(/\d+/)[0]);

    // Incrementar el número en 1
    const nuevoNumero = numeroParte + 1;

    // Obtener la longitud del número original
    const longitudNumeroOriginal = codigo.match(/\d+/)[0].length;

    // Formatear el nuevo número con ceros a la izquierda y construir el nuevo código
    const nuevoCodigo = letraParte + nuevoNumero.toString().padStart(longitudNumeroOriginal, '0');

    return nuevoCodigo;
}

const SerieNotFound = (series=[],type_document='F') => {
    let numericSeries = series.map(value => parseInt(value.slice(1)));
    if(type_document == 'BC' || type_document == 'FC'){
        numericSeries = series.map(value => parseInt(value.slice(2)));
    }
    const minValue = Math.min(...numericSeries);
    const maxValue = Math.max(...numericSeries);
    const allCorrelativeValues = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue);
    const missingValues = allCorrelativeValues.filter(value => !numericSeries.includes(value));
    missingValues.sort((a, b) => a - b);
    let missingSeries = missingValues.map(value => `${type_document}` + value.toString().padStart(3, '0'));
    if(type_document == 'BC' || type_document == 'FC'){
        console.log("hola mundo")
        missingSeries = missingValues.map(value => `${type_document}` + value.toString().padStart(2, '0'));
    }
    /* return missingSeries; */
    return missingSeries.length > 15 ? missingSeries.slice(0, 10) : missingSeries;
}

module.exports = { SerieCorrelative, SerieNotFound }