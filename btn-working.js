document.querySelector('.copy').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.focus();
    }
})

document.querySelector('.cut').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.innerText = '';
        activeCell.focus();
    }
})

document.querySelector('.paste').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.readText().then((text) => {
            formula.value = text;
            activeCell.innerText = text;
        })
    }
    activeCell.focus();
})

function setFont(target) {
    if(activeCell) {
        activeCell.style.fontFamily = target.value;
        activeSheetObject[activeCell.id].fontFamily_data = target.value;
        activeCell.focus();
    }
}

function setSize(target) {
    if(activeCell) {
        activeCell.style.fontSize = target.value + "px";
        activeSheetObject[activeCell.id].fontSize_data = target.value;
        activeCell.focus();
    }
}

boldBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if(activeCell) { //there is focus on a particular cell
        if(activeSheetObject[activeCell.id].isBold) {
            activeCell.style.fontWeight = '400';
        }
        else activeCell.style.fontWeight = '600';

        activeSheetObject[activeCell.id].isBold = !activeSheetObject[activeCell.id].isBold;
        activeCell.focus();
    }
})

italicBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if(activeCell) { //there is focus on a particular cell
        if(activeSheetObject[activeCell.id].isItalic) {
            activeCell.style.fontStyle = 'normal';
        }
        else activeCell.style.fontStyle = 'italic';

        activeSheetObject[activeCell.id].isItalic = !activeSheetObject[activeCell.id].isItalic;
        activeCell.focus();
    }
})

underlineBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    if(activeCell) { //there is focus on a particular cell
        if(activeSheetObject[activeCell.id].isUnderlined) {
            activeCell.style.textDecoration = 'none';
        }
        else activeCell.style.textDecoration = 'underline';

        activeSheetObject[activeCell.id].isUnderlined = !activeSheetObject[activeCell.id].isUnderlined;
        activeCell.focus();
    }
})

// for text alignment
document.querySelectorAll(".alignment").forEach((e) => {
    e.addEventListener('click', (event) => {
        event.stopPropagation();
        if(activeCell) {
            let value = e.className.split(" ")[0];
            // console.log(value);
            activeCell.style.textAlign = value;
            activeSheetObject[activeCell.id].textAlign = value;
            activeCell.focus();
        }
    })
})

function textColor(target) {
    if(activeCell) {
        activeCell.style.color = target.value;
        activeSheetObject[activeCell.id].color = target.value;
        activeCell.focus();
    }
}

function backgroundColor(target) {
    if(activeCell) {
        activeCell.style.backgroundColor = target.value;
        activeSheetObject[activeCell.id].backgroundColor = target.value;
        activeCell.focus();
    }
}

document.querySelectorAll('select,.color-prop>*,.formula-bar').forEach(e => {
    e.addEventListener('click', (event) => event.stopPropagation());
});

downloadBtn.addEventListener("click",(e)=>{
    let jsonData = JSON.stringify(sheetsArray);
    let file = new Blob([jsonData],{type: "application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

openBtn.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData = JSON.parse(fr.result);
            readSheetData.forEach(e => {
                document.querySelector('.new-sheet').click();
                sheetsArray[activeSheetIndex] = e;
                activeSheetObject = e;
                reflectSheetData();
            })
        });
    });
});