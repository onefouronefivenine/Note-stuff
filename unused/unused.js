function getCursorPos(input) {
    if ("selectionStart" in input && document.activeElement == input) {
        return {
            start: input.selectionStart,
            end: input.selectionEnd
        };
    }
    else if (input.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === input) {
            var rng = input.createTextRange();
            rng.moveToBookmark(sel.getBookmark());
            for (var len = 0;
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                len++;
            }
            rng.setEndPoint("StartToStart", input.createTextRange());
            for (var pos = { start: 0, end: len };
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                pos.start++;
                pos.end++;
            }
            return pos;
        }
    }
    return -1;
}

const noteContent = document.querySelector(".content");
const invisibleTextarea = document.createElement("input");
const cursor = document.createElement("span");
cursor.classList.add("cursor");
cursor.innerHTML = "&nbsp;";

document.querySelector("#dick").append(invisibleTextarea);
invisibleTextarea.style = "opacity: 0; width: 0; height: 0; margin: 0; padding: 0;";

const innerText = [];
let lineIndex = 0;

const lineElement = document.createElement("span");
lineElement.classList.add("line");
innerText.splice(lineIndex, 0, lineElement);
noteContent.appendChild(lineElement);

noteContent.addEventListener("click", e => {
    invisibleTextarea.focus();
    cursor.style.display = "inline-block";
})

function updateText()
{
    const cursorPos = getCursorPos(invisibleTextarea);
    const txt1 = invisibleTextarea.value.substring(0, cursorPos.end);
    const txt2 = invisibleTextarea.value.substring(cursorPos.end);
    innerText[lineIndex].innerHTML = "";
    innerText[lineIndex].appendChild(document.createTextNode(txt1));
    innerText[lineIndex].appendChild(cursor);
    innerText[lineIndex].appendChild(document.createTextNode(txt2));
}

function updateCursor()
{
    const cursorPos = getCursorPos(invisibleTextarea);
    const txt1 = innerText[lineIndex].innerText.substring(0, cursorPos.end);
    const txt2 = innerText[lineIndex].innerText.substring(cursorPos.end);
    innerText[lineIndex].innerHTML = "";
    innerText[lineIndex].appendChild(document.createTextNode(txt1));
    innerText[lineIndex].appendChild(cursor);
    innerText[lineIndex].appendChild(document.createTextNode(txt2));
}

invisibleTextarea.addEventListener("keydown", e => {
    if(e.key == "Enter")
    {
        e.preventDefault();
        invisibleTextarea.value = "";
        const lineElement = document.createElement("span");
        lineElement.classList.add("line");
        
        innerText.splice(lineIndex + 1, 0, lineElement);
        noteContent.appendChild(lineElement);
        lineElement.innerHTML = "<br>";

        lineIndex++;
    }
    else if (e.key == "ArrowUp")
    {
        if (lineIndex > 0)
        {
            e.preventDefault();

            lineIndex--;
        }
    }
    else if (e.key == "ArrowDown")
    {
        if (lineIndex < innerText.length - 1)
        {
            e.preventDefault();
            
            lineIndex++;
        }
    }

    updateCursor();
})

invisibleTextarea.addEventListener("keyup", e => {
    updateText();
})

invisibleTextarea.addEventListener("input", e => {
    updateText();
})