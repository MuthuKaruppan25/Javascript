function appendToDisplay(value){
    document.getElementById("display").value += value;
}

function deleteLastChar(){
    document.getElementById("display").value = document.getElementById("display").value.slice(0,-1);
}

function clearDisplay(){
    document.getElementById("display").value = "";
}

function calculateResult(){
    try {
        let result = eval(document.getElementById("display").value);
        document.getElementById("display").value = result;
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
}