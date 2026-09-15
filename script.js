/*=========================
CALCULADORA DE FRACCIONES
==========================*/

function mcd(a,b){
a=Math.abs(a);
b=Math.abs(b);

while(b!==0){
let temp=b;
b=a%b;
a=temp;
}

return a;
}

function simplificar(n,d){

if(d<0){
n=-n;
d=-d;
}

let divisor=mcd(n,d);

return[n/divisor,d/divisor];
}

function calcular(){

const n1=parseInt(document.getElementById("n1").value);
const d1=parseInt(document.getElementById("d1").value);
const n2=parseInt(document.getElementById("n2").value);
const d2=parseInt(document.getElementById("d2").value);

const op=document.getElementById("operacionFrac").value;
const resultado=document.getElementById("resultado");

if([n1,d1,n2,d2].some(isNaN)){
resultado.innerHTML="<p>Ingrese todos los valores.</p>";
return;
}

if(d1===0||d2===0){
resultado.innerHTML="<p>El denominador no puede ser 0.</p>";
return;
}

let numerador;
let denominador;

switch(op){

case "+":
numerador=n1*d2+n2*d1;
denominador=d1*d2;
break;

case "-":
numerador=n1*d2-n2*d1;
denominador=d1*d2;
break;

case "*":
numerador=n1*n2;
denominador=d1*d2;
break;

case "/":

if(n2===0){
resultado.innerHTML="<p>No se puede dividir entre 0.</p>";
return;
}

numerador=n1*d2;
denominador=d1*n2;
break;

}

[numerador,denominador]=simplificar(numerador,denominador);

if(denominador===1){

resultado.innerHTML=`
<h3>Resultado</h3>
<p style="font-size:32px;font-weight:bold;">${numerador}</p>
`;

}else{

resultado.innerHTML=`
<h3>Resultado</h3>

<div class="fraccionResultado">
<span>${numerador}</span>
<div class="linea"></div>
<span>${denominador}</span>
</div>
`;

}

}

document.getElementById("btnCalcular").addEventListener("click",calcular);

/*=========================
OPERACIONES ALEATORIAS
==========================*/

const operacion=document.getElementById("operacion");
const opciones=document.getElementById("opciones");
const mensaje=document.getElementById("mensaje");

let respuestaCorrecta=0;

function aleatorio(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

function generarOperacion(){

let a=aleatorio(2,20);
let b=aleatorio(2,10);
let c=aleatorio(2,10);
let d=aleatorio(2,20);
let e=aleatorio(1,5);
let f=aleatorio(1,5);

respuestaCorrecta=a+b*c-d/(e*f);

while(!Number.isInteger(respuestaCorrecta)){

d=aleatorio(2,20);
e=aleatorio(1,5);
f=aleatorio(1,5);

respuestaCorrecta=a+b*c-d/(e*f);

}

operacion.innerHTML=`${a} + ${b} × ${c} - ${d} ÷ (${e} × ${f})`;

generarOpciones();

}

function generarOpciones(){

opciones.innerHTML="";
mensaje.textContent="";

let respuestas=[respuestaCorrecta];

while(respuestas.length<4){

let falsa=respuestaCorrecta+aleatorio(-12,12);

if(!respuestas.includes(falsa)){
respuestas.push(falsa);
}

}

respuestas.sort(()=>Math.random()-0.5);

respuestas.forEach(valor=>{

const boton=document.createElement("button");

boton.textContent=valor;

boton.onclick=()=>verificar(boton,valor);

opciones.appendChild(boton);

});

}

function verificar(boton,valor){

const botones=document.querySelectorAll(".opciones button");

botones.forEach(b=>b.disabled=true);

if(valor===respuestaCorrecta){

boton.classList.add("correcta");
mensaje.textContent="✅ ¡Correcto!";

}else{

boton.classList.add("incorrecta");

botones.forEach(b=>{

if(Number(b.textContent)===respuestaCorrecta){
b.classList.add("correcta");
}

});

mensaje.textContent=`❌ La respuesta era ${respuestaCorrecta}`;

}

setTimeout(generarOperacion,2000);

}

generarOperacion();