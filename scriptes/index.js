//משתנים גלובלים
let arrTable;
let selectedNumber;
let count = 0;
let isDrawButtonClicked = false;
//הפונקציה הראשית
function main() {
  CreateTable();

  let btn = document.querySelector('#btn');
  btn.addEventListener('click', GetRandNumber);
}

main();