let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
let button = document.querySelector(".delete-all")
let taskAr = [];

//check if theres taks in local storage 
if (localStorage.getItem("tasks")) {
  taskAr = JSON.parse(localStorage.getItem("tasks"))
}

getDAtaFromStorage();
// window.localStorage.clear();
submit.onclick = function () {
  if (input.value !== "") {
    ADDTASk(input.value);
    input.value = "";
  }
}
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deletTaskWith(e.target.parentElement.getAttribute("data-id"))
  }
  //Task Element 
  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"))
    e.target.classList.toggle("done");
  }
})
function ADDTASk(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  }
  taskAr.push(task)
  addElments(taskAr)
  addToLocalStorage(taskAr)
}
function addElments(taskAr) {
  taskDiv.innerHTML = "";
  taskAr.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // check
    if (task.completed) {
      div.className = "task done"
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title))
    let span = document.createElement("span")
    span.className = "del"
    span.appendChild(document.createTextNode("Delete"))
    div.appendChild(span)

    //ADD task div to page
    taskDiv.appendChild(div)
  });
}
function addToLocalStorage(taskAr) {
  window.localStorage.setItem("tasks", JSON.stringify(taskAr))
  delete_all_Button()
}
function getDAtaFromStorage() {
  let data = window.localStorage.getItem("tasks")
  if (data) {
    let tasks = JSON.parse(data);
    addElments(tasks)
  }
}
function deletTaskWith(taskId) {
  //for Explain
  // for (let i = 0; i< taskAr.length; i++) {
  //   console.log(`${taskAr[i].id}=== ${taskId}`)
  // }
  taskAr = taskAr.filter((task) => task.id != taskId);
  addToLocalStorage(taskAr)
}
function toggleStatus(taskId) {
  for (let i = 0; i < taskAr.length; i++) {
    if (taskAr[i].id == taskId) {
      taskAr[i].completed == false ? (taskAr[i].completed = true) : (taskAr[i].completed = false);
    }
  }
  addToLocalStorage(taskAr)
}
///// show delete-all button 



function delete_all_Button() {
  if (JSON.parse(localStorage.getItem("tasks")).length > 2) {
    button.style.display = "block"
  } else {
    button.style.display = "none"
  }
}

button.onclick = () => {
  localStorage.clear()
  window.location.reload()
}