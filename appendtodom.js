export function appendTodoToDom(array) {
  let i = 0;

  array.sort(function(a,b){
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  let addTodoToList = (todo) => {
    let todoItem = document.createElement('div');
    let completeColumn = document.createElement('div');
    let completeCheckbox = document.createElement('input');
    let titleColumn = document.createElement('div');
    let detailsColumn = document.createElement('div');
    let dueDateColumn = document.createElement('div');
    let deleteColumn = document.createElement('div');
    let detailsBtn = document.createElement('button');
    let deleteBtn = document.createElement('img');

    todoItem.classList.add('todoItem');
    completeColumn.classList.add('doneColumn');
    titleColumn.classList.add('titleColumn');
    detailsColumn.classList.add('detailsColumn');
    deleteColumn.classList.add('deleteColumn');
    detailsBtn.classList.add('detailsBtn');
    completeCheckbox.classList.add('completeCheckbox');
    completeCheckbox.type = 'checkbox';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.setAttribute('src', './images/Delete-button.svg');
    dueDateColumn.classList.add('dueDateColumn');
    todoItem.setAttribute('data-number', i)

    document.querySelector('.todoDisplay').appendChild(todoItem);
    todoItem.appendChild(completeColumn);
    todoItem.appendChild(titleColumn);
    todoItem.appendChild(detailsColumn);
    todoItem.appendChild(dueDateColumn);
    todoItem.appendChild(deleteColumn);
    completeColumn.appendChild(completeCheckbox);
    detailsColumn.appendChild(detailsBtn);
    deleteColumn.appendChild(deleteBtn);

    completeCheckbox.checked = todo.complete;
    titleColumn.textContent = todo.title;
    dueDateColumn.textContent = todo.dueDate;
    detailsBtn.innerText = 'DETAILS';
    if (todo.priority === 'low') {
      todoItem.style.borderLeft = 'solid 3px #008000';
    } else if (todo.priority === 'med') {
      todoItem.style.borderLeft = 'solid 3px #ffa500';
    } else if (todo.priority === 'high'){
      todoItem.style.borderLeft = 'solid 3px #ff0000';
    } else {
      todoItem.style.borderLeft = 'solid 3px transparent';
    }

    if (todo.complete === true) {
      todoItem.classList.add('todoItemStrike');
    } else {
      todoItem.classList.remove('todoItemStrike');
    }

    i++;
  }

  document.querySelector('.todoDisplay').innerHTML = '';

  if (array.length === 0) {
    let emptyList = document.createElement('div');
    emptyList.classList.add('emptyList');
    document.querySelector('.todoDisplay').appendChild(emptyList);
    emptyList.innerText = 'This view is empty! Add a Todo using the menu on the left.'
  }

  for (let todo of array) {
    addTodoToList(todo);
  }
}

export function appendProjectToDom(array, currentProject) {
  let i = 0;
  let todoDisplay = document.querySelector('.todoDisplay');
  let addTodoToProject = document.createElement('button');
  let deleteProject = document.createElement('button');
  let projectTitle = document.createElement('h2');
  
  array.sort(function(a,b){
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  let addTodoToList = (todo) => {
    let todoItem = document.createElement('div');
    let completeColumn = document.createElement('div');
    let completeCheckbox = document.createElement('input');
    let titleColumn = document.createElement('div');
    let detailsColumn = document.createElement('div');
    let dueDateColumn = document.createElement('div');
    let deleteColumn = document.createElement('div');
    let detailsBtn = document.createElement('button');
    let deleteBtn = document.createElement('img');
    
    todoItem.classList.add('todoItem');
    todoItem.classList.add('projectTodo');
    completeColumn.classList.add('doneColumn');
    titleColumn.classList.add('titleColumn');
    detailsColumn.classList.add('detailsColumn');
    deleteColumn.classList.add('deleteColumn');
    detailsBtn.classList.add('detailsBtn');
    completeCheckbox.classList.add('completeCheckbox');
    completeCheckbox.type = 'checkbox';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.setAttribute('src', './images/Delete-button.svg');
    dueDateColumn.classList.add('dueDateColumn');
    todoItem.setAttribute('data-number', i)

    todoDisplay.appendChild(todoItem);
    todoItem.appendChild(completeColumn);
    todoItem.appendChild(titleColumn);
    todoItem.appendChild(detailsColumn);
    todoItem.appendChild(dueDateColumn);
    todoItem.appendChild(deleteColumn);
    completeColumn.appendChild(completeCheckbox);
    detailsColumn.appendChild(detailsBtn);
    deleteColumn.appendChild(deleteBtn);

    completeCheckbox.checked = todo.complete;
    titleColumn.textContent = todo.title;
    dueDateColumn.textContent = todo.dueDate;
    detailsBtn.innerText = 'DETAILS';

    if (todo.priority === 'low') {
      todoItem.style.borderLeft = 'solid 3px #008000';
    } else if (todo.priority === 'med') {
      todoItem.style.borderLeft = 'solid 3px #ffa500';
    } else if (todo.priority === 'high'){
      todoItem.style.borderLeft = 'solid 3px #ff0000';
    } else {
      todoItem.style.borderLeft = 'solid 3px transparent';
    }
    i++;

    if (todo.complete === true) {
      todoItem.classList.add('todoItemStrike');
    } else {
      todoItem.classList.remove('todoItemStrike');
    }
  }

  todoDisplay.innerHTML = '';

  todoDisplay.prepend(projectTitle)
  projectTitle.innerText = currentProject;
  projectTitle.classList.add('projectTitle');

  if (array.length === 0) {
    let emptyList = document.createElement('div');

    emptyList.classList.add('emptyList');
    emptyList.innerText = 'This Project is empty!';

    todoDisplay.appendChild(emptyList);
  } else {
    for (let todo of array) {
      addTodoToList(todo);
    }
  }

  todoDisplay.appendChild(addTodoToProject);
  addTodoToProject.classList.add('addTodoToProject');
  addTodoToProject.innerText = 'Add a Todo to this Project';

  todoDisplay.appendChild(deleteProject);
  deleteProject.classList.add('deleteProject');
  deleteProject.innerText = 'Delete Project';
}