
//פונקציה שמגרילה את המספרים
function funcNumberRnd() {
  const Max = 100, Min = 1;
  let num = parseInt(Math.random() * (Max - Min) + Min);
  return num;
}
//פונקציה שמציגה את המספרים לפי הכפתור ההגרלה
function GetRandNumber(event) {
  let arrTable = funcArr();
  let isNumberValid = false;
  
  if (!isDrawButtonClicked) {
    isDrawButtonClicked = true;
  }
  
  do {
    selectedNumber = funcNumberRnd();
    isNumberValid = funcCheckNumber(selectedNumber, arrTable);
  } while (!isNumberValid);
  
  let numbersDiv = document.querySelector('#numbers');
  numbersDiv.innerHTML += ' ' +selectedNumber;
  
  let markedCells = document.querySelectorAll('.marked');
  let totalCells = arrTable.length * arrTable[0].length;
  
  if (markedCells.length === totalCells) {
    alert('Congratulations! You won!');
    location.reload();
    return;
  }
  
  let isAnyNumberValid = false;
  for (let i = 0; i < arrTable.length; i++) {
    if (arrTable[i].some((num) => num !== 'X')) {
      isAnyNumberValid = true;
      break;
    }
  }
  
  if (!isAnyNumberValid) {
    alert('Game over. You lost!');
    location.reload();
    return;
  }
}
//פונקציה שיוצרת מערך
function funcArr() {
  let arr = new Array(7);
  
  //קליטה של המספרים למערך דו ממדי
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(7);
    for (let j = 0; j < arr[i].length; j++) {
      let n;
      do {
        n = funcNumberRnd();
      } while (funcCheckNumber(n, arr));
      arr[i][j] = n;
    }
  }
  
  return arr;
}
//פונקציה שבודקת את המספרים 
function funcCheckNumber(n, arr) {
  for (let a = 0; a < arr.length; a++) {
    for (let b = 0; arr[a] && b < arr[a].length; b++) {
      if (arr[a][b] != undefined && n == arr[a][b]) {
        return true;
      }
    }
  }
  return false;
}
//פונקציה שיוצרת את הטבלה לפי המערך הדו ממדי
function CreateTable() {
  let div = document.querySelector('#div');
  let table = document.createElement('table');
  table.id = "bingoTable";
  arrTable = funcArr();
  
  for (let c = 0; c < arrTable.length; c++) {
    let tr = document.createElement('tr');
    for (let d = 0; d < arrTable[0].length; d++) {
      let td = document.createElement('td');
      td.dataset.row = c;
      td.dataset.col = d;
      td.addEventListener('click', CellMarking);
      td.innerHTML = arrTable[c][d];
      tr.append(td);
    }
    table.append(tr);
  }
  div.append(table);
}
//פונקציה שמסמנת את התאים לפי המספר שהוגרל
function CellMarking(event) {
  if (!isDrawButtonClicked) {
    return;
  }
  
  let element = event.target;
  let current = parseInt(element.innerHTML);
  let isNumberValid = current === selectedNumber;
  
  if (isNumberValid) {
    element.classList.add('marked');
    element.innerHTML = 'X';
    element.style.backgroundColor = '#ED5454';
    arrTable.forEach((row) => {
      row.forEach((num, index) => {
        if (num === current) {
          row[index] = 'X';
        }
      });
    });
    checkWin();
  } else {
    count++;
    alert(` המספר שלחצחת עליו הוא טעות !`);
    if (count === 1) {
      let icon1 = document.querySelector('#icon1');
      icon1.style.visibility = 'hidden';
    } else if (count === 2) {
      let icon2 = document.querySelector('#icon2');
      icon2.style.visibility = 'hidden';
    } else if (count === 3) {
      let icon3 = document.querySelector('#icon3');
      icon3.style.visibility = 'hidden';
      alert('נפסלת! החל מחדש.');
      location.reload();
    }
  }
}
//פונקציה שבודקת אם יש לך ניצחון בשורה או טור
function checkWin() {
  const size = arrTable.length;

  // בדיקת ניצחון בשורה
  for (let row = 0; row < size; row++) {
    let isWin = true;
    for (let col = 0; col < size; col++) {
      if (arrTable[row][col] !== 'X') {
        isWin = false;
        break;
      }
    }
    if (isWin) {
      alert(`ניצחת כל הכבוד אלוף`);
      return;
    }
  }

  // בדיקת ניצחון בטור
  for (let col = 0; col < size; col++) {
    let isWin = true;
    for (let row = 0; row < size; row++) {
      if (arrTable[row][col] !== 'X') {
        isWin = false;
        break;
      }
    }
    if (isWin) {
      alert(`ניצחת כל הכבוד אלוף`);
      location.reload();
      return;
    }
  }
}
