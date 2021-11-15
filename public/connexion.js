const connexion = document.querySelector('.submit-login')
const pseudo = document.querySelector('.pseudo')
const password = document.querySelector('.password')
const alertMessage = document.querySelector('.form-alert')
const showHidePassword = document.getElementById('showPassword')



connexion.addEventListener('click', (e)=>{
    e.preventDefault()

    if (pseudo.value === "" || password.value === "") {
        let p = document.createElement('p')
        p.innerHTML = 'Veuillez remplir les champs vides!'
        alertMessage.innerHTML = p.innerHTML
        if (pseudo.value == "")
            pseudo.classList.add('is-invalid')
        else pseudo.classList.remove('is-invalid')
        if (password.value == "")
            password.classList.add('is-invalid')
        else password.classList.remove('is-invalid')
    } else if (pseudo.value != "" && password.value != "") {
        alertMessage.innerHTML = ''
        password.classList.remove('is-invalid')
        pseudo.classList.remove('is-invalid')
        axios({
            method: 'post',
            url: '/api/v1/login/',
            data: {
                pseudo: pseudo.value,
                password: password.value
            },
            responseType: 'json'
        })
        .then(function(reponse) {
            console.log(reponse.data)
            if (reponse.data.error) {
                let p = document.createElement('p')
                p.innerHTML = reponse.data.error
                alertMessage.innerHTML = p.innerHTML
            }else{
                sessionStorage.setItem(
                    "keytok",
                    reponse.headers.authorization
                );
                sessionStorage.setItem("uid", reponse.data.id);
                window.location.replace("index.html");
            }
        });
    }
})
