const taskManager = new TaskManager(0);
// Load the tasks from localStorage
taskManager.load();
// Render the loaded tasks to the page
taskManager.render();

//Finding and display the date object
const dateElement = document.querySelector("#date-element");
//get the current date from the DateObject
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; // Month from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
let dateString = `Today Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateString;

const form = document.querySelector("#addForm");

form.addEventListener("submit", (event) => {
  const validateName = document.querySelector("#taskname");
  const validateDescription = document.querySelector("#description");
  const validateAssignedTo = document.querySelector("#assignedto");
  const validateDueDate = document.querySelector("#duedate");
  const validateStatus = document.querySelector("#status");
  let validationFail = 0;

  event.preventDefault();

  console.log("Task Name :" + validateName.value.length);
  console.log("Task Description :" + validateDescription.value.length);
  console.log("Task Assigned To :" + validateAssignedTo.value.length);
  console.log("Task Due Date :" + validateDueDate.value);
  console.log("Task Status:" + validateStatus.value);

  // taskDueDate is in yyyy-mm-dd format
  let taskDueDate = validateDueDate.value.split("-");

  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };


  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 5) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 5) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }
  // Form validation for Due Date Field not empty
  // try your own validation for a date in the future

  console.log(
    `taskDueDate[2]:${taskDueDate[2]} day:${day} taskDueDate[1]:${taskDueDate[1]} month:${month} taskDueDate[0]:${taskDueDate[0]} year:${year}`
  );
  if (taskDueDate[0] >= year) {
    if (taskDueDate[1] >= month) {
      if (taskDueDate[2] >= day) {
        validateDueDate.classList.add("is-valid");
        validateDueDate.classList.remove("is-invalid");
      }
      else if (taskDueDate[2] <= day && taskDueDate[1] > month) {

        validateDueDate.classList.add("is-valid");
        validateDueDate.classList.remove("is-invalid");

      }
      else {
        validateDueDate.classList.add("is-invalid");
        validateDueDate.classList.remove("is-valid");
        validationFail++;
      }
    }
    else {
      validateDueDate.classList.add("is-invalid");
      validateDueDate.classList.remove("is-valid");
      validationFail++;
    }
  }
  else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    validationFail++;
  }

  // If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  if (validationFail > 0) {
    validationFail = 0;
    return;
  }
  else {
    // Push the valid input into our tasks array

    console.log("Status :"+validateStatus.value);

    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );

    clearFormFields();
    taskManager.render();
    taskManager.save();

  }

});


//const article = document.querySelector('#task-id');
// The following would also work:
// const article = document.getElementById("electric-cars")

//console.log("ATTRIBUTE :"+article.dataset.validateName); // "3"



const taskList = document.querySelector("#task-list");
// Add an 'onclick' event listener to the Tasks List
taskList.addEventListener("click", (event) => {
  // Check if a "Mark As Done" button was clicked

  if (event.target.classList.contains("done-button")) {
    // Get the correct parent Task, yours might be slightly different
    // Use console.log(event.target.parentElement) to see
   
    const parentTask =
      event.target.parentElement.parentElement.parentElement;

    
    // Get the taskId of the parent Task and turn it into a number.
    const taskId = Number(parentTask.dataset.taskId);
    // Get the task from the TaskManager using the taskId

    const task = taskManager.getTaskById(taskId);
    // Update the task status to 'DONE'
    task.status = "Done";

    // Render the tasks
    taskManager.render();
    //save the tasks
    taskManager.save();
  }
  //Check if the delete button was clicked
  if (event.target.classList.contains("delete-button")) {
    // Get the parent Task
    const parentTask =
      event.target.parentElement.parentElement.parentElement;

    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.dataset.taskId);

    // Delete the task
    taskManager.deleteTask(taskId);
    console.log(taskId);

    // Save the tasks to localStorage
    taskManager.save();

    // Render the tasks
    taskManager.render();
  }
  
});
