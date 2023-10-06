let footer = document.querySelector('.footer');

// sheetsArray.push()

function createNewSheet() {
    if(activeSheetIndex != -1) {
        let activeSheet = document.getElementById(`s${activeSheetIndex + 1}`);
        activeSheet.classList.remove('sheet-active');
    }

    let newSheetStateObject = {};
    for( let i=1; i <= 100; i++) {
        for(let j = 65; j <= 90; j++) {
            // take key value as the id of each cell
            let key = String.fromCharCode(j) + i;
            newSheetStateObject[key] = {...initialSheetState};
        }
    }
    sheetsArray.push(newSheetStateObject);
    let n = sheetsArray.length;
    activeSheetIndex = n - 1;
    activeSheetObject = sheetsArray[activeSheetIndex];
    reflectSheetData();
    // create multiple sheet navigation buttons
    let sheetNo = document.createElement('div');
    sheetNo.className = "sheet-no";
    sheetNo.id = "s" + n;
    sheetNo.innerText = "Sheet " + n;
    // sheetNo.innerHTML = `
    //     Sheet ${n}
    //     // <span class="material-icons delete">
    //     //     delete
    //     // </span>
    // `;
    sheetNo.classList.add('sheet-active');
    sheetNo.addEventListener('click', (event) => {
        let activeSheet = document.getElementById(`s${activeSheetIndex + 1}`);
        activeSheet.classList.remove('sheet-active');
        event.target.classList.add('sheet-active');
        activeSheetIndex = Number(event.target.id.slice(1)) - 1;
        activeSheetObject = sheetsArray[activeSheetIndex];
        reflectSheetData();
    })
    footer.append(sheetNo);
    // sheetNo.querySelector('.delete').addEventListener('click', (event) => {
    //     event.stopPropagation();
    //     // let deleteElementsArray = document.querySelectorAll('.delete');
    //     // deleteElementsArray[deleteElementsArray.length - 1].parentNode.remove();
    //     event.target.parentNode.remove();
    //     // sheetsArray.splice(n-1, 1, []);
    // })
}

function reflectSheetData() {
    for(let key in activeSheetObject) {
        let cell = document.getElementById(key);
        cell.innerText = activeSheetObject[key].content;
        cell.style.fontFamily = activeSheetObject[key].fontFamily_data;
        cell.style.fontSize = activeSheetObject[key].fontSize_data + "px";
        cell.style.fontWeight = activeSheetObject[key].isBold ? '600' : '400';
        cell.style.fontStyle = activeSheetObject[key].isItalic ? 'italic' : 'normal';
        cell.style.textAlign = activeSheetObject[key].textAlign;
        cell.style.textDecoration = activeSheetObject[key].isUnderlined ? 'underline' : 'none';
        cell.style.color = activeSheetObject[key].color;
        cell.style.backgroundColor = activeSheetObject[key].backgroundColor;
    }
    resetFunctionality();
}

function resetFunctionality() {
    if(activeCell) {
        activeCell.blur();
    }
    activeCell = false;
    
    let activeBg = '#c9c8c8';
    let inactiveBg = '#ecf0f1';
    fontFamilyBtn.value = initialSheetState.fontFamily_data;
    fontSizeBtn.value = initialSheetState.fontSize_data;
    boldBtn.style.backgroundColor = inactiveBg;
    italicBtn.style.backgroundColor = inactiveBg;
    underlineBtn.style.backgroundColor = inactiveBg;
    setAlignmentBg(false, activeBg, inactiveBg);
    colorBtn.value = initialSheetState.color;
    bgColorBtn.value = initialSheetState.backgroundColor;
    formula.value = '';
    addressBar.innerHTML = 'Null';
}

function setAlignmentBg(key, activeBg, inactiveBg){
    leftBtn.style.backgroundColor = inactiveBg;
    centerBtn.style.backgroundColor = inactiveBg;
    rightBtn.style.backgroundColor = inactiveBg;
    // key is the id of cell
    // by " '.'+ activeSheetObject[key].textAlign" in querySelector , we write className which is either "start", "center" or "end" (refer to html => line 52 onwards)
    // then we chnage the css to the specified class
    // if key is false; then by default make text-align to left => leftBtn's background should be activeBg
    if(key){
        document.querySelector('.'+ activeSheetObject[key].textAlign).style.backgroundColor = activeBg;
    }
    else{
        leftBtn.style.backgroundColor = activeBg;
    }
}

createNewSheet();

document.querySelector('body').addEventListener('click', resetFunctionality);