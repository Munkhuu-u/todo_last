let root = document.getElementById("root");

let boards = document.createElement("div");
boards.setAttribute("class", "boards");
root.appendChild(boards);

let boardArr = ["Todo", "In progress", "Stuck", "Done"];
let statArr = ["Todo", "In progress", "Stuck", "Done"];
let priorArr = ["High", "Medium", "Low"];
let serial = 0;
let editingTask = null;

let AllTaskArr = [
  [
    {
      description: "sample desc",
      id: "1",
      priority: "Medium",
      priorityNumber: 2,
      status: "Todo",
      title: "sample title",
    },
  ],
  [],
  [],
  [],
];
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
  addTaskButt.addEventListener("click", () => {
    // modal();
    modalVisibility();
  });
  root.appendChild(addTaskButt);
}
function push(e) {
  console.log("push fn working");
  let id = "";
  serial += 1;

  let form = document.getElementById("form");
  let formData = new FormData(form);
  let data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // insert ID
  boardArr.map((boardName, i) => {
    data.status == boardName
      ? (data.id = `${serial}`)
      : console.log("assigning id");
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
  let pushingContainersId = "";
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

  arrToPrint.map((task) => {
    taskMaker(task, pushingContainersId);
  });
}
function submitHandler(e) {
  e.preventDefault();
  if (editingTask) {
    console.log("editing");

    const form = document.getElementById("form");
    const oldStatus = editingTask.status;

    editingTask.title = form.title.value;
    editingTask.description = form.description.value;
    editingTask.status = form.status.value;
    editingTask.priority = form.priority.value;

    // update priority number
    switch (editingTask.priority) {
      case "High":
        editingTask.priorityNumber = 1;
        break;
      case "Medium":
        editingTask.priorityNumber = 2;
        break;
      case "Low":
        editingTask.priorityNumber = 3;
        break;
    }

    // remove from old board
    boardArr.forEach((_, i) => {
      AllTaskArr[i] = AllTaskArr[i].filter((t) => t.id !== editingTask.id);
    });

    // add to new board
    const newIndex = boardArr.indexOf(editingTask.status);
    AllTaskArr[newIndex].push(editingTask);
    AllTaskArr[newIndex].sort((a, b) => a.priorityNumber - b.priorityNumber);

    editingTask = null; // reset
    renderBoard(oldStatus);
    renderBoard(boardArr[newIndex]);
  } else {
    console.log("adding");
    push(e);

    boardArr.forEach((e) => {
      renderBoard(e);
    });
  }
  modalVisibility();
}
function modal() {
  console.log("modal fn is running");
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
  modalInner.appendChild(form);

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
  submitButt.id = "submit-btn";

  submitButt.addEventListener("click", (e) => {
    submitHandler(e);
    form.reset();
  });
  form.appendChild(submitButt);
  modalInner.appendChild(form);
}
function boardMaker(e) {
  let board = document.createElement("div");
  board.setAttribute("class", "board");
  board.id = `board-${e}`;

  let boardTitle = document.createElement("h2");
  boardTitle.innerHTML = `${e}`;
  board.append(boardTitle);

  let taskContainers = document.createElement("div");
  taskContainers.id = `taskContainers-${e}`;
  board.appendChild(taskContainers);

  boards.appendChild(board);

  // drag & drop
  board.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  board.addEventListener("drop", (e) => {
    e.preventDefault;
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    // geting status and finding related index of boardArr and assigning into fromBoard
    const fromBoard = boardArr.indexOf(data.from);

    const toBoard = boardArr.indexOf(
      e.target.closest(".board").id.replace("board-", "")
    );

    if (fromBoard !== -1 && toBoard !== -1 && fromBoard !== toBoard) {
      const taskIndex = AllTaskArr[fromBoard].findIndex(
        (task) => task.id === data.id
      );

      const [task] = AllTaskArr[fromBoard].splice(taskIndex, 1);
      task.status = boardArr[toBoard];
      AllTaskArr[toBoard].push(task);
      AllTaskArr[toBoard] = AllTaskArr[toBoard].sort(
        (a, b) => a.priorityNumber - b.priorityNumber
      );
      renderBoard(boardArr[fromBoard]);
      renderBoard(boardArr[toBoard]);
    }
  });
}
function taskMaker(task, containersId) {
  let container = document.getElementById(containersId);
  let taskContainer = document.createElement("div");
  taskContainer.className = "task";

  // drag & drop
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
  // drag & drop

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
  editButt.addEventListener("click", () => {
    editFn(task);
  });

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
function renderBoard(status) {
  const i = boardArr.indexOf(status);
  const container = document.getElementById(`taskContainers-${status}`);
  container.innerHTML = "";

  AllTaskArr[i].forEach((task) => {
    taskMaker(task, `taskContainers-${status}`);
  });
}
function editFn(task) {
  editingTask = task;
  modalVisibility();

  let tempForm = document.getElementById("form");

  tempForm.title.value = task.title;
  tempForm.desc.value = task.description;
  tempForm.status.value = task.status;
  tempForm.priority.value = task.priority;

  document.getElementById("submit-btn").textContent = "Save changes";
}

addtask();
modal();
renderBoard("Todo");

//-------------DONE-------------
//make priority, status inputs optional - !!! Long coding
//clear form when submit
//card maker
//get data from form and push into different arrays
//filter into board array
//sort by priority
//drag & drop
//edit

//-------------TODO-------------
//delete
//modal close when press outside
//make card looks good, arrangement, edit, delete icon
//background picture

//save on local storage
//save info-s in backend
//responsive css
