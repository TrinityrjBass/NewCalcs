// Database Reference Object
var dbReference = firebase.database().ref("equations");

// sync changes
dbReference.on('value', snap =>
    document.getElementById('serverOut').value = JSON.stringify(snap.val(), null, 3));

// dbReference.limitToLast(10).on("child_added", function(snapshot) {
//     // This callback will be triggered exactly two times, unless there are
//     // fewer than two dinosaurs stored in the Database. It will also get fired
//     // for every new, heavier dinosaur that gets added to the data set.
//     console.log(snapshot.key);
// });
// make a calculator

// to store equation value
var equation = { text: "", id: 0 };

// equation list from server
var equations = [];
var dbequations;

// get list of equations
function getEquations() {
    console.log("getting data");
    let dbItems = dbReference.limitToLast(10);
    var eq = [];
    dbItems.on("value", snap => {
        // this should populate the eq array
        var e = snap.val();
        e.foreach(function(item, index) {
            eq[index] = item;
        })

        if (eq.id == 0) {
            console.log("1 + 1 = 11, there are no equations from db");
        } else {
            console.log(eq.text + " key: " + eq.key)
        }
    })

    return
    // dbReference.on('value', snap =>
    //     t = JSON.stringify(snap.val(), null, 3));
    console.log(t);
}

// send new equation to DB
function sendEquation(newEquation) {
    // make a new entry
    var equationref = dbReference.push();
    // fill the new entry
    equationref.set({ newEquation });
}

// Calulate the equation
function calculate() {
    // get operands
    let o1 = document.getElementById("operand1").value;
    let o2 = document.getElementById("operand2").value;

    let operator = document.getElementById("operator").value;

    // parse operands to integers to avoid stringy problems
    o1 = parseInt(o1);
    o2 = parseInt(o2);

    let equation = o1 + operator + o2;

    // sum, difference, product, quotient
    let result = 0;

    // calculate equation
    try {
        result = "=" + eval(equation);
        equation += result + '';
        // add equation to db
        sendEquation(equation);
    } catch (e) {
        result = "error calculating " + equation;
    }

    // add to display box
    displayResults(equations);
}

// deprecated
function checkRows(equations) {
    var len;
    if (equations.length !== null) {
        len = equations.length;
    } else {
        len = 0;
    }

    console.log(len);

    if (len > 9) {
        equations.shift();
    }

}

function displayResults(equations) {
    // clear the text area
    clearHistory();
    // get data and refill the text area
    getEquations();
    // let l = equations.length;
    // for (l; l > 0; l--) {
    //     // print in reverse to textarea
    //     document.getElementById("display").value += equations[l - 1];
    //}

}
// provide a clean text area to redisplay/update equations
function clearHistory() {
    document.getElementById("display").value = "";
}

function print(item, index) {
    console.log(index + " : " + item);

}