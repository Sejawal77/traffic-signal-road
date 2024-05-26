let car = document.getElementById("car");
let btn = document.getElementById("btn");
let redLight = document.getElementById("red-light");
let yellowLight = document.getElementById("yellow-light");
let greenLight = document.getElementById("green-light");
let fineCounter = document.getElementById("fine-counter");
let policeStation = document.getElementById("police-station");
let revrs = document.querySelector("#reverse");

let position = 0;
let fine = 0;
let interval;
let signalState = "red";
let hasStarted = false;

btn.addEventListener('click', function() {
    if (btn.textContent === "Start") {
        if (signalState !== "green") {
            fine += 100;
            fineCounter.textContent = `Fines: $${fine}`;
            alert("You started before the signal turned green! You have been fined $100.");
        } else {
            hasStarted = true;
            interval = setInterval(startCar, 100);
        }
    } else {
        clearInterval(interval);
        btn.textContent = "Start";
        btn.style.backgroundColor = "rgb(42, 208, 42)";
        btn.style.color = "black";
    }
});

function startCar() {
    position += 10;
    car.style.left = position + 'px';
    if (position >= window.innerWidth - 200) {
        clearInterval(interval);
        btn.textContent = "Start";
        btn.style.backgroundColor = "rgb(42, 208, 42)";
        btn.style.color = "black";
        position = 0;
    } else {
        btn.textContent = "Stop";
        btn.style.backgroundColor = "red";
        btn.style.color = "aqua";
    }
}

revrs.addEventListener("click",function(){
    reverse();
    clearInterval(interval);
  
    if(revrs.textContent=='Reverse'){
        revrs.textContent= 'brake'
        interval= setInterval(reverse,140)}
    
    
     else{ clearInterval(interval)
        revrs.textContent= 'Reverse'
       
}
     
})

function reverse(){
    if(position >1){
        position -= 8;
        car.style.left = position + 'px';
    }else{
        car.style.left = position + 'px';
    }
   
}





function changeSignal() {
    if (signalState === "red") {
        redLight.classList.remove("active");
        yellowLight.classList.add("active");
        signalState = "yellow";
    } else if (signalState === "yellow") {
        yellowLight.classList.remove("active");
        greenLight.classList.add("active");
        signalState = "green";
    } else if (signalState === "green") {
        greenLight.classList.add("active");
        // redLight.classList.add("active");
        signalState = "green";
        clearInterval(handle)
        if (hasStarted && fine > 0) {
            alert("You didn't pay the fine! You have been arrested.");
            car.style.left = '0';
            position = 0;
            fine = 0;
            fineCounter.textContent = `Fines: $0`;
        }
    }
}
let handle = setInterval(changeSignal, 5000);

