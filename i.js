function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let deadlineInput = document.getElementById("deadlineInput").value;
    if (taskInput.trim() === "") {
        alert("Please enter a task name.");
        return;
    }
    
    let task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.ondragstart = drag;
    task.innerHTML = `${taskInput} - ${deadlineInput} 
        <button class='edit-btn' onclick='editTask(this)'>Edit</button>
        <button class='delete-btn' onclick='deleteTask(this)'>Delete</button>`;
    
    document.getElementById("todo").appendChild(task);
    document.getElementById("taskInput").value = "";
    document.getElementById("deadlineInput").value = "";
}

function editTask(button) {
    let taskDiv = button.parentElement;
    let text = taskDiv.childNodes[0].textContent.split(" - ")[0];
    let newText = prompt("Edit Task:", text);
    if (newText !== null && newText.trim() !== "") {
        taskDiv.childNodes[0].textContent = newText + " - " + taskDiv.childNodes[0].textContent.split(" - ")[1];
    }
}

function deleteTask(button) {
    button.parentElement.remove();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.outerHTML);
    setTimeout(() => event.target.remove(), 0);
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.closest(".column").querySelector(".task-list").innerHTML += data;
    let tasks = event.target.closest(".column").querySelectorAll(".task");
    tasks.forEach(task => task.ondragstart = drag);
}
