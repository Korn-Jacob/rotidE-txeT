let text = document.getElementById("text");
let mode = document.getElementById("backwards-mode");

document.addEventListener("keydown", (e) => {
    switch (mode.value) {
        case "Normal":
            typeBackwardsNormal(e);
            break;
        case "Words":
            typeBackwardsWords(e);
            break;
        case "Backwards characters":
            typeBackwardsCharacters(e);
            break;
            

    }
});

function typeBackwardsNormal(e) {
    if (e.key.length === 1) {
        // this moves the cursor to the front. why? i don't know. it just works.
        text.childNodes[0].data = text.childNodes[0].data
    }
    if (e.key === "Backspace") {
        if (e.ctrlKey) {
            last = text.childNodes[0].data.charAt(0);
            text.childNodes[0].data = text.childNodes[0].data.substring(1);   
            while (last.trim()) {
                last = text.childNodes[0].data.charAt(0);
                text.childNodes[0].data = text.childNodes[0].data.substring(1);   
            }
        }
        else text.childNodes[0].data = text.childNodes[0].data.substring(1);
    }
}

function typeBackwardsWords(e) {
    if (e.key === " ") {
        text.childNodes[0].data = text.childNodes[0].data
    }

    if (e.key === "Backspace") {
        if (cursor_position() <= 1) {
            window.getSelection().setPosition(text.childNodes[0], text.childNodes[0].data.indexOf(" ") !== -1 ? text.childNodes[0].data.indexOf(" ") : text.childNodes[0].data.length);
        }
    }
}

function typeBackwardsCharacters(e) {
    typeBackwardsNormal(e);
    text.childNodes[0].data = (backwardsMapping[text.childNodes[0].data.charAt(0)] || text.childNodes[0].data.charAt(0)) + text.childNodes[0].data.substring(1);
}

let backwardsMapping = {
    "a": "ɒ",
    "b": "d",
    "c": "ɔ",
    "d": "b",
    "e": "ɘ",
    "f": "ʇ",
    "g": "ϱ",
    "h": "⑁",
    "j": "ᒑ",
    "k": "ʞ",
    "p": "q",
    "q": "p",
    "r": "ɿ",
    "s": "ƨ",
    "t": "ɟ",
    "y": "γ",
    "B": "ᗺ",
    "C": "Ɔ",
    "D": "ᗡ",
    "E": "Ǝ",
    "F": "ꟻ",
    "G": "ວ",
    "J": "ᒐ",
    "K": "ꓘ",
    "L": "⅃",
    "N": "И",
    "O": "ᑫ",
    "Q": "Ϙ",
    "R": "Я",
    "S": "Ƨ"
}

// thank you stackoverflow, since finding caret position is apparently a really complicated thing to do
function cursor_position() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "word");
    var pos = sel.toString().length;
    if(sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
}