const { ipcRenderer } = require('electron');

const settings = {
    saveLocation: ipcRenderer.sendSync("requestDataPath") + "\\notes\\"
}

function openAddNotePopup() {
    const popup = document.querySelector(".noteSettings");
    popup.style.display = "flex";

    popup.querySelector("#saveloc").value = settings.saveLocation;
}

function closeAddNotePopup() {
    const popup = document.querySelector(".noteSettings");
    popup.style.display = "none";
}

function addNote() {
    const title = document.querySelector("#title");
    const saveloc = document.querySelector("#saveloc");


    const noteList = document.querySelector("#notes");

    const noteElement = document.createElement("li");
    noteElement.innerHTML = title.value;

    noteList.appendChild(noteElement);
    console.log("note added");

    closeAddNotePopup();
}

const editorFunctions = {
    modifyText(tag, tagVariant = null) {
        const userSelection = window.getSelection();
        const selectedTextRange = userSelection.getRangeAt(0);
        const startContainer = selectedTextRange.startContainer;

        if (startContainer.parentElement.tagName === tag.toUpperCase() ||
            (tagVariant == null ? false : startContainer.parentElement.tagName === tagVariant.toUpperCase())
        ) {
            startContainer.parentElement.outerHTML = startContainer.parentElement.innerHTML;
        } else {
            const strongElement = document.createElement(tag);
            selectedTextRange.surroundContents(strongElement);
            window.getSelection().empty();
        }
    },

    heading1: function()
    {
        const userSelection = window.getSelection();
        const selectedTextRange = userSelection.getRangeAt(0);
        const startContainer = selectedTextRange.startContainer;



        if (startContainer.parentElement.tagName === "H1" ||
            startContainer.parentElement.tagName === "H2"||
            startContainer.parentElement.tagName === "H3"){
            startContainer.parentElement.outerHTML = startContainer.parentElement.innerHTML;
        } else {
            this.modifyText("h1");
        }
    },

    heading2: function()
    {
        const userSelection = window.getSelection();
        const selectedTextRange = userSelection.getRangeAt(0);
        const startContainer = selectedTextRange.startContainer;



        if (startContainer.parentElement.tagName === "H1" ||
            startContainer.parentElement.tagName === "H2"||
            startContainer.parentElement.tagName === "H3"){
            startContainer.parentElement.outerHTML = startContainer.parentElement.innerHTML;
        } else {
            this.modifyText("h2");
        }
    },

    heading3: function()
    {
        const userSelection = window.getSelection();
        const selectedTextRange = userSelection.getRangeAt(0);
        const startContainer = selectedTextRange.startContainer;



        if (startContainer.parentElement.tagName === "H1" ||
            startContainer.parentElement.tagName === "H2"||
            startContainer.parentElement.tagName === "H3"){
            startContainer.parentElement.outerHTML = startContainer.parentElement.innerHTML;
        } else {
            this.modifyText("h3");
        }
    },

    convertToMD: function () {
        const textarea = document.querySelector(".typing-area");
        const convertTable = [
            ["<b>", "</b>", "**", "**"],
            ["<em>", "</em>", "*", "*"],
            ["<u>", "</u>", "<ins>", "</ins>"],
            ["<s>", "</s>", "~~", "~~"],
            ["<code>", "</code>", "`", "`"],
            ["<q>", "</q>", "\"", "\""],
            ["<blockquote>", "</blockquote>", "> ", ""],

            ["<h1>", "</h1>", "# ", ""],
            ["<h2>", "</h2>", "## ", ""],
            ["<h3>", "</h3>", "### ", ""],

            ["<br>", "<br/>", "", ""],
            ["<p>", "</p>", "", ""],
            ["<div>", "</div>", "\n", ""],
        ];

        const temp = document.createElement("div");
        temp.innerHTML = textarea.innerHTML;

        temp.innerHTML = temp.innerHTML.replace(/<[^/>][^>]*><\/[^>]+>/, "");

        let result = temp.innerHTML;


        for (let j = 0; j < convertTable.length; j++) {
            result = result.replaceAll(convertTable[j][0], convertTable[j][2]).replaceAll(convertTable[j][1], convertTable[j][3]);
        }

        return result;
    }
}

const editor = document.querySelector(".content");
function onselect() {
    const userSelection = window.getSelection();
    const selectedTextRange = userSelection.getRangeAt(0);
    const selectedRect = selectedTextRange.getBoundingClientRect();
    const tooltip = document.querySelector(".tooltip");

    if (window.getSelection().toString()) {
        tooltip.style.top = selectedRect.top + 35 + "px";
        tooltip.style.left = selectedRect.left + "px";
        tooltip.style.display = "flex";
    }
    else {
        tooltip.style.display = "none";
    }
}

editor.onmouseup = onselect;

document.querySelector("#createForm").addEventListener("submit", e => {
    addNote();
    e.preventDefault();
})