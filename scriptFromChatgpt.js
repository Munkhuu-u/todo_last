// Step 1: Enable drop behavior by canceling default dragover blocking
board.addEventListener("dragover", (e) => {
  e.preventDefault(); // Must be called to allow a drop
});

// Step 2: Handle the drop event on a board
board.addEventListener("drop", (e) => {
  e.preventDefault(); // Prevent default browser behavior

  // Step 3: Get the drag data (id and original board) from the event
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));

  // Step 4: Find the index of the board the task came from
  const fromBoard = boardArr.indexOf(data.from);

  // Step 5: Identify which board the task was dropped into:
  // - e.target: the exact element where the drop happened
  // - closest(".board"): finds the closest parent with class "board"
  // - id.replace("board-", ""): removes "board-" prefix to get clean board name
  const toBoard = boardArr.indexOf(
    e.target.closest(".board").id.replace("board-", "")
  );

  // Step 6: Continue only if both boards are valid AND not the same
  if (fromBoard !== -1 && toBoard !== -1 && fromBoard !== toBoard) {
    // Step 7: Locate the task inside the original board's array
    const taskIndex = AllTaskArr[fromBoard].findIndex(
      (task) => task.id === data.id
    );

    // Step 8: Remove the task from the old board's array
    const [task] = AllTaskArr[fromBoard].splice(taskIndex, 1);

    // Step 9: Update the task's status to reflect the new board
    task.status = boardArr[toBoard];

    // Step 10: Add the task to the new board's array
    AllTaskArr[toBoard].push(task);

    // Step 11: Sort the new board's tasks by priority
    AllTaskArr[toBoard] = AllTaskArr[toBoard].sort(
      (a, b) => a.priorityNumber - b.priorityNumber
    );

    // Step 12: Re-render both boards (source and target)
    renderBoard(boardArr[fromBoard]); // Re-render old board
    renderBoard(boardArr[toBoard]); // Re-render new board
  }
});
