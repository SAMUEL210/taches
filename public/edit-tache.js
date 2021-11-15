const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { tache },
    } = await axios.get(`/api/v1/taches/${id}`)
    const { _id: taskID, completed, name } = tache

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Chargement...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { tache },
    } = await axios.patch(`/api/v1/taches/${id}`, {
      name: taskName,
      completed: taskCompleted,
    })

    const { _id: taskID, completed, name } = tache

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `succès, tache modifié`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `Erreur, Veuillez réessayer`
  }
  editBtnDOM.textContent = 'Modifier'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})