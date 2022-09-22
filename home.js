import { appendTodoToDom, appendProjectToDom } from './appendtodom.js';
import { detailsTodo, updateTodo } from './detailstodo.js';
import { createModal, saveClicked } from './createmodal.js';
import { projectsSaveClicked, appendProject} from './createproject.js';
import { setObj, getObj } from './localstorage.js';

export const todoListApp = (() => {
  let todoArr = getObj('todoArr');
  let projectsObj = getObj('projectsObj');
  let priority = '';
  let typeToggle = 'todo'; // todo or project
  let currentProject = '';
  let detailsPosition = '';

  // set variable as an empty object or array if local storage is empty
  if (getObj('projectsObj') === null) projectsObj = {};
  if (getObj('todoArr') === null) todoArr = [];
  
  appendTodoToDom(todoArr);
  appendProject(projectsObj);

  // localstorage clear buttons. Show for debugging only
  // document.querySelector('.clearProjects').addEventListener('click', () => localStorage.removeItem('projectsObj'));
  // document.querySelector('.clearTodos').addEventListener('click', () => localStorage.removeItem('todoArr'));
  // document.querySelector('.clearAll').addEventListener('click', () => localStorage.clear());

  document.querySelector('.allLi').addEventListener('click', () => {
    typeToggle = 'todo';
    appendTodoToDom(todoArr);
  })

  document.querySelector('.todayLi').addEventListener('click', () => {
    typeToggle = 'todo';
    const compareDate = (x) => {
      let today = new Date();
      let dueDate = new Date(x.dueDate);
      
      return today.toDateString() === dueDate.toDateString()
    }
    let todoForTodayArr = todoArr.filter(compareDate);
    appendTodoToDom(todoForTodayArr);
  })

  document.querySelector('.weekLi').addEventListener('click', () => {
    typeToggle = 'todo';
    const compareDate = (x) => {
      const date = new Date(x.dueDate);
      const todayObj = new Date();
      const todayDate = todayObj.getDate();
      const todayDay = todayObj.getDay();
    
      const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));
    
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    
      return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }
    let todoForTodayArr = todoArr.filter(compareDate);
    appendTodoToDom(todoForTodayArr);
  })

  document.querySelector('.projectsAddBtn').addEventListener('click', () => {
    document.querySelector('.projectsModal').style.display = 'block';
    document.querySelector('.projectsTitle').value = '';
  });
  document.querySelector('.todoAddBtn').addEventListener('click', () => {
    typeToggle = 'todo';
    createModal();
  });

  // allows addeventlistener to work on an item
  // that is not present in the DOM on load
  const listenerFunction = (e) => {
    if (e.target.classList.contains('completeCheckbox')) {
      if (typeToggle === 'todo') {
        if (e.target.checked === true) {  
          todoArr[e.target.parentNode.parentNode.attributes[1].nodeValue].complete = true;
        } else if (e.target.checked === false) {
          todoArr[e.target.parentNode.parentNode.attributes[1].nodeValue].complete = false;
        }
        appendTodoToDom(todoArr);
        setObj('todoArr', todoArr);
      } else if (typeToggle === 'project') {
        let currentTodo = projectsObj[currentProject];
        if (e.target.checked === true) {
          currentTodo[e.target.parentNode.parentNode.attributes[1].nodeValue].complete = true;
        } else if (e.target.checked === false) {
          currentTodo[e.target.parentNode.parentNode.attributes[1].nodeValue].complete = false;
        }
        appendProjectToDom(projectsObj[currentProject], currentProject);
        setObj('projectsObj', projectsObj);
      }
    }

    if (e.target.classList.contains('detailsBtn')) {
      detailsPosition = e.target.parentNode.parentNode.attributes[1].nodeValue;
        if (e.target.parentNode.parentNode.classList.contains('projectTodo')) {
          detailsTodo(projectsObj[currentProject], e);
        } else {
          detailsTodo(todoArr, e);
        }
    }

    if (e.target.classList.contains('deleteBtn')) {
        if (typeToggle === 'todo') {
          todoArr.splice(e.target.parentNode.parentNode.attributes[1].value, 1)
          appendTodoToDom(todoArr);
          setObj('todoArr', todoArr);
        } else if (typeToggle === 'project') {
          projectsObj[currentProject].splice(e.target.parentNode.parentNode.attributes[1].value, 1)
          appendProjectToDom(projectsObj[currentProject], currentProject);
          setObj('projectsObj', projectsObj);
        }
    }

    if (e.target.classList.contains('modalSaveBtn')) {
      if (typeToggle === 'todo') {
        saveClicked(todoArr, priority, typeToggle);
        setObj('todoArr', todoArr);
      } else if (typeToggle === 'project') {
        saveClicked(projectsObj[currentProject], priority, typeToggle, currentProject);
        setObj('projectsObj', projectsObj);
      }
      priority = '';
    }

    if (e.target.classList.contains('modalUpdateBtn')) {
        if (typeToggle === 'todo') {
          updateTodo(todoArr, typeToggle, detailsPosition);
          setObj('todoArr', todoArr);
        } else if (typeToggle === 'project') {
          updateTodo(projectsObj[currentProject], typeToggle, detailsPosition);
          setObj('projectsObj', projectsObj);
        }
    }

    if (e.target.classList.contains('projectsSave')) {
      if (document.querySelector('.projectsTitle').checkValidity()) {
        projectsSaveClicked(projectsObj);
        setObj('projectsObj', projectsObj);
      }
    }

    if (e.target.classList.contains('projectsLi')) {
      typeToggle = 'project';
      currentProject = e.target.id;
      appendProjectToDom(projectsObj[currentProject], currentProject);
    }

    if (e.target.classList.contains('addTodoToProject')) {
      typeToggle = 'project';
      createModal();
    }

    if (e.target.classList.contains('deleteProject')) {
      delete projectsObj[currentProject];
      appendTodoToDom(todoArr);
      appendProject(projectsObj);
      setObj('projectsObj', projectsObj);
    }
  }

  document.addEventListener('click', listenerFunction);
  document.querySelector('#low').addEventListener('click', (e) => priority = e.target.attributes[0].value);
  document.querySelector('#med').addEventListener('click', (e) => priority = e.target.attributes[0].value);
  document.querySelector('#high').addEventListener('click', (e) => priority = e.target.attributes[0].value);
})();