let profilePicture = document.querySelector('img')
let inputPicture = document.querySelector('input')

inputPicture.addEventListener('change',(e)=>{
    profilePicture.src = URL.createObjectURL(e.target.files[0])
})