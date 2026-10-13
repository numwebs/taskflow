const taskInput = document.getElementById("task-input");
const deadlineInput = document.getElementById("task-deadline");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const completedList = document.getElementById("completed-list");

loadTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();
    const deadline = deadlineInput.value;

    if (text === "") {
        alert("Tulis tugasnya dulu ya! 💗");
        return;
    }

    createTask(text, false, deadline);

    taskInput.value = "";
    deadlineInput.value = "";

    saveTasks();
}

function createTask(text, completed, deadline = "") {
    const li = document.createElement("li");

    li.dataset.taskText = text;
    li.dataset.deadline = deadline;

    const content = document.createElement("div");
    content.className = "task-content";

    const span = document.createElement("span");
    span.textContent = text;

    content.appendChild(span);

    if (deadline) {
        const dateLabel = document.createElement("small");
        dateLabel.className = "task-deadline";
        dateLabel.textContent = "📅 Deadline: " + deadline;
        content.appendChild(dateLabel);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.display = completed ? "block" : "none";

    li.appendChild(content);
    li.appendChild(deleteBtn);

    if (completed) {
        li.classList.add("completed");
        completedList.appendChild(li);
    } else {
        taskList.appendChild(li);
    }

    span.addEventListener("click", function () {
        if (!li.classList.contains("completed")) {
            li.classList.add("completed");
            completedList.appendChild(li);
            deleteBtn.style.display = "block";
            saveTasks();
        }
    });

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({
            text: li.dataset.taskText,
            deadline: li.dataset.deadline || "",
            completed: false
        });
    });

    document.querySelectorAll("#completed-list li").forEach(li => {
        tasks.push({
            text: li.dataset.taskText,
            deadline: li.dataset.deadline || "",
            completed: true
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed, task.deadline || "");
    });
}