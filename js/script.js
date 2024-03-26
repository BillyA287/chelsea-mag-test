// Initialize an empty array to store tasks
let tasks = [];

// Function to show custom dialog box with message
function showDialog(message) {
    const dialogBox = document.getElementById("custom-dialog");
    const dialogMessage = document.getElementById("dialog-message");

    dialogMessage.textContent = message;
    dialogBox.style.display = "block";

    // Set a timeout to hide the dialog box after 5 seconds
    setTimeout(function() {
        dialogBox.style.opacity = "0";
        setTimeout(function() {
            dialogBox.style.display = "none";
            dialogBox.style.opacity = "1"; // Reset opacity for future uses
        }, 500); // Fade out duration (milliseconds)
    }, 5000); // Delay before hiding (milliseconds)
}

// Event listener for OK button in custom dialog box
document.getElementById("dialog-ok").addEventListener("click", function() {
    document.getElementById("custom-dialog").style.display = "none";
});

// Event listener for form submission
document.querySelector(".todo-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get input value
    let input = document.getElementById("add-item");
    let taskText = input.value.trim(); // Trim to remove leading/trailing whitespace
    
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false }); // Add task to array with completed flag
        input.value = ""; // Clear input field
        
        displayTasks(); // Display tasks
        showDialog('Task added!');
    } else {
        showDialog('Cannot submit without text');
    }
});

// Function to display tasks in the unordered list
function displayTasks() {
    let list = document.getElementById("todo-list");
    list.innerHTML = ""; // Clear existing list
    
    tasks.forEach(function(task, index) {
        let listItem = document.createElement("li");
        
        // Add or remove completed class based on task completion status
        if (task.completed) {
            listItem.classList.add("completed");
        } else {
            listItem.classList.remove("completed");
        }

        // Create checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed; // Set checked property based on task's completed status
        checkbox.classList.add("task-checkbox"); // Add class to checkbox
        checkbox.addEventListener("change", function() {
            task.completed = !task.completed; // Toggle completed state
            updateTaskDisplay(); // Update task display
        });
        
        // Create task text
        let taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text"); // Add class to task text

        // Create remove button with SVG
        let removeButton = document.createElement("button");
        let removeIcon = document.createElement("img");
        removeIcon.src = "./delete.svg"; // 
        removeIcon.alt = "Remove";
        removeButton.appendChild(removeIcon);
        removeButton.classList.add('remove-btn'); 
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
