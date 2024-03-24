  
  // Event listener for form submission
  document.querySelector(".todo-form").addEventListener("submit", addTask);
  
  // Initialize an empty array to store tasks
  let tasks = [];

  // Function to add a task to the array and display it
  function addTask(event) {
      event.preventDefault(); // Prevent form submission
      
      // Get input value
      let input = document.getElementById("add-item");
      let taskText = input.value.trim(); // Trim to remove leading/trailing whitespace
      
      if (taskText !== "") {
          tasks.push({ text: taskText, completed: false }); // Add task to array with completed flag
          input.value = ""; // Clear input field
          
          displayTasks(); // Display tasks
      }
  }
  
  // Function to display tasks in the unordered list
  function displayTasks() {
      let list = document.getElementById("todo-list");
      list.innerHTML = ""; // Clear existing list
      
      tasks.forEach(function(task, index) {
          let listItem = document.createElement("li");
          
          // Create checkbox
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = task.completed;
          checkbox.addEventListener("change", function() {
              task.completed = !task.completed; // Toggle completed state
              updateTaskDisplay(); // Update task display
          });
          
          // Create task text
          let taskText = document.createElement("span");
          taskText.textContent = task.text;
          
          // Apply completed class if task is completed
          if (task.completed) {
              taskText.classList.add("completed");
          }
          
          // Create remove button
          let removeButton = document.createElement("button");
          removeButton.textContent = "Remove";
          removeButton.addEventListener("click", function() {
              tasks.splice(index, 1); // Remove task from array
              displayTasks(); // Update displayed list
          });
          
          // Append checkbox, task text, and remove button to list item
          listItem.append(checkbox, taskText, removeButton);
          
          list.appendChild(listItem); // Add list item to list
      });
  }
  
  // Function to update task display (e.g., after checkbox change)
  function updateTaskDisplay() {
      displayTasks(); // Simply re-display tasks
  }
  
