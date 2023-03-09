const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const clearContainerBtn = document.getElementById("clear-container");
const warning = document.getElementById("warning");

addTaskBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addTask();
});

clearContainerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearContainer();
});

function addTask() {
  if (taskInput.value == "") {
    alert("Введите задачу!");
  } else {
    const task = document.createElement("div");
    task.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    const taskContent = document.createElement("input");
    taskContent.className = "task-content";
    taskContent.type = "text";
    taskContent.value = taskInput.value;
    taskContent.setAttribute("readonly", "readonly");

    const taskText = document.createElement("label");
    taskText.className = "task-text";

    const editBtn = document.createElement("div");
    editBtn.className = "edit-btn";
    editBtn.textContent = "\u270F\uFE0F";

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "\u00D7";

    const textCheckboxWrapper = document.createElement("div");
    textCheckboxWrapper.className = "text-checkbox-wrapper";

    taskText.appendChild(taskContent);
    textCheckboxWrapper.append(checkbox, taskText);
    task.append(textCheckboxWrapper, editBtn, deleteBtn);
    taskContainer.appendChild(task);

    taskInput.value = "";
    taskInput.focus();

    clearContainerBtn.disabled = false;
    warning.style.display = "none";

    checkbox.addEventListener("click", function (evt) {
      if (evt.target.type !== "checkbox") {
        return;
      }
      taskContent.classList.toggle("strike-out");
    });

    editBtn.addEventListener("click", () => {
      if (editBtn.textContent == "\u270F\uFE0F" && !checkbox.checked) {
        taskContent.removeAttribute("readonly");
        taskContent.focus();
        editBtn.textContent = "\uD83D\uDCBE";
      } else {
        taskContent.setAttribute("readonly", "readonly");
        editBtn.textContent = "\u270F\uFE0F";
      }
    });

    deleteBtn.addEventListener("click", () => {
      taskContainer.removeChild(task);
      showWarning();
    });
  }
}

function clearContainer() {
  const allTasks = document.querySelectorAll(".task");

  for (let item of allTasks) {
    item.remove();
  }

  clearContainerBtn.disabled = true;
  warning.style.display = "block";
}

function showWarning() {
  if (!taskContainer.hasChildNodes()) {
    clearContainerBtn.disabled = true;
    warning.style.display = "block";
  }
}