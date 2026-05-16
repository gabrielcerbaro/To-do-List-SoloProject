class Task {
    constructor(task) {
        // Texto da tarefa digitada pelo usuário
        this.task = task;
        // Id único para cada tarefa, usado para remover ou marcar como concluída
        this.id = Date.now() + Math.random();
        // Indica se a tarefa está finalizada
        this.taskFinished = false;
    }
}

class TaskList {
    constructor(){
        // Array que guarda todas as tarefas do projeto
        this.list = [];
    }

    add(text){
        // Cria um novo objeto Task e adiciona ao array
        const texto = new Task(text);
        this.list.push(texto);
    }
    remove(id) {
        // Filtra o array e remove a tarefa com o id informado
        this.list = this.list.filter(task => task.id !== id);
    }
    finished(id){
        // Encontra a tarefa pelo id e marca como concluída
        const finished = this.list.find(idTask => idTask.id == id);
        if(finished){
           finished.taskFinished = true;
        } else {
            console.log("This list don't includes this task")
        }
    }
}

// Instância da classe que controla a lista de tarefas
let newTaskList = new TaskList();

// Seleciona o formulário no HTML
const formCaptured = document.querySelector(".forms");

formCaptured.addEventListener("submit", function (e) {
    // Evita que o formulário recarregue a página ao enviar
    e.preventDefault();
    // Lê o valor do campo de texto
    let prompt = document.querySelector("#task").value
    // Adiciona a tarefa na lista
    newTaskList.add(prompt)
    // Atualiza a lista exibida
    render();
})

function render () {
    // Seleciona o elemento <ul> da lista
    let ulcaptured = document.querySelector("#list");
    // Limpa o conteúdo para redesenhar a lista atualizada
    ulcaptured.innerHTML = "";

    newTaskList.list.forEach(tasks => {
        // Cria um novo item da lista para cada tarefa
        const createLi = document.createElement("li")
        const createSpan = document.createElement("span");
        createSpan.textContent = tasks.task;
        createLi.appendChild(createSpan)
        ulcaptured.appendChild(createLi);

        // Se a tarefa estiver concluída, risca o texto
        if(tasks.taskFinished === true) {
            createSpan.style.textDecoration = "line-through";
        }

        // Cria botão para remover a tarefa
        const btnRemoveTask = document.createElement("button");
            btnRemoveTask.textContent = "Remover";
            btnRemoveTask.classList.add("btn-remove");
            createLi.appendChild(btnRemoveTask);

            btnRemoveTask.addEventListener("click", function(){
                newTaskList.remove(tasks.id);
                render();
        })
        
        // Cria botão para marcar a tarefa como concluída
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