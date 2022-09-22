export function projectsSaveClicked(projectsObj) {
  let project = document.querySelector('.projectsTitle').value;
  projectsObj[project] = [];
  appendProject(projectsObj);
  document.querySelector('.projectsModal').style.display = 'none';
}

export function appendProject(projectsObj) {
  let projectList = document.querySelector('.projectsUl');
  let count = 0;
  projectList.innerHTML = '';
  
  for (let i in projectsObj) {
    let li = document.createElement('li');
    li.dataset.position = count;
    li.id = i;
    li.classList.add('projectsLi');
    li.innerText = i;
    projectList.appendChild(li);
    count++;
  }
}