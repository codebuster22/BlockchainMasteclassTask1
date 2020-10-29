var addButton = document.getElementById('task-input-submit');
var clearList = document.getElementsByClassName("clearList")[0];
var input = document.getElementsByClassName("text")[0];
var list = document.querySelector("ul");
var deadlineTime = document.getElementById("deadline");
var deadlineDate = document.getElementById("deadline-date")
var setupElement = document.getElementById("joke-setup")
var deliveryElement = document.getElementById("joke-delivery")

function createListElement(){

    var li = document.createElement("li");
    var delButton = document.createElement("Button");
    var taskItem = document.createElement("h6");
    var timer = document.createElement("p");
    var deadline = new Date(deadlineDate.value+" "+deadlineTime.value).getTime();


    timer.setAttribute("class","timer col-2");

    var x = setInterval(function() {

        var curr = new Date().getTime();
        var diff = deadline - curr;
        console.log(diff)

        var hours = Math.floor((diff / (1000 * 60 * 60)));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timer.innerHTML = hours + ":"
            + minutes + ":" + seconds;

        console.log("Checking starts");
        if (0 < diff && diff < 60674){
            if(diff>59000){
                alert(`! Minute Remaining for task ${timer.parentElement.innerText}`)
            }
            timer.setAttribute("style","color: red")
        }else if (diff < 0) {
            clearInterval(x);
            timer.innerHTML = "EXPIRED";
            timer.setAttribute("style","color: white")
            timer.parentElement.setAttribute("style","background-color: #FE2E2E; color: white")
        }
    }, 1000);

    taskItem.innerHTML = input.value;
    taskItem.setAttribute("class","col-7");
    delButton.appendChild(document.createTextNode("X"));
    delButton.setAttribute("class","btn btn-danger col-2");
    delButton.addEventListener("click",function(){
        delButton.parentElement.remove();
        clearInterval(x)
    });

    li.setAttribute("class","listElement");
    li.appendChild(taskItem);
    li.appendChild(timer)
    li.setAttribute("class","row alert alert-secondary task-list-element");
    li.appendChild(delButton);
    list.appendChild(li);
    input.value="";
}

function inputLength(){
    return input.value.length;
}

function addOnClick(){
    if(inputLength()>0){
        createListElement();
    } else{
        alert("Cannot add empty item.")
    }
}

function addOnPress(keyboardEvent){
    console.log("KeyPress");
    if(keyboardEvent.key === "Enter" && inputLength()>0){
        createListElement()
    }else if(keyboardEvent.key==="Enter" && inputLength() === 0 ) {
        alert("Cannot add Empty item.")
    }
}

function clearOnClick(){
    var i = document.getElementById("task-list");
    if(i.length===0){
        return alert("The list is already empty");
    }else{
        for(var j =0; j<i.length;j++){
            i[j].remove();
            console.log("delete 1 element "+j+" "+i);
        }
    }
    return alert("List will be cleared");
}

const getRandomJoke = async () => {
    var id = Math.random()%10000;
    var response = await fetch(`https://sv443.net/jokeapi/v2/joke/Any`).then(res=>res.json());
    console.log(response)
    if(response.type === "twopart"){
        var setup = (response.setup)
        var delivery = (response.delivery)
        setupElement.innerText = setup;
        deliveryElement.innerText = delivery
    }else {
        var joke = response.joke;
        setupElement.innerText = joke
    }
}

addButton.addEventListener("click", addOnClick);
input.addEventListener("keypress",addOnPress);
clearList.addEventListener("click",clearOnClick);

setInterval(getRandomJoke,10000)