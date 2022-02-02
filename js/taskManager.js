const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
    const html = `<li class="card" data-task-id="${id}" style="min-width: 50vw">
  <div class="container h-100" >
    <div class="d-flex w-500 mt-2 justify-content-between align-items-center" >
      <h5 class="card-title"> Name : ${name}</h5>
      <span class="badge badge-info"> Status : ${status}</span>
    </div>
    <p class="card-text">
      Description : ${description}
    </p>
    <div class="d-flex w-100 mb-3 justify-content-between">
    <p class="card-text">AssignedTo : ${assignedTo} To</p>
    <p class="card-text">DueDate : ${dueDate}</p>
    </div>
   
      <div class="card-footer row" >
      <button type= "button" class="btn btn-outline-success done-button" style='margin-right:16px'>
     Done
   </button>
   <button type="button" class="btn btn-outline-danger delete-button" style='margin-right:16px'>
     Delete
     </button>  
      </div>
    
  </div>
  </li>`;
    return html;
  };
  
  class TaskManager {
  
    constructor(currentId = 0) {
      console.log("inside constructor");
      this.tasks = [];
      console.log("TASKS vals :" + this.tasks[1])
      this.currentId = currentId;
  
    }
  
    // Create the addTask method
    addTask(name, description, assignedTo, dueDate, status) {
      // Create a task object that we will push to the list of tasks
      console.log("Before --  Print name : " + name + " \n Print status : " + status)
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
      for (let i = 0; i < this.tasks.length; i++) {
        const id = this.tasks[i];
        console.log(" inside addtask loop " + id.id)
        console.log(" inside addtask loop " + id.name)
      }
      console.log(" After -- Print tasks : " + this.tasks.length);
  
  
  
    }
  
    getTaskById(taskId) {
      // Create a variable to store the found task
      let foundTask;
      console.log("calling get id method" + taskId)
      // Loop over the tasks and find the task with the id passed as a parameter
      for (let i = 0; i < this.tasks.length; i++) {
        console.log("task length is " + this.tasks.length)
        // Get the current task in the loop
        const task = this.tasks[i];
        console.log(" Loop : " + task[i])
        // Check if its the right task by comparing the task's id to the id passed as a parameter
        if (task.id === taskId) {
          console.log("inside if block")
          // Store the task in the foundTask variable
          foundTask = task;
        }
      }
      // Return the found task
      return foundTask;
    }
  
  
  
    render() {
      let tasksHtmlList = [];
      // Loop over our tasks and create the html, storing it in the array
  
      for (let i = 0; i < this.tasks.length; i++) {
        // Get the current task in the loop
        const task = this.tasks[i];
        // Format the date
        console.log("task id is : " + task.name)
        const date = new Date(task.dueDate);
  
        //console.log("date is "+date)
        const formattedDate =
          date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        // Create the task html
        const taskHtml = createTaskHtml(
          task.id,
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
    save() {
        // Create a JSON string of the tasks
        const tasksJson = JSON.stringify(this.tasks);
    
        // Store the JSON string in localStorage
        localStorage.setItem("tasks", tasksJson);
    
        // Convert the currentId to a string;
        const currentId = String(this.currentId);
    
        // Store the currentId in localStorage
        localStorage.setItem("currentId", currentId);
      }
      load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem("tasks")) {
          // Get the JSON string of tasks in localStorage
          const tasksJson = localStorage.getItem("tasks");
    
          // Convert it to an array and store it in our TaskManager
          this.tasks = JSON.parse(tasksJson);
        }
    
        // Check if the currentId is saved in localStorage
        if (localStorage.getItem("currentId")) {
          // Get the currentId string in localStorage
          const currentId = localStorage.getItem("currentId");
    
          // Convert the currentId to a number and store it in our TaskManager
          this.currentId = Number(currentId);
        }
    }   
    deleteTask(taskId) {
        // Create an empty array and store it in a new variable, newTasks
        const newTasks = [];
    
        // Loop over the tasks
        for (let i = 0; i < this.tasks.length; i++) {
          // Get the current task in the loop
          const task = this.tasks[i];
    
          // Check if the task id is not the task id passed in as a parameter
          if (task.id !== taskId) {
            // Push the task to the newTasks array
            newTasks.push(task);
          }
        }
    
        // Set this.tasks to newTasks
        this.tasks = newTasks;
      }
  }
