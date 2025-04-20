let root = document.getElementById("root");

let boards = document.createElement("div");
boards.setAttribute("class", "boards");
root.appendChild(boards);

let boardArr = ["Todo", "In progress", "Stuck", "Done"];
let statArr = ["Todo", "In progress", "Stuck", "Done"];
let priorArr = ["High", "Medium", "Low"];
let serial = 0;
let AllTaskArr = [[], [], [], []];

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
function addtask() {
  let addTaskButt = document.createElement("button");
  addTaskButt.innerHTML = "+Add task";
  addTaskButt.addEventListener("click", modalVisibility);
  root.appendChild(addTaskButt);
}
function push(e) {
  let id = "";
  serial += 1;

  console.log("push fn working");
  let form = document.getElementById("form");
  let formData = new FormData(form);
  let data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // insert ID
  boardArr.map((e, i) => {
    data.status == e ? (data.id = `${serial}`) : console.log("assigning id");
  });

  // set priotity number to sort
  switch (data.priority) {
    case "High":
      data.priorityNumber = 1;
      break;
    case "Medium":
      data.priorityNumber = 2;
      break;
    case "Low":
      data.priorityNumber = 3;
      break;
  }

  //when call taskmaker fn need to declare which in board going to print task
  let pushingBoardId = "";
  let arrToPrint = [];

  boardArr.map((e, i) => {
    e == data.status
      ? ((pushingContainersId = `taskContainers-${e}`),
        AllTaskArr[i].push(data),
        (AllTaskArr[i] = AllTaskArr[i].sort(
          (a, b) => a.priorityNumber - b.priorityNumber
        )),
        (arrToPrint = AllTaskArr[i]))
      : console.log("push fn working");
  });

  let container = document.getElementById(pushingContainersId);

  container.innerHTML = "";

  arrToPrint.map((task) => {
    taskMaker(task, pushingContainersId);
  });
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
    // console.log("foreach working");
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

  //Submit
  let submitButt = document.createElement("button");
  submitButt.setAttribute("type", "submit");
  submitButt.innerHTML = "Confirm";

  submitButt.addEventListener("click", (e) => {
    console.log("Submit fn is working");
    e.preventDefault();
    push(e);
    modalVisibility();
    form.reset();
  });

  form.appendChild(submitButt);
  modalInner.appendChild(form);
}
function boardMaker(e) {
  let board = document.createElement("div");
  board.setAttribute("class", "board");
  board.id = `board-${e}`;

  // codelines from boardMaker
  board.addEventListener("dragover", (e) => {
    e.preventDefault(); // Needed to allow dropping
  });

  board.addEventListener("drop", (e) => {
    e.preventDefault();

    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    const fromBoard = boardArr.indexOf(data.from);
    const toBoard = boardArr.indexOf(
      e.target.closest(".board").id.replace("board-", "")
    );

    if (fromBoard !== -1 && toBoard !== -1 && fromBoard !== toBoard) {
      // Find and remove task from old board
      const taskIndex = AllTaskArr[fromBoard].findIndex(
        (task) => task.id === data.id
      );
      const [task] = AllTaskArr[fromBoard].splice(taskIndex, 1);

      // Update status and push into new board
      task.status = boardArr[toBoard];
      AllTaskArr[toBoard].push(task);

      // Sort and re-render both boards
      AllTaskArr[toBoard] = AllTaskArr[toBoard].sort(
        (a, b) => a.priorityNumber - b.priorityNumber
      );
      renderBoard(boardArr[fromBoard]);
      renderBoard(boardArr[toBoard]);
    }
  });
  // codelines from boardMaker

  let boardTitle = document.createElement("h2");
  boardTitle.innerHTML = `${e}`;
  board.append(boardTitle);

  let taskContainers = document.createElement("div");
  taskContainers.id = `taskContainers-${e}`;
  board.appendChild(taskContainers);

  boards.appendChild(board);
}
// function taskMaker(task, baordNum) {
function taskMaker(task, containersId) {
  let container = document.getElementById(containersId);
  let taskContainer = document.createElement("div");

  taskContainer.setAttribute("draggable", true);
  taskContainer.dataset.id = task.id;
  taskContainer.dataset.from = task.status;

  taskContainer.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        id: task.id,
        from: task.status,
      })
    );
  });

  taskContainer.className = "task";

  let title = document.createElement("h2");
  title.textContent = `${task.title}`;
  taskContainer.appendChild(title);

  let desc = document.createElement("p");
  desc.innerHTML = `${task.description}`;
  taskContainer.appendChild(desc);

  let prio = document.createElement("p");
  prio.innerHTML = `${task.priority}`;
  taskContainer.appendChild(prio);

  let editButt = document.createElement("button");
  editButt.innerHTML = "Edit";
  taskContainer.appendChild(editButt);

  let deleteButt = document.createElement("button");
  deleteButt.innerHTML = "Delete";
  taskContainer.appendChild(deleteButt);

  container.appendChild(taskContainer);
}
function modalVisibility() {
  let x = document.getElementById("modal");
  x.style.display = getComputedStyle(x).display === "none" ? "flex" : "none";
}
boardArr.map((e) => {
  boardMaker(e);
});

// codes from chatgpt
function renderBoard(status) {
  const i = boardArr.indexOf(status);
  const container = document.getElementById(`taskContainers-${status}`);
  container.innerHTML = "";

  AllTaskArr[i].forEach((task) => {
    taskMaker(task, `taskContainers-${status}`);
  });

  console.log("all task:", AllTaskArr);
}

addtask();
modal();

//-------------DONE-------------
//make priority, status inputs optional - !!! Long coding
//clear form when submit
//card maker
//get data from form and push into different arrays
//filter into board array
//sort by priority
//drag & drop

//-------------TODO-------------
//edit
//delete

//modal close when press outside
//make card looks good, arrangement, edit, delete icon
//background picture

//save on local storage
//save info-s in backend
//responsive css
