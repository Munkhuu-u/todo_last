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
];

let statArr = ["Todo", "In progress", "Stuck", "Done"];
let priorArr = ["High", "Medium", "Low"];

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

  //Status
  let inputControl = document.createElement("div");
  inputControl.setAttribute("class", "inputControl");

  let label = document.createElement("label");
  label.for = "status";
  label.textContent = "Status";

  let select = document.createElement("select");
  select.form = "form";
  select.id = "status";
  select.name = "status";

  statArr.forEach((e) => {
    console.log("foreach working");
    let option = document.createElement("option");
    option.value = e; // Set option value
    option.textContent = e; // Set visible text
    select.appendChild(option); // Add option to select dropdown
  });

  inputControl.appendChild(label);
  inputControl.appendChild(select);
  form.appendChild(inputControl);

  //Priority
  let inputControlP = document.createElement("div");
  inputControlP.setAttribute("class", "inputControl");

  let labelP = document.createElement("label");
  labelP.for = "priority";
  labelP.textContent = "Priority";

  let selectP = document.createElement("select");
  selectP.form = "form";
  selectP.id = "priority";
  selectP.name = "priority";

  priorArr.forEach((e) => {
    const option = document.createElement("option");
    option.value = e; // Set option value
    option.textContent = e; // Set visible text
    selectP.appendChild(option); // Add option to select dropdown
  });

  inputControlP.appendChild(labelP);
  inputControlP.appendChild(selectP);
  form.appendChild(inputControlP);

  //labelFor :
  //labelInnerHTML
  //selectId:
  //selectname:
  //optionValue:
  //optionInnerHTML:

  //Submit
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

//-------------DONE-------------
//make priority, status inputs optional - !!! Long

//-------------TODO-------------
//clear form when submit
//get data from form and push into an arr
//filter into board array
//make card
//drag & drop
//edit
//delete
//save on local storage
//
