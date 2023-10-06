// create an initial state 
const initialSheetState = {
    fontFamily_data: 'monospace',
    fontSize_data: '14',
    isBold: false,
    isItalic: false,
    textAlign: 'start',
    isUnderlined: false,
    color: '#000000',
    backgroundColor: '#ffffff',
    content: ''
}

// create array of sheets
let sheetsArray = [];

// create object of active sheet
let activeSheetIndex = -1;

let activeSheetObject = false;

let activeCell = false;

let fontFamilyBtn = document.querySelector('.font-family');
let fontSizeBtn = document.querySelector('.font-size');
let boldBtn = document.querySelector('.bold');
let italicBtn = document.querySelector('.italic');
let underlineBtn = document.querySelector('.underline');
let leftBtn = document.querySelector('.start');
let centerBtn = document.querySelector('.center');
let rightBtn = document.querySelector('.end');
let colorBtn = document.querySelector('#color');
let bgColorBtn = document.querySelector('#bgcolor');
let formula = document.querySelector('.formula-bar');
let addressBar = document.querySelector('.address-bar');

let deleteSheet = document.querySelector('.delete');

let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

const  header = document.getElementById("header");

// String.fromCharCode(65)
// takes the number as ASCII code and generate respective character

for(let i = 65; i <= 90; i++) {
    let cell = document.createElement('div');
    cell.classList.add('header-cell');
    cell.id = String.fromCharCode(i);
    cell.innerText = String.fromCharCode(i);

    header.append(cell);
}

// inside each row we should create 27 cells -- one for S.no

let grid = document.querySelector(".main-grid");

for( let i=1; i <= 100; i++) {
    let row = document.createElement('div');
    row.className = "row";
    
    let cell = document.createElement('div');
    cell.className ="cell";

    cell.innerText = i;
    cell.id = i;
    row.append(cell);

    for(let j = 65; j <= 90; j++) {
        let data = document.createElement('div');
        data.className = "cell";
        data.id = String.fromCharCode(j) + i;
        data.contentEditable = true;
        data.addEventListener('click', (event) => event.stopPropagation());
        data.addEventListener('focus', (event) => {
            activeCell = data;
            addressBar.innerText = data.id;

            let activeBg = '#c9c8c8';
            let inactiveBg = '#ecf0f1';

            let key = data.id;
            fontFamilyBtn.value = activeSheetObject[key].fontFamily_data;
            fontSizeBtn.value = activeSheetObject[key].fontSize_data;
            boldBtn.style.backgroundColor = activeSheetObject[key].isBold ? activeBg : inactiveBg;
            italicBtn.style.backgroundColor = activeSheetObject[key].isItalic ? activeBg : inactiveBg;
            underlineBtn.style.backgroundColor = activeSheetObject[key].isUnderlined ? activeBg : inactiveBg;
            setAlignmentBg(key, activeBg, inactiveBg);
            colorBtn.value = activeSheetObject[key].color;
            bgColorBtn.value = activeSheetObject[key].backgroundColor;

            // let formula = document.querySelector('.formula-bar');
            formula.value = activeCell.innerText;

            document.getElementById(event.target.id.slice(0,1)).classList.add("row-col-highlight");
            document.getElementById(event.target.id.slice(1)).classList.add("row-col-highlight");
        })
        data.addEventListener('focusout', (event) => {
            // formula.value = "";
            document.getElementById(event.target.id.slice(0,1)).classList.remove("row-col-highlight");
            document.getElementById(event.target.id.slice(1)).classList.remove("row-col-highlight");
        })
        data.addEventListener('input', () => {
            formula.value = data.innerText;
            activeSheetObject[data.id].content = data.innerText;
        })
        row.append(data);
    }
    grid.append(row);
}

formula.addEventListener('input', () => {
    activeCell.innerText = formula.value;
    activeSheetObject[activeCell.id].content = formula.value;
})