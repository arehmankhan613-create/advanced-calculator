const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("historyList");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        let value = button.innerText;

        if (value === "AC") {
            display.value = "";
        }

        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }

        else if (value === "=") {

            try {

                let expression = display.value
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");

                let result = eval(expression);

                historyList.innerHTML += `<li>${display.value} = ${result}</li>`;

                display.value = result;

            } catch {

                display.value = "Error";

            }

        }

        else if (value === "Copy") {

            navigator.clipboard.writeText(display.value);

            alert("Copied!");

        }

        else {

            display.value += value;

        }

    });

});