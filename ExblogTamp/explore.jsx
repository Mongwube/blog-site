const MenuIcon = document.getElementById('menubtn')
const slideMenu = document.getElementById('sidenav')


let x = false;
document.addEventListener('DOMContentLoaded', ()=> {
    togglepop = () =>{
        if (!x){
            slideMenu.style.display = 'inline-grid'
            x = true
        }else{
            slideMenu.style.display = 'none'
            x = false
        }
    }

    MenuIcon.addEventListener('click', togglepop)
})