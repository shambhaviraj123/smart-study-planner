// Store tasks
let tasks = [];
let currentFilter = "all";

// Load saved tasks when page opens
window.onload = function () {
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
};

// Add Task
function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let priority = document.getElementById("priority").value;
    let deadline = document.getElementById("deadline").value;

    if (taskInput === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        name: taskInput,
        priority: priority,
        deadline: deadline,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    document.getElementById("taskInput").value = "";
}

// Display Tasks
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        // Apply filter
        if (currentFilter === "completed" && !task.completed) return;
        if (currentFilter === "pending" && task.completed) return;

        let li = document.createElement("li");

        li.innerHTML = `
            ${task.name} | ${task.priority} | ${task.deadline}
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="markDone(${index})">Done</button>
        `;

        // Mark completed tasks
        if (task.completed) {
            li.style.textDecoration = "line-through";
        }

        taskList.appendChild(li);
    });
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Mark as Done
function markDone(index) {
    tasks[index].completed = true;
    saveTasks();
    displayTasks();
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter Tasks
function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

// Clear All Tasks
function clearAll() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
}