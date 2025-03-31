
document.addEventListener("DOMContentLoaded", function () {
    loadTasks(); 
});

function addTask() {
    console.log("hello");
    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value.trim();
    
    if (taskValue === "") return;

    let task = { text: taskValue, completed: false };

    let storedTasks = localStorage.getItem("taskList");
    let tasks = [];

    try {
        tasks = storedTasks ? JSON.parse(storedTasks) : [];
        if (!Array.isArray(tasks)) throw new Error("Invalid data format");
    } catch (error) {
        console.error("Corrupt localStorage data! Resetting task list.");
        localStorage.removeItem("taskList");
        tasks = [];
    }

    tasks.push(task);
    localStorage.setItem("taskList", JSON.stringify(tasks));

    renderTask(task, tasks.length - 1);
    taskInput.value = "";
}


function renderTask(task, index) {
    let taskList = document.querySelector(".list-container"); 
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
        <button class="close" onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    document.querySelector(".list-container").innerHTML = "";
    tasks.forEach((task, index) => renderTask(task, index));
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("taskList", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("taskList")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tasks));
    loadTasks();
}