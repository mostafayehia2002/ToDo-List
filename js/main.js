let Input = document.querySelector(`.add-task input`);
let btn = document.querySelector(`.add-task .plus`);
let taskContainer = document.querySelector(`.todo-content`);
let noMassage = document.querySelector(`.no-task-massage`);
let tasksCount = document.querySelector(`.task-count span`);
let tasksCompleted = document.querySelector(`.task-completed span`);
let mainSpan;
let data;
let array = [];




//focus on input filed
window.onload = () => {
    Input.focus();

    if (window.localStorage.getItem("task")) {
        array = JSON.parse(window.localStorage.getItem("task"));
        for (let i = 0; i < array.length; i++) {
            noMassage.remove();
            createElement(array);
        }
        calculate();
    }
};

//adding tasks
btn.onclick = () => {
    if (Input.value === "") {
        console.log("empty");
    } else {
        addTaskToArray(Input.value);
        console.log(array);
        noMassage.remove();
        createElement(array);
        Input.value = '';
        Input.focus();
        calculate();

    }


    window.localStorage.setItem("task", JSON.stringify(array));
}




//add event to delete button
document.addEventListener("click", (e) => {
    //delete  current Task
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        calculate();
        for (let x = 0; x < array.length; x++) {
            if (e.target.parentElement.firstChild.textContent.trim() === array[x]) {
                array.splice(x, 1);
                window.localStorage.setItem("task", JSON.stringify(array));
            }


        }

    }


    //finish task
    if (e.target.classList.contains("task-box")) {
        e.target.classList.toggle("finished");
        calculate();
    }


    //if no Tasks 
    if (taskContainer.childElementCount == 0) {
        taskContainer.appendChild(noMassage);

    }




}



)




//delete all tasks
let deleteAll = document.getElementById("deleteAll");
deleteAll.onclick = () => {
    document.querySelectorAll(".task-box").forEach((e) => {
        e.remove();
        window.localStorage.clear();
    })
    calculate();
    taskContainer.appendChild(noMassage);

};


//finish all tasks
let finishAll = document.getElementById("finishAll");
finishAll.onclick = () => {
    document.querySelectorAll(".task-box").forEach((e) => {
        e.classList.toggle("finished");
        calculate();
    })


}


//calculate count and finish
function calculate() {
    let taskCount = document.querySelector(".task-count span");
    let taskCompleted = document.querySelector(".task-completed span");
    taskCount.innerHTML = document.querySelectorAll(".task-box").length;
    taskCompleted.innerHTML = document.querySelectorAll(".finished").length;
}

//function to create elements
function createElement(arr) {
    arr.forEach((e) => {
        //create span element
        mainSpan = document.createElement(`span`);
        //create delete button
        let deleteBtn = document.createElement(`span`);

        //create text to span
        let text = document.createTextNode(e);
        //create text to delete btn
        let deleteText = document.createTextNode("Delete");
        //adding text to delete button
        deleteBtn.appendChild(deleteText)
        //adding input text to main span
        mainSpan.appendChild(text);

        //adding delete button to main span
        mainSpan.appendChild(deleteBtn);

        //add class to main span
        mainSpan.classList.add("task-box");
        //add class to delete button
        deleteBtn.classList.add("delete");

    });

    //adding main span to tasks container
    taskContainer.appendChild(mainSpan);
}

//function to add tasks to array
function addTaskToArray(task) {
    array.push(task);
}

