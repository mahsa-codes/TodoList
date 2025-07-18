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


showForm.addEventListener('click', function() {
  overlay.style.display = 'flex';
  pageContent.classList.add('blur');
  
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
    const newCard = document.createElement('div')
    newCard.className = 'card-task-first';

    newCard.innerHTML = `
       <div class="card-task-header">
            <div class="task-header-title">
                <input type="checkbox" id="title-task-checked">
                <h4 id="title-task-edit">${title}</h4>
            </div>
            <div class="task-edit-delete-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
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
            <p id="task-description-edit">${description}</p>
        </div>
        <div class="card-task-deadline">
            <h4 id="task-deadline-edit">${deadline}</h4>
        </div>
    </div>
    `;
    taskList.appendChild(newCard);
    taskForm.reset();
    overlay.style.display = 'none';
    pageContent.classList.remove('blur');
    
});


closeForm.addEventListener('click', function(e) {
  if (e.target === closeForm) {
    overlay.style.display = 'none';
    pageContent.classList.remove('blur');
  }
  
})

const editButtton = document.getElementById('edit-task')
const deletButton = document.getElementById('delete-task')
const editTitle =document.getElementById('title-task-edit')
const editDescription = document.getElementById('task-description-edit')
const editDeadline = document.getElementById('task-deadline-edit')

editButtton.addEventListener('click', function(){
  console.log('editted')
  if(editTitle.contentEditable  === 'true'){
    editTitle.contentEditable = 'false';
    editButtton.textContent = 'Edit';
  } else {
    editTitle.contentEditable = 'true';
    editButtton.textContent = 'Save';
  }
});


