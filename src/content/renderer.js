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




document.querySelector("#createForm").addEventListener("submit", e => {
    addNote();
    e.preventDefault();
})