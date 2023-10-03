const SerieCorrelative = (codigo) => {
    // Extraer la letra(s) y el número por separado
    const letraParte = codigo.match(/[A-Za-z]+/)[0];
    const numeroParte = parseInt(codigo.match(/\d+/)[0]);

    // Incrementar el número en 1
    const nuevoNumero = numeroParte + 1;

    // Formatear el nuevo código con ceros a la izquierda si es necesario
    const nuevoCodigo = letraParte + nuevoNumero.toString().padStart(numeroParte.toString().length, '0');

    return nuevoCodigo;
}