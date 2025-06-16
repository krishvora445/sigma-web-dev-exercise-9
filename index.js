// let min = 0;
// let max = 100;
// let randomNumber = Math.random() * (max - min) + min;



// // a = Math.random()

// b = 5;
// c = 6;


// if (randomNumber >= 10) {
//     let d = b + c;
//     let q = b * c;
//     let w = b - c;
//     let e = b / c;
//     console.log(d)
//     console.log(q)
//     console.log(w)
//     console.log(e)
// }
// else {
//     let f = b - c;
//     let g = b * c;
//     let h = b / c;
//     let j = b ** c;
//     console.log(f)
//     console.log(g)
//     console.log(h)
//     console.log(j)
// }

// console.log(randomNumber)




document.addEventListener("DOMContentLoaded", () => {
    // Get references to all the HTML elements
    const num1Input = document.getElementById("num1");
    const num2Input = document.getElementById("num2");
    const opButtons = document.querySelectorAll(".op-btn");
    const calculateBtn = document.getElementById("calculate-btn");
    const resultDisplay = document.getElementById("result-display");

    let selectedOperator = null;

    // Add click listeners to the operator buttons
    opButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedOperator = button.getAttribute("data-op");
            // Optional: Add a style to show which operator is selected
            opButtons.forEach(btn => btn.style.backgroundColor = "#3A6073");
            button.style.backgroundColor = "var(--primary-accent)";
        });
    });

    // Add click listener to the equals button
    calculateBtn.addEventListener("click", () => {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);

        // Basic validation
        if (isNaN(num1) || isNaN(num2) || !selectedOperator) {
            resultDisplay.innerText = "Error";
            return;
        }

        // --- The Faulty Calculator Logic ---
        let result;
        const randomChance = Math.random(); // A random number between 0 and 1

        if (randomChance < 0.1) { // 10% chance of being faulty
            // Perform faulty calculation
            switch (selectedOperator) {
                case '+':
                    result = num1 - num2; // Wrong
                    break;
                case '-':
                    result = num1 / num2; // Wrong
                    break;

                case '*':
                    result = num1 + num2; // Wrong
                    break;
                case '/':
                    result = num1 ** num2; // Wrong
                    break;
            }
            // Trigger the glitch effect for faulty results
            triggerGlitch(result);
        } else {
            // Perform correct calculation
            switch (selectedOperator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
            }
            // Display the correct result normally
            displayResult(result);

        }
    });

    // Function to display the result normally
    function displayResult(value) {
        resultDisplay.classList.remove("glitch");
        resultDisplay.innerText = formatResult(value);
    }
    
    // Function to trigger the glitch animation
    function triggerGlitch(value) {
        // We set a data-attribute to the result text for the ::before and ::after pseudo-elements
        resultDisplay.setAttribute('data-text', formatResult(value)); 
        resultDisplay.classList.add("glitch");
        resultDisplay.innerText = formatResult(value);
        
        // Remove the glitch class after the animation ends so it can be re-triggered
        setTimeout(() => {
            resultDisplay.classList.remove("glitch");
        }, 700); // Animation duration is 0.7s
    }

    // Helper function to format the result nicely
    function formatResult(value) {
        if (Number.isFinite(value)) {
            // If the number is very long, format it to a few decimal places
            return parseFloat(value.toFixed(4));
        }
        return "Infinity"; // Handle division by zero
    }
});
