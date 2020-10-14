// make a calculator

// create a db references
var dbReference = firebase.database().ref("equations");
var dbFilter = dbReference.limitToLast(10);

// bool flag for clearing display
var finished = false;

// bool flag for preventing multiple operators
var prevIsOperator = false;

// to store equation value
var equation = "";

// equation list from server
var equations = [];

// magic update when new entry is made in db
dbFilter.on("child_added", snap => {
    // populates array with equations from database
    if (snap.val().newEquation !== undefined) {
        equations.push(snap.val().newEquation);
    }

    // get the data from the response
    if (equations.length == 0) {
        console.log("1 + 1 = 11, there are no equations from db");
    }
});

// get list of equations from db
function getEquations() {
    var dbFilter = dbReference.limitToLast(10);
    console.log("retrieving data");

    dbFilter.on("value", snap => {
            // populates array with equations from database
            if (snap.val().newEquation !== undefined) {
                equations.push(snap.val().newEquation);
            }
            // get the data from the response
            if (equations.length == 0) {
                console.log("1 + 1 = 11, there are no equations from db");
            }
            // show us what you found :)
            displayResults(equations);
        }

    )

}

// send new equation to DB
function sendEquation(newEquation) {
    // make a new entry
    var equationref = dbReference.push();
    // fill the new entry
    equationref.set({ newEquation });
}

function build(n) {
    // if the equation is still being built
    if (finished == false) {
        if (equation == '') {
            updateCalcDisplay('');
        }
        // keep building equation
        prevIsOperator = false;
        equation += n;
    } else {
        // new equation, reset calculator
        clearEquation();
        equation = n;
        finished = false;
        prevIsOperator = false;
    }
    updateCalcDisplay(equation);
}
// "minus" is not included to allow for negative numbers
function operator(o) {

    if (finished == true) {
        finished = false;
        clearEquation();
        prevIsOperator = true;
        if (o == '-') {
            equation = o;
        }
        // we want - to be available, and clear equation
    } else if (equation.length > 0 && prevIsOperator == false) {
        // prevent duplicates, and no ops at beginning
        prevIsOperator = true;
        equation += o;
    }
    updateCalcDisplay(equation);

}

// Calulate the equation
function calculate() {
    finished = true;
    // sum, difference, product, quotient
    let result = '';

    // calculate equation
    try {
        result = "=" + eval(equation);
        if (result !== "=undefined") {
            equation += result;

            // show full equation on calculator
            updateCalcDisplay(equation);

            // add equation to db
            sendEquation(equation);
        }

    } catch (e) {
        result = "error calculating " + equation;
        // clear equation, show error
        clearEquation()
        updateCalcDisplay("error");
    }

    // add to display box
    displayResults(equations);
}

function updateCalcDisplay(s) {
    document.getElementById("calcDisplay").value = s
}

function displayResults(equations) {
    // clear the text area so we don't duplicate entries
    document.getElementById("display").value = '';

    // and repopulate the text area
    if (equations.length === undefined) {
        getEquations();
    }
    let l = equations.length;
    for (l; l > 0; l--) {
        // print in reverse order to textarea
        document.getElementById("display").value += equations[l - 1] + '\r\n';
    }

}
// provide a clean text area to redisplay/update equations
function clearEquation() {
    equation = '';
    updateCalcDisplay('');
    prevIsOperator = false;
}

$(document).ready(getEquations());