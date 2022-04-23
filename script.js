const modal=document.querySelector('.modal_information');
const btn=document.querySelector('.Close_btn');
const gameMenu=document.querySelector('.game_menu');
const gameSetModal=document.querySelector(".game_menu_settings");
const gameSettings=document.querySelector('.game_sett');
const gameSettingsSubmit=document.querySelector('.submit');
const gameStart=document.querySelector('.gameStart');
let gameLevel;
document.querySelector('.hard').checked=true;
btn.addEventListener('click',()=>{
    modal.classList.add('remove');
    gameMenu.classList.remove('remove');
});
gameSettings.addEventListener('click',()=>{
    gameSetModal.classList.remove('remove');
    gameMenu.classList.add('remove');
})
gameSettingsSubmit.addEventListener('submit',(e)=>{
    e.preventDefault();
    gameLevel=document.querySelector('input[name="level"]:checked').value;
    gameSetModal.classList.add('remove');
    gameMenu.classList.remove('remove');
});
document.querySelector('.easyMode').addEventListener("click",()=>{
    document.querySelector('.easyMode').previousElementSibling.checked=true;
    gameLevel=document.querySelector('.easyMode').previousElementSibling.value;
});
document.querySelector('.normalMode').addEventListener("click",()=>{
    document.querySelector('.normalMode').previousSibling.checked=true;
    gameLevel=document.querySelector('.normalMode').previousSibling.value;
});
document.querySelector('.hardMode').addEventListener("click",()=>{
    document.querySelector('.hardMode').previousSibling.checked=true;
    gameLevel=document.querySelector('.hardMode').previousSibling.value;
});
gameStart.addEventListener('click',()=>{
    console.log(gameLevel);
});