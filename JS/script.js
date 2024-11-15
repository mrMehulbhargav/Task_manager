// Selectors
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const categoryInput = document.getElementById('category');
const deadlineInput = document.getElementById('deadline');
const taskList = document.getElementById('task-list');
const filterPendingBtn = document.getElementById('filter-pending');
const filterCompletedBtn = document.getElementById('filter-completed');

// Task Array
let tasks = [];

// Add Task
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    const category = categoryInput.value;
    const deadline = deadlineInput.value;

    if (!taskName) {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        category: category,
        deadline: deadline,
        completed: false,
    };

    tasks.push(newTask);
    displayTasks(tasks);
    taskInput.value = '';
    deadlineInput.value = '';
});

// Display Tasks
function displayTasks(taskArray) {
    taskList.innerHTML = '';

    if (taskArray.length === 0) {
        taskList.innerHTML = '<li class="text-center text-muted">No tasks to display.</li>';
        return;
    }

    taskArray.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item list-group-item d-flex justify-content-between align-items-center ${
            task.completed ? 'completed' : ''
        }`;

        li.innerHTML = `
            <div class="task-info">
                <strong>${task.name}</strong> 
                <span class="text-muted">[${task.category}]</span> 
                <small class="text-muted">Due: ${task.deadline || 'No deadline'}</small>
            </div>
            <div>
                <button class="btn btn-success btn-sm mark-complete" data-id="${task.id}">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    attachTaskEvents();
}

// Attach Events to Tasks
function attachTaskEvents() {
    // Mark Complete
    document.querySelectorAll('.mark-complete').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const taskId = Number(e.target.getAttribute('data-id'));
            tasks = tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            displayTasks(tasks);
        });
    });

    // Delete Task
    document.querySelectorAll('.delete-task').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const taskId = Number(e.target.getAttribute('data-id'));
            tasks = tasks.filter((task) => task.id !== taskId);
            displayTasks(tasks);
        });
    });
}

// Filter Tasks
filterPendingBtn.addEventListener('click', () => {
    const pendingTasks = tasks.filter((task) => !task.completed);
    displayTasks(pendingTasks);
});

filterCompletedBtn.addEventListener('click', () => {
    const completedTasks = tasks.filter((task) => task.completed);
    displayTasks(completedTasks);
});

// Initial Display
displayTasks(tasks);
