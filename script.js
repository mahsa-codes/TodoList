document.addEventListener("DOMContentLoaded", function() {

  const d = new Date();
  const today = formatDate(d)
  document.getElementById("todo-current-date").innerHTML = today;
});



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

const showForm = document.getElementById('showTaskForm')
const overlay = document.getElementById('overlay');
const pageContent = document.getElementById('page-content')
const closeForm = document.getElementById('task-form-close')
const taskForm = document.getElementById('task-form')
const taskList =document.getElementById('task-lists')
const treeList = document.getElementById('tree-tasks')
const submitButton = document.getElementById('submit-button')
let editTask  = null

showForm.addEventListener('click', ()=> {
  overlay.style.display = 'flex';
  pageContent.classList.add('blur');
  submitButton.textContent = 'Add Task';
  editTask = null;
});

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-date').value;

    if (title.trim() === '' || description.trim() === '' || deadline.trim()==='') {
        alert('Please enter fill all the blanks.');
        return; 
    }
    if (editTask){
        const id = editTask.dataset.id;

        editTask.querySelector('.task-header-title h4').textContent = title;
        editTask.querySelector('.card-task-description p').textContent = description;
        editTask.querySelector('.card-task-deadline h4').textContent = deadline;

        const treeItem = document.querySelector(`.tree-body-title[data-id="${id}"] div`);
        if(treeItem){
            treeItem.textContent = title;
        }

        alert('Task is updated')

    } else {
        const taskId = Date.now();

        const newCard = document.createElement('div');
        newCard.className = 'card-task';
        newCard.dataset.id = taskId;

        newCard.innerHTML = `
            <div class="card-task">
                <div class="card-task-header">
                    <div class="task-header-title">
                        <input type="checkbox" id="task-check one">
                        <h4 class="title-task">${title}</h4>
                    </div>
                    <div class="task-edit-delete-icon">
                        <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            style="margin-right: 5px;">
                            <title>delete task</title>
                            <g id="delete-task" fill="none" fill-rule="evenodd">
                                <path
                                    d="M24 0v24H0V0zM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01z">
                                </path>
                                <path fill="#ff474c"
                                    d="M7.823 3.368A2 2 0 0 1 9.721 2h4.558a2 2 0 0 1 1.898 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28zM9.387 5l.334-1h4.558l.334 1z">
                                </path>
                            </g>
                        </svg>
                        <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            style="margin-right: 5px;">
                            <title>edit task</title>
                            <g id="edit-task" fill="none">
                                <path
                                    d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z">
                                </path>
                                <path fill="#09244BFF"
                                    d="m10.756 6.17 7.07 7.071-7.173 7.174a2 2 0 0 1-1.238.578L9.239 21H4.006a1.01 1.01 0 0 1-1.004-.9l-.006-.11v-5.233a2 2 0 0 1 .467-1.284l.12-.13 7.173-7.174Zm3.14-3.14a2 2 0 0 1 2.701-.117l.127.117 4.243 4.243a2 2 0 0 1 .117 2.7l-.117.128-1.726 1.726-7.07-7.071z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="card-task-description">
                    <p >${description}</p>
                </div>
                <div class="card-task-deadline">
                    <h4>${deadline}</h4>
                </div>
            </div>`;  

        const newTree = document.createElement('div');
        newTree.className = 'tree-body-title';
        newTree.dataset.id = taskId;
        newTree.innerHTML = `            
            <hr class="horizental-line">
            <div class="tree-title">${title}</div>`;

        taskList.appendChild(newCard);
        document.querySelector('#tree-tasks .tree-body').appendChild(newTree);

        eventEditHandler(newCard);

        alert('New Task Added')
    } 
    taskForm.reset();
    overlay.style.display = 'none';
    pageContent.classList.remove('blur');  
});

function eventEditHandler(task) {
    const editIcon = task.querySelector('.edit-icon');
    const deleteIcon = task.querySelector('.delete-icon');
    

    editIcon.addEventListener('click', ()=> {
    
        editTask = task;
        const title = task.querySelector('.task-header-title h4').textContent;
        const description= task.querySelector('.card-task-description p').textContent;
        const deadline= task.querySelector('.card-task-deadline h4').textContent;

        
        document.getElementById('task-title').value = title;
        document.getElementById('task-description').value = description;
        document.getElementById('task-date').value = deadline;

        submitButton.textContent = 'Edit Task';
        overlay.style.display = 'flex';
        pageContent.classList.add('blur');
    });

    deleteIcon.addEventListener('click', () => {
        if(confirm("Are you sure to delete the Task?")) {

            const id = task.dataset.id;
            const treeItem = document.querySelector(`.tree-body-title[data-id="${id}"]`);
            if (treeItem) treeItem.remove();
            task.remove();

        }
    })
};
document.querySelectorAll('.card-task').forEach(task => {
    eventEditHandler(task);
});


closeForm.addEventListener('click', function(e) {
  if (e.target === closeForm) {
    overlay.style.display = 'none';
    pageContent.classList.remove('blur');
  }  
})

const allTask = document.getElementById('all-task');
const completedTask = document.getElementById('completed-task');

allTask.addEventListener('click', function(){
    document.querySelector('.active').classList.remove('active')
    this.classList.add('active');

    const allCards = document.querySelectorAll('.card-task');
    allCards.forEach(card => {
        console.log(card)
        card.style.display = 'block';
    });
});

completedTask.addEventListener('click', function(){
    document.querySelector('.active').classList.remove('active')
    this.classList.add('active');

    document.querySelectorAll('.card-task').forEach(card=> {
        const checkbox = card.querySelector('input[type="checkbox"]'); 
        card.style.display = checkbox && checkbox.checked ? 'block': 'none';
        console.log(card);
    });
});

const searchInput = document.getElementById('searchbar')

searchInput.addEventListener('keyup', function(){
    const search = searchInput.value.toLowerCase();

    document.querySelectorAll('.card-task').forEach(card=> {
        const titleTask = card.querySelector('.title-task');
    
        if (titleTask && titleTask.textContent.toLowerCase().includes(search)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }
    });
});






