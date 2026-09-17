/*====================================
        PORTAFOLIO MATEMÁTICO
======================================*/

/*====================================
   CALCULADORA DE FRACCIONES
======================================*/

function mcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

function simplificar(n, d) {
    if (d < 0) {
        n = -n;
        d = -d;
    }

    const divisor = mcd(n, d);
    return [n / divisor, d / divisor];
}

function calcularFracciones() {

    const n1 = parseInt(document.getElementById("n1").value);
    const d1 = parseInt(document.getElementById("d1").value);
    const n2 = parseInt(document.getElementById("n2").value);
    const d2 = parseInt(document.getElementById("d2").value);

    const op = document.getElementById("operacionFrac").value;
    const resultado = document.getElementById("resultado");

    if ([n1, d1, n2, d2].some(isNaN)) {
        resultado.innerHTML = "<p>Ingrese todos los valores.</p>";
        return;
    }

    if (d1 === 0 || d2 === 0) {
        resultado.innerHTML = "<p>El denominador no puede ser 0.</p>";
        return;
    }

    let numerador;
    let denominador;

    switch (op) {

        case "+":
            numerador = n1 * d2 + n2 * d1;
            denominador = d1 * d2;
            break;

        case "-":
            numerador = n1 * d2 - n2 * d1;
            denominador = d1 * d2;
            break;

        case "*":
            numerador = n1 * n2;
            denominador = d1 * d2;
            break;

        case "/":

            if (n2 === 0) {
                resultado.innerHTML = "<p>No se puede dividir entre 0.</p>";
                return;
            }

            numerador = n1 * d2;
            denominador = d1 * n2;
            break;
    }

    [numerador, denominador] = simplificar(numerador, denominador);

    if (denominador === 1) {

        resultado.innerHTML = `
            <h3>Resultado</h3>
            <p style="font-size:32px;font-weight:bold;">${numerador}</p>
        `;

    } else {

        resultado.innerHTML = `
            <h3>Resultado</h3>

            <div class="fraccionResultado">
                <span>${numerador}</span>
                <div class="linea"></div>
                <span>${denominador}</span>
            </div>
        `;
    }
}


/*====================================
      OPERACIONES ALEATORIAS
======================================*/

const operacion = document.getElementById("operacion");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");

let respuestaCorrecta = 0;

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarOperacion() {

    let a = aleatorio(2, 20);
    let b = aleatorio(2, 10);
    let c = aleatorio(2, 10);
    let d = aleatorio(2, 20);
    let e = aleatorio(1, 5);
    let f = aleatorio(1, 5);

    respuestaCorrecta = a + b * c - d / (e * f);

    while (!Number.isInteger(respuestaCorrecta)) {

        d = aleatorio(2, 20);
        e = aleatorio(1, 5);
        f = aleatorio(1, 5);

        respuestaCorrecta = a + b * c - d / (e * f);
    }

    operacion.innerHTML = `${a} + ${b} × ${c} - ${d} ÷ (${e} × ${f})`;

    generarOpciones();
}

function generarOpciones() {

    opciones.innerHTML = "";
    mensaje.textContent = "";

    let respuestas = [respuestaCorrecta];

    while (respuestas.length < 4) {

        let falsa = respuestaCorrecta + aleatorio(-12, 12);

        if (!respuestas.includes(falsa)) {
            respuestas.push(falsa);
        }
    }

    respuestas.sort(() => Math.random() - 0.5);

    respuestas.forEach(valor => {

        const boton = document.createElement("button");

        boton.textContent = valor;

        boton.onclick = () => verificarRespuesta(boton, valor);

        opciones.appendChild(boton);
    });
}

function verificarRespuesta(boton, valor) {

    const botones = document.querySelectorAll(".opciones button");

    botones.forEach(b => b.disabled = true);

    if (valor === respuestaCorrecta) {

        boton.classList.add("correcta");
        mensaje.textContent = "✅ ¡Correcto!";

    } else {

        boton.classList.add("incorrecta");

        botones.forEach(b => {

            if (Number(b.textContent) === respuestaCorrecta) {
                b.classList.add("correcta");
            }

        });

        mensaje.textContent = `❌ La respuesta era ${respuestaCorrecta}`;
    }

    setTimeout(generarOperacion, 2000);
}


/*====================================
      CALCULADORA DE FIGURAS
======================================*/

const campoValorUno = document.getElementById('valorUno');
const campoValorDos = document.getElementById('valorDos');
const campoValorTres = document.getElementById('valorTres');

const grupoValorTres = document.getElementById('grupoValorTres');

const selectorFigura = document.getElementById('selectorFigura');
const botonCalcular = document.getElementById('botonCalcular');

const lienzo = document.getElementById('lienzoFigura');
const contexto = lienzo.getContext('2d');

const salidaArea = document.getElementById('valorArea');
const salidaPerimetro = document.getElementById('valorPerimetro');

const etiquetaUno = document.querySelector('label[for="valorUno"]');
const etiquetaDos = document.querySelector('label[for="valorDos"]');
const etiquetaTres = document.querySelector('label[for="valorTres"]');


