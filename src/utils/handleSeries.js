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

module.exports = { SerieCorrelative }