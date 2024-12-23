const modal = document.querySelector(".confirm-modal");
const columnsContainer = document.querySelector(".columns");
const columns = columnsContainer.querySelectorAll(".column");
let currentTask = null;

document.addEventListener("DOMContentLoaded", () => {
  columns.forEach((column) => {
    updateTaskCount(column);
  });
});

// Create Task Element /////////////////////////////////////////////////

function createTask(content) {
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerHTML = `<div>${content}</div>
        <menu>
            <button data-edit><i class="bi bi-pencil"></i></button>
            <button data-delete><i class="bi bi-trash"></i></button>
        </menu>`;
  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragend", handleDragEnd);

  return task;
}

//dragover and drop

tasksElements = columnsContainer.querySelectorAll(".tasks");
for (const tasksEle of tasksElements) {
  tasksEle.addEventListener("dragover", handleDragover);
  tasksEle.addEventListener("drop", handleDrop);
}

function handleDragover(e) {
  e.preventDefault();
  const draggedTask = document.querySelector(".dragging");
  // select the closest container where the task is dragged
  const target = e.target.closest(".task, .tasks");

  if (!target || target == draggedTask) return;

  if (target.classList.contains("tasks")) {
    //target is tasks container
    const lastChild = target.lastElementChild;

    if (!lastChild) {
      // id there is no lastChild. it means tasks container is empty.
      // append to tasks container
      target.appendChild(draggedTask);
    } else {
      const { bottom } = lastChild.getBoundingClientRect();
      e.clientY > bottom && target.appendChild(draggedTask);
    }
  } else {
    //target is another task. now try to append before or after the task
    const { top, height } = target.getBoundingClientRect();
    //calculate center of target task
    const distance = top + height / 2;

    if (e.clientY > distance) {
      target.after(draggedTask);
    } else {
      target.before(draggedTask);
    }
  }

  console.log("dargover");
}

function handleDrop(e) {
  e.preventDefault();
  console.log("dropped");
}

function handleDragStart(e) {
  requestAnimationFrame(() => {
    e.target.classList.add("dragging");
  });
  console.log("started dragging");
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  console.log("ended dragging");
}

//create input to take taskName
function createtaskInput(text = "") {
  const input = document.createElement("div");
  input.contentEditable = true;
  input.className = "task-input";
  input.dataset.placeholder = "Task Name";
  input.addEventListener("blur", (e) => {
    handleBlur(e);
  });
  input.innerText = text;

  return input;
}

//handleBlur event after taskInput is entered
function handleBlur(e) {
  const input = e.target;
  const content = input.innerText.trim() || "Untitled";
  const task = createTask(content.replace(/\n/g, "<br>"));
  input.replaceWith(task);
}

function handleAddInput(e) {
  const taskEle = e.target.closest(".column").lastElementChild;
  const input = createtaskInput();
  taskEle.appendChild(input);
  input.focus();
}

//eventListener to create task-input
columnsContainer.addEventListener("click", (e) => {
  if (e.target.closest("button[data-add]")) {
    handleAddInput(e);
  } else if (e.target.closest("button[data-edit]")) {
    handleEdit(e);
  } else if (e.target.closest("button[data-delete]")) {
    handleDelete(e);
  }
});

// Edit Task ////////////////////////////////////////////////////////////

function handleEdit(e) {
  const task = e.target.closest(".task");
  const input = createtaskInput(task.innerText);
  task.replaceWith(input);
  input.focus();

  //move cursot to end while editing task
  const selection = window.getSelection();
  selection.selectAllChildren(input);
  selection.collapseToEnd();
}

// Delete Task  //////////////////////////////////////////////////////////

function handleDelete(e) {
  currentTask = e.target.closest(".task");
  modal.querySelector(".preview").innerText = currentTask.innerText;
  modal.showModal();
}

//confirm deletion
modal
  .querySelector("#confirm")
  .addEventListener("click", () => currentTask && currentTask.remove());
//cancel deletion
modal.querySelector("#cancel").addEventListener("click", () => modal.close());
//clear currentTask
modal.addEventListener("close", () => (currentTask = null));

//dummy tasks

let tasks = [
  ["Write Report 📊", "Code Review 💻", "Team Meeting 📅"],
  ["Morning Workout 💪", "Chill Time 🍺"],
  ["Fix Bugs 🛠️", "Submit Project ✅"],
  ["Write Bot🤖"],
];

tasks.forEach((col, index) => {
  for (const item of col) {
    columns[index].querySelector(".tasks").appendChild(createTask(item));
  }
});

// Update Task Count on Column-Title

function updateTaskCount(column) {
  const tasks = column.querySelector(".tasks").children;
  const taskCount = tasks.length;
  column.querySelector(".column-title h3").dataset.tasks = taskCount;
}

function observeTaskChanges() {
  for (const column of columns) {
    const observer = new MutationObserver(() => updateTaskCount(column));
    observer.observe(column.querySelector(".tasks"), { childList: true });
  }
}

observeTaskChanges();