const configuracionFiguras = {

    triangulo: {
        u: 'Base',
        d: 'Altura',
        t: 'Lado igual',
        usaTercero: true
    },

    rectangulo: {
        u: 'Base',
        d: 'Altura',
        t: 'Lado igual',
        usaTercero: false
    },

    cuadrado: {
        u: 'Lado',
        d: 'Altura',
        t: 'Lado igual',
        usaTercero: false
    },

    pentagono: {
        u: 'Lado',
        d: 'Apotema',
        t: 'Lado igual',
        usaTercero: false
    },

    hexagono: {
        u: 'Lado',
        d: 'Apotema',
        t: 'Lado igual',
        usaTercero: false
    },

    octagono: {
        u: 'Lado',
        d: 'Apotema',
        t: 'Lado igual',
        usaTercero: false
    }
};

function actualizarEtiquetas() {

    const cfg = configuracionFiguras[selectorFigura.value];

    etiquetaUno.textContent = cfg.u;
    etiquetaDos.textContent = cfg.d;
    etiquetaTres.textContent = cfg.t;

    grupoValorTres.style.display = cfg.usaTercero ? 'flex' : 'none';
}

function calcularMedidas(figura, a, b, c) {

    switch (figura) {

        case 'triangulo':
            return {
                area: (a * b) / 2,
                perimetro: a + (2 * c)
            };

        case 'rectangulo':
            return {
                area: a * b,
                perimetro: 2 * (a + b)
            };

        case 'cuadrado':
            return {
                area: a * a,
                perimetro: 4 * a
            };

        case 'pentagono': {
            const perimetro = a * 5;
            return {
                area: (perimetro * b) / 2,
                perimetro
            };
        }

        case 'hexagono': {
            const perimetro = a * 6;
            return {
                area: (perimetro * b) / 2,
                perimetro
            };
        }

        case 'octagono': {
            const perimetro = a * 8;
            return {
                area: (perimetro * b) / 2,
                perimetro
            };
        }

        default:
            return {
                area: 0,
                perimetro: 0
            };
    }
}


/*====================================
      DIBUJO EN EL CANVAS
======================================*/

function limpiarLienzo() {
    contexto.clearRect(0, 0, lienzo.width, lienzo.height);
}

function estiloTrazo() {
    contexto.strokeStyle = '#4a3fbf';
    contexto.lineWidth = 4;
    contexto.fillStyle = 'rgba(255,140,66,0.15)';
}

function dibujarPoligonoRegular(lados) {

    const cx = lienzo.width / 2;
    const cy = lienzo.height / 2;
    const radio = 110;

    contexto.beginPath();

    for (let i = 0; i <= lados; i++) {

        const angulo = -Math.PI / 2 + i * 2 * Math.PI / lados;
        const x = cx + radio * Math.cos(angulo);
        const y = cy + radio * Math.sin(angulo);

        if (i === 0) contexto.moveTo(x, y);
        else contexto.lineTo(x, y);
    }

    contexto.closePath();
    contexto.fill();
    contexto.stroke();
}

function dibujarTriangulo() {

    const cx = lienzo.width / 2;

    contexto.beginPath();
    contexto.moveTo(cx, 60);
    contexto.lineTo(60, 250);
    contexto.lineTo(260, 250);
    contexto.closePath();

    contexto.fill();
    contexto.stroke();
}

function dibujarRectangulo() {

    contexto.beginPath();
    contexto.rect(40, 90, 240, 140);
    contexto.fill();
    contexto.stroke();
}

function dibujarCuadrado() {

    contexto.beginPath();
    contexto.rect(70, 70, 180, 180);
    contexto.fill();
    contexto.stroke();
}

function dibujarFigura(figura) {

    limpiarLienzo();
    estiloTrazo();

    switch (figura) {

        case 'triangulo':
            dibujarTriangulo();
            break;

        case 'rectangulo':
            dibujarRectangulo();
            break;

        case 'cuadrado':
            dibujarCuadrado();
            break;

        case 'pentagono':
            dibujarPoligonoRegular(5);
            break;

        case 'hexagono':
            dibujarPoligonoRegular(6);
            break;

        case 'octagono':
            dibujarPoligonoRegular(8);
            break;
    }
}

function calcularFigura() {

    const figura = selectorFigura.value;

    const a = parseFloat(campoValorUno.value) || 0;
    const b = parseFloat(campoValorDos.value) || 0;
    const c = parseFloat(campoValorTres.value) || 0;

    const resultado = calcularMedidas(figura, a, b, c);

    salidaArea.textContent = resultado.area.toFixed(2);
    salidaPerimetro.textContent = resultado.perimetro.toFixed(2);

    dibujarFigura(figura);
}


/*====================================
      INICIALIZACIÓN GENERAL
======================================*/

document.addEventListener("DOMContentLoaded", () => {

    const btnFracciones = document.getElementById("btnCalcular");

    if (btnFracciones) {
        btnFracciones.addEventListener("click", calcularFracciones);
    }

    if (selectorFigura) {
        selectorFigura.addEventListener("change", actualizarEtiquetas);
        actualizarEtiquetas();
    }

    if (botonCalcular) {
        botonCalcular.addEventListener("click", calcularFigura);
    }

    if (lienzo) {
        dibujarFigura(selectorFigura.value);
    }

    if (operacion && opciones && mensaje) {
        generarOperacion();
    }

});