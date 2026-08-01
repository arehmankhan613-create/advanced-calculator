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