function getData(){
    let input = document.getElementById("input").value
    let grams = input * 1000
    document.getElementById("grams").innerText = grams

    let pounds = input * 2.20462
    document.getElementById("pounds").innerText = pounds

    let ounces = input * 35.274
    document.getElementById("ounces").innerText = ounces

    let tonne = input * 0.001
    document.getElementById("tonne").innerText = tonne

}