// ========== fire AOS lib script ==========
AOS.init();

// ========== open and close modal script ==========
let modalBtn = document.querySelectorAll(".modal-btn"),
    modalBtnsArray = Array.from(modalBtn),
    modalCloseBtn = document.querySelectorAll(".modal-close-btn"),
    modalCloseBtnsArray = Array.from(modalCloseBtn)
modalBtnsArray.forEach(btn => {
    btn.onclick = e => {
        let modalTarget = e.target.getAttribute("data-target")
        document.querySelector(`${modalTarget}`).classList.add("show")
    }
})
modalCloseBtnsArray.forEach(btn => btn.onclick = e => e.target.parentElement.parentElement.parentElement.classList.remove("show"))
window.onclick = e => e.target.classList.contains("modal") ? e.target.classList.remove("show") : ""

// ========== agree and get started button ==========
let agreeBtn = document.querySelector("#agree-get-started"),
    startedComponent = document.querySelector("#welcome-page-component")
agreeBtn.onclick = _ => {
    if (agreeBtn.checked) {
        startedComponent.classList.add("started");
        document.body.classList.remove("overflow-hidden")
    } else {
        startedComponent.classList.remove("started");
        document.body.classList.add("overflow-hidden")
    }
}

// ========== today date script ==========
let todayDate = new Date(),
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    todayDateDiv = document.querySelector(".today-date")

todayDateDiv.innerHTML = `<h2 class="text-white fw-bold">${days[todayDate.getDay()]}</h2>
                        <p class="text-white-50">${month[todayDate.getMonth()]} ${todayDate.getDate()}, ${todayDate.getFullYear()}</p>`

// ========== input label script ==========
let taskDetailsInputs = document.querySelectorAll(".task-details-input input"),
    taskDetailsTextArea = document.querySelector(".task-details-input textarea"),
    taskSubmitBtn = document.querySelector(".task-details-input button")
taskSuccessfullyAlert = document.querySelector(".task-details-input span")
taskDetailsInputs.forEach(input => {
    input.addEventListener("focusout", _ => {
        input.value ? input.classList.add("has-data") : input.classList.remove("has-data");
    })
})
taskDetailsTextArea.addEventListener("focusout", _ => {
    taskDetailsTextArea.value ? taskDetailsTextArea.classList.add("has-data") : taskDetailsTextArea.classList.remove("has-data");
})
taskSubmitBtn.onclick = _ => {
    taskSuccessfullyAlert.classList.replace("d-none", "d-inline")
    setTimeout(_ => {
        document.querySelector("#add-task-data-modal").classList.remove("show");
        taskSuccessfullyAlert.classList.replace("d-inline", "d-none")
    }, 250)
    mainTaskFunction()
}

// ========== add task script ==========
let taskNameInput = document.getElementById("task-name-in"),
    taskCategoryInput = document.getElementById("task-category-in"),
    taskDetailsInput = document.getElementById("task-detail-in"),
    taskDisplayDiv = document.getElementById("tasks"),
    taskEmptyAlert = document.getElementById("noTaskAlert"),
    taskDoneBtns = null /* prototype initialization will change after display*/,
    tasksContainer;

// check old or new user
localStorage.getItem("tasks") == null ? tasksContainer = [] : tasksContainer = JSON.parse(localStorage.getItem("tasks"))
localStorage.getItem("tasks") == null ? taskEmptyAlert.classList.replace("d-none", "d-block") : taskEmptyAlert.classList.replace("d-block", "d-none")
// ==== main task class to inhernace for other tasks => oop =====
class Task {
    constructor(name, cate, detail) {
        this.name = name
        this.category = cate
        this.details = detail
    }
}

// ==== main task function to do the program ====
function mainTaskFunction() {
    getTaskInfo()
    clearTaskInputs()
    setTimeout(displayTasks, 500)
    taskEmptyAlert.classList.replace("d-block", "d-none")
}

// ==== get task information and push to array of tasks ====
function getTaskInfo() {
    let taskInfo = new Task(taskNameInput.value, taskCategoryInput.value, taskDetailsInput.value)
    tasksContainer.push(taskInfo)
    localStorage.setItem("tasks", JSON.stringify(tasksContainer))
}

// ==== clear inputs after click submit btn ====
function clearTaskInputs() {
    taskNameInput.value = null
    taskCategoryInput.value = null
    taskDetailsInput.value = null
}

// ==== display tasks in HTML ====
function displayTasks() {
    let taskDisplayContainer = ``
    for (let i = 0; i < tasksContainer.length; i++) {
        taskDisplayContainer += `
        
        <div class="task">
                        <div class="task-info task-show d-flex justify-content-between align-items-center p-2 rounded-2">
                            <h4 class=" m-0 text-capitalize">${i + 1}- ${tasksContainer[i].name}</h4>
                            <div class="task-btns">
                                <i class="fas fa-check task-done me-1"></i>
                                <i class="far fa-trash-alt task-delete"></i>
                            </div>
                        </div>
                </div>`
    }
    taskDisplayDiv.innerHTML = taskDisplayContainer
    taskDoneBtnsf()
}
window.onload = displayTasks()

// ===== task done part  =====
function taskDoneBtnsf() { /*! get all buttons after display */
    taskDoneBtns = document.querySelectorAll("#tasks .task .task-btns .task-done")
    taskDoneBtns.forEach(btn => {
        btn.onclick = e => {
            let taskParent = e.target.parentElement.parentElement.parentElement
            taskParent.classList.contains("done") ? taskParent.classList.remove("done") : taskParent.classList.add("done")
        }
    })
}


