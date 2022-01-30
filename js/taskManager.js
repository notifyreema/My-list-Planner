const createTaskHtml = (name, description, assignedTo, dueDate, status) => {
  const html = `<li class="list-group-item">
  <div class="d-flex w-500 mt-2 justify-content-between align-items-center">
    <h5 class="card-title"> Name : ${name}</h5>
    <span class="badge badge-info"> ${status}</span>
    </div>
    <div class="d-flex w-100 mb-3 justify-content-between">
    <small>AssignedTo : ${assignedTo}</small>
    <small>DueDate : ${dueDate}</small>
  </div>
    <p class="card-text">
      Description : ${description}
    </p>
   
    <p>
    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal"
    data-target="#editForm">EDIT</button>
  <button class="delete btn btn-danger btn-sm" name="delete">DELETE</button>
</p>
</li>`;
  return html;
};

class TaskManager {

  constructor(currentId = 0) {
    console.log("inside constructor");
    this.tasks = [];
    this.currentId = currentId;
  }

  // Create the addTask method
  addTask(name, description, assignedTo, dueDate, status) {
    // Create a task object that we will push to the list of tasks

    const task = {

      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);

  }

  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array

    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date

      const date = new Date(task.dueDate);

      //console.log("date is "+date)
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );

      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);

    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;


  }




}
