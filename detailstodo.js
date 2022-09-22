import { appendTodoToDom, appendProjectToDom } from './appendtodom.js';

export function detailsTodo (array, e) {
  let detailsModal = document.querySelector('.detailsModal');
  let arrayPosition = e.composedPath()[2].attributes[1].nodeValue;
  let detailsTitle = document.querySelector('.detailsTitle');
  let detailsDescription = document.querySelector('.detailsDescription');
  let detailsDate = document.querySelector('.detailsDate');
  
  detailsModal.style.display = 'block';

  detailsTitle.value = array[arrayPosition].title;
  detailsDescription.value = array[arrayPosition].description;
  detailsDate.value = array[arrayPosition].dueDate;
  
  if (array[arrayPosition].priority === 'low') {
    document.querySelector('#detailsLow').checked = true;
  } else if (array[arrayPosition].priority === 'med') {
    document.querySelector('#detailsMed').checked = true;
  } else if (array[arrayPosition].priority === 'high') {
    document.querySelector('#detailsHigh').checked = true;
  }
}

export function updateTodo (array, toggle, position) {
  let detailsModal = document.querySelector('.detailsModal');
  let detailsTitle = document.querySelector('.detailsTitle');
  let detailsDescription = document.querySelector('.detailsDescription');
  let detailsDate = document.querySelector('.detailsDate');

  if (detailsTitle.checkValidity() && 
  detailsDescription.checkValidity() && 
  detailsDate.checkValidity()) {
    array[position].title = detailsTitle.value;
    array[position].description = detailsDescription.value;
    array[position].dueDate = detailsDate.value;
    if (document.querySelector('#detailsLow').checked === true) {
      array[position].priority = 'low';
    } else if (document.querySelector('#detailsMed').checked === true) {
      array[position].priority = 'med';
    } else if (document.querySelector('#detailsHigh').checked === true) {
      array[position].priority = 'high';
    }
    detailsModal.style.display = 'none'
    if (toggle === 'todo' || toggle === 'complete') {
      appendTodoToDom(array);
    } else if (toggle === 'project') {
      appendProjectToDom(array);
    }
  }
}