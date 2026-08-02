const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

const historyBtn = document.getElementById("historyBtn");
const themeBtn = document.getElementById("themeBtn");

const standardTab = document.getElementById("standardTab");
const scienceTab = document.getElementById("scienceTab");
const currencyTab = document.getElementById("currencyTab");

const scientificPanel = document.getElementById("scientificPanel");
const currencyPanel = document.getElementById("currencyPanel");
const calculatorButtons = document.querySelector(".buttons");

const scienceButtons = document.querySelectorAll(".science-grid button");

const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const currencyResult = document.getElementById("currencyResult");


let expression = "";


/* History */

function saveHistory(exp, ans){

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

history.unshift({
expression: exp,
answer: ans,
time:new Date().toLocaleString()
});

localStorage.setItem(
"calcHistory",
JSON.stringify(history)
);

}


historyBtn.onclick=()=>{

window.location.href="history.html";

};


/* Theme */

themeBtn.onclick=()=>{

document.body.classList.toggle("light");

};



/* Tabs */

standardTab.onclick=()=>{

calculatorButtons.style.display="grid";
scientificPanel.classList.add("hidden");
currencyPanel.classList.add("hidden");

};


scienceTab.onclick=()=>{

calculatorButtons.style.display="none";
scientificPanel.classList.remove("hidden");
currencyPanel.classList.add("hidden");

};


currencyTab.onclick=()=>{

calculatorButtons.style.display="none";
scientificPanel.classList.add("hidden");
currencyPanel.classList.remove("hidden");

};



/* Normal Calculator */


buttons.forEach(btn=>{


btn.onclick=()=>{


let value=btn.innerText;


if(value==="AC"){

expression="";
display.value="";

}


else if(value==="⌫"){

expression=expression.slice(0,-1);
display.value=expression;

}


else if(value==="Copy"){

navigator.clipboard.writeText(display.value);
alert("Copied");

}


else if(value==="="){


try{

let result=eval(
expression
.replace(/×/g,"*")
.replace(/÷/g,"/")
.replace(/−/g,"-")
);


saveHistory(expression,result);

display.value=result;

expression=result.toString();


}

catch{

display.value="Error";
expression="";

}


}


else{


expression+=value;
display.value=expression;


}


};


});



/* Scientific */


scienceButtons.forEach(btn=>{


btn.onclick=()=>{


let value=btn.innerText;
let num=Number(display.value);


switch(value){


case "√":
display.value=Math.sqrt(num);
break;


case "x²":
display.value=num*num;
break;


case "x³":
display.value=num*num*num;
break;


case "1/x":
display.value=1/num;
break;


case "sin":
display.value=Math.sin(num);
break;


case "cos":
display.value=Math.cos(num);
break;


case "tan":
display.value=Math.tan(num);
break;


case "log":
display.value=Math.log10(num);
break;


case "ln":
display.value=Math.log(num);
break;


case "π":
display.value=Math.PI;
break;


case "e":
display.value=Math.E;
break;


case "!":

let fact=1;

for(let i=1;i<=num;i++){
fact*=i;
}

display.value=fact;

break;


}


};


});



/* Currency Converter */


convertBtn.onclick=()=>{


let value=Number(amount.value);

let rate=1;


if(fromCurrency.value==="INR" && toCurrency.value==="USD")
rate=0.012;


else if(fromCurrency.value==="USD" && toCurrency.value==="INR")
rate=83;


else if(fromCurrency.value==="EUR" && toCurrency.value==="INR")
rate=90;


let result=value*rate;


currencyResult.innerHTML=result.toFixed(2);


};