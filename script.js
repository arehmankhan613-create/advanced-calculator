const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");
const themeBtn = document.getElementById("themeBtn");

let expression = "";
let darkMode = true;

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.innerText;

        if (value === "AC") {
            expression = "";
            display.value = "";
            return;
        }

        if (value === "⌫") {
            expression = expression.slice(0, -1);
            display.value = expression;
            return;
        }

        if (value === "Copy") {
            navigator.clipboard.writeText(display.value);
            alert("Copied Successfully");
            return;
        }

        if (value === "=") {

            try {

                let exp = expression
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");

                let answer = eval(exp);

                historyList.innerHTML += `
                    <li>${expression} = ${answer}</li>
                `;

                display.value = answer;
                expression = answer.toString();

            } catch {

                display.value = "Error";
                expression = "";

            }

            return;
        }

        expression += value;
        display.value = expression;

    });
});

clearHistory.onclick = () => {
    historyList.innerHTML = "";
};

themeBtn.onclick = () => {

    darkMode = !darkMode;

    if (darkMode) {

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e293b)";

    } else {

        document.body.style.background =
        "linear-gradient(135deg,#dbeafe,#f8fafc)";

    }

};
/* ===========================
   Keyboard Support
=========================== */

document.addEventListener("keydown", (e) => {

    if (!isNaN(e.key) || "+-*/.%".includes(e.key)) {
        expression += e.key;
        display.value = expression;
    }

    if (e.key === "Enter") {
        e.preventDefault();

        try {

            let exp = expression;

            let answer = eval(exp);

            historyList.innerHTML +=
            `<li>${expression} = ${answer}</li>`;

            display.value = answer;

            expression = answer.toString();

        } catch {

            display.value = "Error";
            expression = "";

        }

    }

    if (e.key === "Backspace") {

        expression = expression.slice(0,-1);

        display.value = expression;

    }

});


/* ===========================
Scientific Calculator
=========================== */

const scienceButtons =
document.querySelectorAll(".science-grid button");

scienceButtons.forEach(btn=>{

btn.onclick=()=>{

let value=btn.innerText;

let num=parseFloat(display.value);

switch(value){

case "√":
display.value=Math.sqrt(num);
break;

case "x²":
display.value=Math.pow(num,2);
break;

case "x³":
display.value=Math.pow(num,3);
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
display.value=Math.PI.toFixed(8);
break;

case "e":
display.value=Math.E.toFixed(8);
break;

case "!":

let fact=1;

for(let i=1;i<=num;i++){

fact*=i;

}

display.value=fact;

break;

}

expression=display.value;

}

});
const standardTab = document.getElementById("standardTab");
const scienceTab = document.getElementById("scienceTab");
const currencyTab = document.getElementById("currencyTab");

const calculatorButtons = document.querySelector(".buttons");
const scientificPanel = document.getElementById("scientificPanel");
const currencyPanel = document.getElementById("currencyPanel");

standardTab.onclick = () => {

    calculatorButtons.style.display = "grid";
    scientificPanel.style.display = "none";
    currencyPanel.style.display = "none";

};

scienceTab.onclick = () => {

    calculatorButtons.style.display = "none";
    scientificPanel.style.display = "block";
    currencyPanel.style.display = "none";

};

currencyTab.onclick = () => {

    calculatorButtons.style.display = "none";
    scientificPanel.style.display = "none";
    currencyPanel.style.display = "block";

};