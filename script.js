const addBtn = document.getElementById("addBtn");
const addInput = document.getElementById("addInput");
const listContainer = document.getElementById("list-container");
const progressbar = document.querySelector("progress");
var todo = JSON.parse(localStorage.getItem("todo")) || [];

addBtn.addEventListener("click", addItems);

function itemsCounter() {
  var total = todo.length;
  var completed = todo.filter((item) => item.isCompleted).length;
  document.querySelector(".box-right").innerHTML = completed + "/" + total;
  progressbar.setAttribute("value", completed);
  progressbar.setAttribute("max", total);
  if (completed === total && total > 0) {
    document.querySelector(".completed").style.opacity = "1";
  } else if (completed === 0) {
    document.querySelector(".completed").style.opacity = "0";
  }
}
function displayItems() {
  listContainer.innerHTML = "";
  if (todo.length > 0) {
    todo.forEach((element) => {
      listContainer.insertAdjacentHTML(
        "afterbegin",
        "<li class='list-item-wrapper'></li>"
      );
      const itemWrapper = document.querySelector(".list-item-wrapper");
      itemWrapper.insertAdjacentHTML(
        "afterbegin",
        `<div class="list-item" data-isCompleted=${element.isCompleted}>${element.name}</div>`
      );
      itemWrapper.insertAdjacentHTML(
        "beforeend",
        `<i class="delete-btn fa-solid fa-trash"></i>`
      );
    });
  }
  itemsCounter();
  saveToLocalStorage();
}

function addItems() {
  let value = addInput.value;
  if (value != "") {
    todo.push({ name: value, isCompleted: false });
    addInput.value = "";
  } else {
    document
      .querySelector(".input-wrapper")
      .insertAdjacentHTML(
        "afterend",
        "<p class='error' style='color: red'>Item cannot be empty!</p>"
      );
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 2000);
  }
  displayItems();
}

function markItems(element) {
  todo = todo.map((item) =>
    item.name === element.innerText
      ? { ...item, isCompleted: !item.isCompleted }
      : item
  );
}
function deleteItems(element) {
  var target = element.previousElementSibling.innerText;
  todo = todo.filter((item) => item.name !== target);
}
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

listContainer.addEventListener("click", (e) => {
  var targetElement = e.target;
  if (targetElement.tagName === "DIV") {
    markItems(targetElement);
  } else if (targetElement.tagName === "I") {
    deleteItems(targetElement);
  }
  displayItems();
});
document.onload = displayItems();
