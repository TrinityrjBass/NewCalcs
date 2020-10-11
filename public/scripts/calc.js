//make a calculator
var equations = [];

function calculate() {
    // get operands
    let o1 = document.getElementById("operand1").value;
    let o2 = document.getElementById("operand2").value;
    let operator = document.getElementById("operator").value;

    // parse operands to integers to avoid stringy problems
    o1 = parseInt(o1);
    o2 = parseInt(o2);

    // sum, difference, product, quotient
    let equation = o1 + " " + operator + " " + o2 + " = ";
    let result = 0;
    // calculate
    switch (operator) {
        case "+":
            result = o1 + o2; 
            break
        case "-":
            result = o1 - o2;
            break
        case "*":
            result = o1 * o2;
            break
        case "/":
            result = o1 / o2;
            break
        default:
            result = "operator error";
    }

    // check if there's room in text area, if not make room
    checkRows(equations);

    // add newline to result
    result += ' \r\n';
    equation += result;

    // add results to list
    equations.push(equation);

    // add to display box
    displayResults(equations);
}

function checkRows(equations) {
    var len = equations.length;
    console.log(len);

    if (len > 9) {
        equations.shift();
    }

}

function displayResults(equations) {
    clearHistory();
    let l = equations.length;
    for (l; l > 0; l--) {
        // print in reverse to textarea
        document.getElementById("display").value += equations[l - 1];
    }

}
// provide a clean text area to redisplay/update equations
function clearHistory() {
    document.getElementById("display").value = "";
}