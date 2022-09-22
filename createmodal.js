import { CreateTodo } from './createtodo.js';
import { appendTodoToDom, appendProjectToDom } from './appendtodom.js';

export function createModal() {
  let radioButtons = document.getElementsByName('radioGroup');
  
  document.querySelector('.createModal').style.display = 'block';
  document.querySelector('.modalTitle').value = '';
  document.querySelector('.modalDescription').value = '';
  document.querySelector('.modalDate').value = '';
  for (let i of radioButtons) {
    i.checked = false;
  }
}

export function saveClicked(array, priority, toggle, currentProject) {
  let modal = document.querySelector('.createModal');
  let createTitle = document.querySelector('.modalTitle');
  let createDescription = document.querySelector('.modalDescription');
  let createDate = document.querySelector('.modalDate');

  if (createTitle.checkValidity() && 
  createDescription.checkValidity() && 
  createDate.checkValidity()) {
    let todo = CreateTodo(createTitle.value,
      createDescription.value,
      createDate.value,
      priority,
      false);
    array.push(todo);
    
    modal.style.display = 'none';
    if (toggle === 'todo') {
      appendTodoToDom(array);
    } else if (toggle === 'project') {
      appendProjectToDom(array, currentProject);
    }
  }
}