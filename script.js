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

const taskForm = document.getElementById('task-form');
const submitButton = document.getElementsById('submit-button');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadline = document.getElementById('task-date').value;

    if (title.trim() === '' || description.trim() === '' || deadline.trim()==='') {
        alert('Please enter fill all the blanks.');
        return; 
    }
    console.log('title:', title);
    console.log('description:', description);
    console.log('deadline:', deadline);


    alert('The New Task is submitted!');
    document.getElementById('task-form').reset();
});