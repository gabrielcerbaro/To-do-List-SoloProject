class Task {
    constructor(task) {
        this.task = task;
        this.id = Date.now() + Math.random();
        this.taskFinished = false;
    }
}

class TaskList {
    constructor(){
        this.list = [];
    }

    add(text){
        const texto = new Task(text);
        this.list.push(texto);
    }
    remove(id) {
        this.list = this.list.filter(task => task.id !== id);
    }
    finished(id){
        const finished = this.list.find(idTask => idTask.id == id);
        if(finished){
           finished.taskFinished = true;
        } else {
            console.log("This list don't includes this task")
        }
    }
}

let newTaskList = new TaskList();

const formCaptured = document.querySelector(".forms");

formCaptured.addEventListener("submit", function (e) {
    e.preventDefault();
    let prompt = document.querySelector("#task").value
    newTaskList.add(prompt)
    render();
})

function render () {
    let ulcaptured = document.querySelector("#list");
    ulcaptured.innerHTML = "";

    newTaskList.list.forEach(tasks => {
        const createLi = document.createElement("li")
        const createSpan = document.createElement("span");
        createSpan.textContent = tasks.task;
        createLi.appendChild(createSpan)
        ulcaptured.appendChild(createLi);

        if(tasks.taskFinished === true) {
            createSpan.style.textDecoration = "line-through";
        }

        const btnRemoveTask = document.createElement("button");
            btnRemoveTask.textContent = "Remover";
            btnRemoveTask.classList.add("btn-remove");
            createLi.appendChild(btnRemoveTask);

            btnRemoveTask.addEventListener("click", function(){
                newTaskList.remove(tasks.id);
                render();
        })
        
        const btnFinishedTask = document.createElement("button");
            btnFinishedTask.textContent = "Concluir";
            btnFinishedTask.classList.add("btn-finished");
            createLi.appendChild(btnFinishedTask);

            btnFinishedTask.addEventListener("click", function(){
                newTaskList.finished(tasks.id);
                render();
            })
    })
}