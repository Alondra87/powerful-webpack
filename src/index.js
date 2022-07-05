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

LoadToDoList();

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

let arrayTask = [];

const saveList = (array) => {
  localStorage.setItem('mytodoList', JSON.stringify(array));
};

if (localStorage.getItem('mytodoList')) {
  arrayTask = JSON.parse(localStorage.getItem('mytodoList'));
  arrayTask.forEach((element) => {
    AddTaskToList(element.task, element.index, element.done);
  });
}

const inputTask = document.querySelector('input');
inputTask.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && inputTask.value) {
    event.preventDefault();
    AddTaskToList(inputTask.value, arrayTask.length + 1); // + 1
  }
});

const CountCheckbox = document.querySelector('input');
CountCheckbox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const checkboxes = document.querySelectorAll('.checkbox');
    const taskObject = {
      task: inputTask.value,
      done: false,
      index: checkboxes.length,
    };
    arrayTask.push(taskObject);
    saveList(arrayTask);
    inputTask.value = null;
  }
});

document.addEventListener('change', (event) => {
  CheckBoxesChecked(event);
});


const CheckBoxesChecked = (event) => {
  if (event.target.classList.contains('checkbox')) {
    const list = JSON.parse(localStorage.getItem('mytodoList'));

    list[event.target.id - 1].done = !list[event.target.id - 1].done;
    event.target.parentNode.classList.toggle('newbackg');
    event.target.nextElementSibling.classList.toggle('input-done');
    event.target.nextElementSibling.classList.toggle('done-task');
    event.target.parentNode.lastElementChild.classList.toggle('trash');
    localStorage.setItem('mytodoList', JSON.stringify(list));
  }
};

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash-alt')) {
    const trash = event.target.id;
    let list = JSON.parse(localStorage.getItem('mytodoList'));
    list = list.filter((e) => e.index !== Number(trash - 1));
    for (let i = 0; i < list.length; i += 1) {
      list[i].index = i + 1;
    }
    localStorage.removeItem(event.target.parentNode);
    event.target.parentNode.remove();
    saveList(list);
    window.location.reload();
  }
});

document.addEventListener('change', (event) => {
  if (event.target.classList.contains('task')) {
    const list = JSON.parse(localStorage.getItem('mytodoList'));
    list[event.target.parentNode.firstElementChild.id - 1].task = event.target.value;
    event.target.nextElementSibling.classList.toggle('edit-task');
    saveList(list);
  }
});

const clearAll = document.querySelector('#clear');
clearAll.addEventListener('click', () => {
  arrayTask = JSON.parse(localStorage.getItem('mytodoList'));
  arrayTask = arrayTask.filter((task) => task.done === false);
  arrayTask = arrayTask.map((item, i) => ({ task: item.task, done: item.done, index: i + 1 }));
  saveList(arrayTask);
  window.location.reload();
});


