const taskManager = new TaskManager(0);

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
    validateStatus.value = "In Progress";
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
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );

    clearFormFields();
    taskManager.render();

  }

});
