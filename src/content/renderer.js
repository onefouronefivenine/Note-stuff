const { ipcRenderer } = require('electron');

const settings = {
    saveLocation: ipcRenderer.sendSync("requestDataPath") + "\\notes\\"
}

function openAddNotePopup()
{
    const popup = document.querySelector(".noteSettings");
    popup.style.display = "flex";

    popup.querySelector("#saveloc").value = settings.saveLocation;
}

function closeAddNotePopup()
{
    const popup = document.querySelector(".noteSettings");
    popup.style.display = "none";
}

function addNote()
{
    const title = document.querySelector("#title");
    const saveloc = document.querySelector("#saveloc");


    const noteList = document.querySelector("#notes");

    const noteElement = document.createElement("li");
    noteElement.innerHTML = title.value;

    noteList.appendChild(noteElement);
    console.log("note added");

    closeAddNotePopup();
}

const noteContent = document.querySelector(".content");
const invisibleTextarea = document.createElement("textarea");
document.querySelector("#dick").append(invisibleTextarea);
invisibleTextarea.style = "opacity: 0; width: 0; height: 0; margin: 0; padding: 0;";

noteContent.addEventListener("click", e => {
    invisibleTextarea.focus();
})

window.addEventListener("keydown", e => {
    noteContent.innerText = invisibleTextarea.value;
})

window.addEventListener("keyup", e => {
    noteContent.innerText = invisibleTextarea.value;
})

window.addEventListener("keypress", e => {
    noteContent.innerText = invisibleTextarea.value;
})

setInterval(() => {
    noteContent.innerText = invisibleTextarea.value;
}, 0)

document.querySelector("#createForm").addEventListener("submit", e => {
    addNote();
    e.preventDefault();
})