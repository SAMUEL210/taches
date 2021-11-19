const inscription = document.querySelector('.submit-signup')
const pseudo = document.querySelector('.pseudo')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const cpassword = document.querySelector('.cpassword')
const alertMessage = document.querySelector('.form-alert')

inscription.addEventListener('click' , (e)=>{
    e.preventDefault()
    
    if (pseudo.value === "" ||  email.value === "" || password.value === "" || cpassword.value === "") {
        let p = document.createElement('p')
        p.innerHTML = 'Veuillez remplir les champs vides!'
        alertMessage.innerHTML = p.innerHTML
        if (pseudo.value == "")
            pseudo.classList.add('is-invalid')
        else pseudo.classList.remove('is-invalid')
        if (email.value == "")
            email.classList.add('is-invalid')
        else email.classList.remove('is-invalid')
        if (password.value == "")
            password.classList.add('is-invalid')
        else password.classList.remove('is-invalid')
        if (cpassword.value == "")
            cpassword.classList.add('is-invalid')
        else cpassword.classList.remove('is-invalid')
    }else if(pseudo.value.length < 4){
        let p = document.createElement('p')
        p.innerHTML = 'Le pseudo doit faire au moins 4 caractères!'
        alertMessage.innerHTML = p.innerHTML
    }
    else if( password.value != cpassword.value){
        let p = document.createElement('p')
        p.innerHTML = 'Les mots de passe ne sont pas identiques!'
        alertMessage.innerHTML = p.innerHTML
    }else if(password.value.length < 8){
        let p = document.createElement('p')
        p.innerHTML = 'Le mot de passe doit faire au moins 8 caractères!'
        alertMessage.innerHTML = p.innerHTML
    }else{
        alertMessage.innerHTML = ''
        password.classList.remove('is-invalid')
        pseudo.classList.remove('is-invalid')
        cpassword.classList.remove('is-invalid')
        email.classList.remove('is-invalid')
        axios({
            method: 'post',
            url: '/api/v1/utilisateurs/',
            data: {
                pseudo: pseudo.value,
                email: email.value,
                password: password.value
            },
            responseType: 'json'
        })
        .then(function(reponse) {
            if(reponse.data.error){
                let p = document.createElement('p')
                p.innerHTML = reponse.data.error
                alertMessage.innerHTML = p.innerHTML
            }
            else{
                let p = document.createElement('p')
                p.innerHTML = "Votre compte a été crée!"
                alertMessage.classList.add('text-success')
                alertMessage.innerHTML = p.innerHTML
                pseudo.value = ''
                email.value =''
                password.value = ''
                cpassword.value = ''
            }
        });
    }

})