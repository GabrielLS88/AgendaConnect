function run(letNumeb) {
    let valor = 0;
    for (let i = 0; i < letNumeb.length; i++) {
        valor += letNumeb[i];
    }
    return valor;
}

let letNumeb = [15.67, 28.45, 9.99, 37.82, 62.1, 20.3, 50.55, 11.25, 45.9, 73.6, 35.2, 18.75, 6.4, 42.99, 89.15, 25.5, 13.7, 55.8, 67.4, 31.9, 82.25, 48.3, 20, 150, 12]

console.log(run(letNumeb))