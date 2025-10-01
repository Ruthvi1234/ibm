const taskForm = document.getElementById("taskForm");
const taskListEl = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render task list
function renderTasks() {
  taskListEl.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      ${task.title} (${task.date} ${task.time || ""}) [${task.priority}]
      <div>
        <button onclick="toggleComplete(${index})">✓</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskListEl.appendChild(li);
  });
}

// Add task
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const priority = document.getElementById("priority").value;

  tasks.push({ title, date, time, priority, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Load tasks on startup
renderTasks();
