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
    }, 500)
}
