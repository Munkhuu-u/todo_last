let root = document.getElementById("root");

let boards = document.createElement("div");
boards.setAttribute("class", "boards");
root.appendChild(boards);

let boardArr = ["Todo", "In progress", "Stuck", "Done"];

let inputField = [
  {
    labelFor: "title",
    labelHTML: "Title",
    inputName: "title",
    inputId: "title",
    inputType: "text",
  },
  {
    labelFor: "desc",
    labelHTML: "Description",
    inputName: "description",
    inputId: "desc",
    inputType: "text",
  },
  {
    labelFor: "status",
    labelHTML: "Status",
    inputName: "status",
    inputId: "status",
    inputType: "text",
  },
  {
    labelFor: "priotity",
    labelHTML: "Priority",
    inputName: "priotity",
    inputId: "priotity",
    inputType: "text",
  },
];

let taskArr = [];

function addtask() {
  let addTaskButt = document.createElement("button");
  addTaskButt.innerHTML = "+Add task";
  addTaskButt.addEventListener("click", modalVisibility);
  root.appendChild(addTaskButt);
}
function push(e) {
  let form = document.getElementById("form");
  let formData = new FormData(form);
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  taskArr.push(data);
  console.log("taskArr: ", taskArr);
}

function modal() {
  let modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  root.appendChild(modal);

  let modalInner = document.createElement("div");
  modalInner.setAttribute("id", "modalInner");
  modal.appendChild(modalInner);

  let modalTitle = document.createElement("h3");
  modalTitle.innerHTML = "New task info";
  modalInner.appendChild(modalTitle);

  let form = document.createElement("form");
  form.setAttribute("id", "form");

  inputField.map((e) => {
    let inputControl = document.createElement("div");
    inputControl.setAttribute("class", "inputControl");

    let label = document.createElement("label");
    label.setAttribute("for", `${e.labelFor}`);
    label.innerHTML = `${e.labelHTML}`;
    inputControl.appendChild(label);

    let input = document.createElement("input");
    input.setAttribute("id", `${e.inputId}`);
    input.setAttribute("name", `${e.inputName}`);
    input.setAttribute("type", `${e.inputType}`);
    inputControl.appendChild(input);

    form.appendChild(inputControl);
  });

  let submitButt = document.createElement("button");
  submitButt.setAttribute("type", "submit");
  submitButt.innerHTML = "Confirm";
  submitButt.addEventListener("click", (e) => {
    e.preventDefault();
    push(e);
    modalVisibility();
  });
  form.appendChild(submitButt);
  modalInner.appendChild(form);
}
function boardMaker(e) {
  let board = document.createElement("div");
  board.setAttribute("class", "board");
  boards.appendChild(board);

  let boardTitle = document.createElement("h2");
  boardTitle.innerHTML = `${e}`;
  board.append(boardTitle);
}
function modalVisibility() {
  let x = document.getElementById("modal");
  x.style.display = getComputedStyle(x).display === "none" ? "flex" : "none";
}
boardArr.map((e) => {
  boardMaker(e);
});

addtask();
modal();

//make priority, status inputs optional
