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