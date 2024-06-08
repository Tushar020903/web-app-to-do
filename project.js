document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
  
    var addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", addTask);
  });
  
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var prioritySelect = document.getElementById("prioritySelect");
    var statusSelect = document.getElementById("statusSelect");
    var taskList = document.getElementById("taskList");
  
    if (taskInput.value.trim() !== "") {
      var li = document.createElement("li");
      
      var span = document.createElement("span");
      span.textContent = taskInput.value;
      span.classList.add("task-content");
      span.addEventListener("click", function() {
        editTask(span);
      });
      li.appendChild(span);
  
      var prioritySelectClone = prioritySelect.cloneNode(true);
      prioritySelectClone.value = prioritySelect.value;
      prioritySelectClone.addEventListener("change", function() {
        saveTasks();
      });
      li.appendChild(prioritySelectClone);
  
      var statusSelectClone = statusSelect.cloneNode(true);
      statusSelectClone.value = statusSelect.value;
      statusSelectClone.addEventListener("change", function() {
        li.classList.toggle("completed", statusSelectClone.value === "completed");
        saveTasks();
      });
      li.appendChild(statusSelectClone);
  
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", function() {
        deleteTask(li);
      });
      li.appendChild(deleteBtn);
  
      li.classList.toggle("completed", statusSelect.value === "completed");
      taskList.appendChild(li);
      saveTasks();
      taskInput.value = "";
      prioritySelect.value = "low";
      statusSelect.value = "pending";
    }
  }
  
  function editTask(taskSpan) {
    var newText = prompt("Edit task:", taskSpan.textContent);
    if (newText !== null) {
      taskSpan.textContent = newText;
      saveTasks();
    }
  }
  
  function deleteTask(taskItem) {
    if (confirm("Are you sure you want to delete this task?")) {
      taskItem.remove();
      saveTasks();
    }
  }
  
  function saveTasks() {
    var tasks = [];
    var taskList = document.getElementById("taskList").getElementsByTagName("li");
    for (var i = 0; i < taskList.length; i++) {
      var task = {
        content: taskList[i].querySelector(".task-content").textContent,
        priority: taskList[i].querySelector("select:nth-child(2)").value,
        status: taskList[i].querySelector("select:nth-child(3)").value
      };
      tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var taskList = document.getElementById("taskList");
  
    if (tasks) {
      tasks.forEach(function(task) {
        var li = document.createElement("li");
        
        var span = document.createElement("span");
        span.textContent = task.content;
        span.classList.add("task-content");
        span.addEventListener("click", function() {
          editTask(span);
        });
        li.appendChild(span);
        
        var prioritySelect = document.createElement("select");
        prioritySelect.innerHTML = '<option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>';
        prioritySelect.value = task.priority;
        prioritySelect.addEventListener("change", function() {
          saveTasks();
        });
        li.appendChild(prioritySelect);
        
        var statusSelect = document.createElement("select");
        statusSelect.innerHTML = '<option value="pending">Pending</option><option value="completed">Completed</option>';
        statusSelect.value = task.status;
        statusSelect.addEventListener("change", function() {
          li.classList.toggle("completed", statusSelect.value === "completed");
          saveTasks();
        });
        li.appendChild(statusSelect);
  
        li.classList.toggle("completed", task.status === "completed");
  
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
          deleteTask(li);
        });
        li.appendChild(deleteBtn);
  
        taskList.appendChild(li);
      });
    }
  }
  