import './style.css';


const showList = document.getElementById('todoList');

const LoadToDoList = () => {
  const containerToDoList = document.createElement('div');
  containerToDoList.innerHTML = `
<p id="header">Today's To Do <i class="fas fa-sync"></i></p>
      <input class="data-entry" type="text" placeholder="Add to your list..." required></input>
`;
  showList.appendChild(containerToDoList);
};

const AddTaskToList = (task, index, done) => {
  const containerTasks = document.createElement('div');
  containerTasks.innerHTML += `
        <input type="checkbox" id='${index}' class="checkbox">
        <input type='text' value='${task}' class='task ${done ? 'done-task' : ''}'>
        <i class="fas fa-ellipsis-v"></i>
        <i class="fas fa-trash-alt" id='${index + 1}'></i>
      `;
  showList.appendChild(containerTasks);
};

LoadToDoList();
AddTaskToList();


