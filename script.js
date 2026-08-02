// ===============================
// SmartCalc Pro v2.0
// Part 1
// ===============================

// Display
const display = document.getElementById("display");

// Calculator Buttons
const buttons = document.querySelectorAll(".buttons button");

// Theme Button
const themeBtn = document.getElementById("themeBtn");

// History Button
const historyBtn = document.getElementById("historyBtn");

// Tabs
const standardTab = document.getElementById("standardTab");
const scienceTab = document.getElementById("scienceTab");
const currencyTab = document.getElementById("currencyTab");

// Panels
const calculatorButtons = document.querySelector(".buttons");
const scientificPanel = document.getElementById("scientificPanel");
const currencyPanel = document.getElementById("currencyPanel");

// Scientific Buttons
const scienceButtons =
document.querySelectorAll(".science-grid button");

// Currency Elements
const amountInput =
document.getElementById("amount");

const fromCurrency =
document.getElementById("fromCurrency");

const toCurrency =
document.getElementById("toCurrency");

const currencyResult =
document.getElementById("currencyResult");

const convertBtn =
document.getElementById("convertBtn");

// Variables
let expression = "";

let darkMode = true;

// ===============================
// History System
// ===============================

function saveHistory(expression, answer){

let history =
JSON.parse(localStorage.getItem("calcHistory")) || [];

history.unshift({

expression: expression,

answer: answer,

time: new Date().toLocaleString()

});

localStorage.setItem(
"calcHistory",
JSON.stringify(history)
);

}

// ===============================
// History Button
// ===============================

if(historyBtn){

historyBtn.onclick = ()=>{

window.location.href="history.html";

};

}

// ===============================
// Theme Button
// ===============================

themeBtn.onclick = ()=>{

darkMode = !darkMode;

if(darkMode){

document.body.style.background =
"linear-gradient(135deg,#0f172a,#1e293b)";

}else{

document.body.style.background =
"linear-gradient(135deg,#dbeafe,#f8fafc)";

}

};// ===============================
// Calculator Buttons
// Part 2
// ===============================

buttons.forEach(button=>{

button.onclick=()=>{

const value=button.innerText;

// AC

if(value==="AC"){

expression="";

display.value="";

return;

}

// Backspace

if(value==="⌫"){

expression=expression.slice(0,-1);

display.value=expression;

return;

}

// Copy

if(value==="Copy"){

navigator.clipboard.writeText(display.value);

alert("Copied Successfully");

return;

}

// Equal

if(value==="="){

try{

let exp=expression
.replace(/×/g,"*")
.replace(/÷/g,"/")
.replace(/−/g,"-");

let answer=eval(exp);

saveHistory(expression,answer);

display.value=answer;

expression=answer.toString();

}catch{

display.value="Error";

expression="";

}

return;

}

// Normal Buttons

expression+=value;

display.value=expression;

};

});