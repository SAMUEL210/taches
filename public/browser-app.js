const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const userNamePanel = document.querySelector('.userName')
const logout = document.querySelector('.logout')

logout.addEventListener('click', (e)=>{
  sessionStorage.removeItem('uid')
  sessionStorage.removeItem('keytok')
  window.location.replace('connexion.html')
})

axios({
  method: 'get',
  url: `/api/v1/utilisateurs/${sessionStorage.getItem('uid')}`,
  responseType: 'json'
}).then(function(response){
  userNamePanel.innerHTML = response.data.ok.pseudo
})

// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { taches },
    } = await axios.get(`/api/v1/taches/u/${sessionStorage.getItem('uid')}`)
    if (taches.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">Pas de Tache dans votre liste</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = taches
      .map((task) => {
        const { completed, _id: taskID, name } = task
        return `<div class="single-task ${completed && 'task-completed'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href="tache.html?id=${taskID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">Une erreur s\'est produite, réessayer plus tard...</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /api/taches/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/taches/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const uid = sessionStorage.getItem('uid')

  try {
    await axios.post('/api/v1/taches', { name, uid })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, Tache ajouté`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `erreur, réessayer svp!`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})