//Assets
const allPictures=[
    {
        id:1,
        src:"Assets/cheseburger.jpg",
        name:"Cheseburger",
    },
    {
        id:2,
        src:"Assets/fries.jpg",
        name:"Fries",
    },
    {
        id:3,
        src:"Assets/hotdog.png",
        name:"Hotdog",
    },
    {
        id:4,
        src:"Assets/ice-cream.jpg",
        name:"Ice-cream",
    },
    {
        id:5,
        src:"Assets/milkshake.jpg",
        name:"Milkshake",
    },
    {
        id:6,
        src:"Assets/pizza.png",
        name:"Pizza",
    },
    {
        id:7,
        src:"Assets/cheseburger.jpg",
        name:"Cheseburger",
    },
    {
        id:8,
        src:"Assets/fries.jpg",
        name:"Fries",
    },
    {
        id:9,
        src:"Assets/hotdog.png",
        name:"Hotdog",
    },
    {
        id:10,
        src:"Assets/ice-cream.jpg",
        name:"Ice-cream",
    },
    {
        id:11,
        src:"Assets/milkshake.jpg",
        name:"Milkshake",
    },
    {
        id:12,
        src:"Assets/pizza.png",
        name:"Pizza",
    }
];

//Variables->DOM Selection
const modal=document.querySelector('.modal_information');
const btn=document.querySelector('.Close_btn');
const gameMenu=document.querySelector('.game_menu');
const gameSetModal=document.querySelector(".game_menu_settings");
const gameSettings=document.querySelector('.game_sett');
const gameSettingsSubmit=document.querySelector('.submit');
const gameStart=document.querySelector('.gameStart');
const gameMode=document.querySelector('.game_hajimare');
const gameResult=document.querySelector('.game_result');

//Variables
let gameLevel;
let rememberSecond,matchingPoints,wrongMatchingPoints,timeMinus;
let finalScore=0;
let totalCards=12;
let pictureChosen=[];
let pictureParentId=[];
let startTime;
let finishTime;
let seconds;

//default value
document.querySelector('.normal').checked=true;

//Events
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
    modal.classList.remove('remove');
    gameMenu.classList.add('remove');
    gameRules(gameLevel);
});
function shuffleArray(array){
    for(let i=array.length-1;i>0;i--){
        let randomArray=Math.floor(Math.random()*(i+1));
        let temp=array[i];
        array[i]=array[randomArray];
        array[randomArray]=temp;
    }
}
//Show points and restart
function gameFinishingAndSave(){
    finishTime=performance.now();
    let TimeDifference=finishTime-startTime;
    seconds=Math.floor(TimeDifference/1000);
    finalScore=finalScore+(seconds*timeMinus);
    finalScore=finalScore.toFixed(2);
    gameMode.classList.add('remove');
    gameResult.classList.remove('remove');
    document.querySelector('.player_result').innerHTML+=`
        <div class="totalScore">Total Score:${finalScore}</div>
        <div class="totalTime">Total Time:${seconds} seconds</div>
        
    `;
    document.querySelector('.refresh_btn').addEventListener('click',()=>location.reload());
}
//update points
function calculateUserPoints(match){
    if(match===true){
        finalScore+=matchingPoints;
        totalCards-=2;
    }else{
        finalScore+=wrongMatchingPoints;
    }
    //Finishing Game
    if(totalCards===0) gameFinishingAndSave();
    
}

//level select
function gameRules(levelDesc="normal"){
    if(levelDesc==="easy"){
        rememberSecond=1;
        matchingPoints=3;
        wrongMatchingPoints=-0.5;
        timeMinus=-0.001;
    }else if(levelDesc==="normal"){
        rememberSecond=0.5;
        matchingPoints=2;
        wrongMatchingPoints=-1;
        timeMinus=-0.01;
    }else if(levelDesc==="hard"){
        rememberSecond=0.1;
        matchingPoints=1;
        wrongMatchingPoints=-2;
        timeMinus=-0.1;
    }
    let gameRulesDescription=` This is a memory game and you are in ${levelDesc} mode. You will have ${rememberSecond} second to memorize all images position and
    then all picture will turn around. Now you will have to turn them around by clicking
    on them. You have to match pair. If you match pairs you will get ${matchingPoints} points and  for a wrong
    pair you will get ${wrongMatchingPoints}. The time will matter as well. With each time you will get ${timeMinus}.
    The game will go on until you find all the pairs. After completing the game you will get to
    save your score and name`
    document.querySelector('.modal_information .desc').textContent=gameRulesDescription;
    btn.addEventListener('click',()=>{
        modal.classList.add('remove');
        gameMenu.classList.add('remove');
        gameMode.classList.remove('remove');
        gameExecution(levelDesc);
    });
}

//Checking the matching
function declareCurrentResult(){
    document.querySelectorAll('.grid_items').forEach((e)=>e.parentElement.classList.remove('pointer_events_none'));
    if(pictureChosen[0]===pictureChosen[1]){
        //calculate points
        calculateUserPoints(true);
        for(let i of pictureParentId) document.querySelector(`[data-num="${i}"]`).children[1].classList.add("pointer_events_none");
    }else{
        //calculate points
        calculateUserPoints(false);
        for(let i of pictureParentId) document.querySelector(`[data-num="${i}"]`).classList.add("rotate");
    }
    pictureChosen=[];
    pictureParentId=[];
}

//Control The Game
function selectTimes(){
    //Time Start
    startTime=performance.now();
    //Click Events
  document.querySelectorAll('.grid_items').forEach((e)=>{
        e.addEventListener('click',function(current){
            if(pictureParentId.includes(current.target.parentElement.dataset.num)===false){
                e.parentElement.classList.remove('rotate');
                let currentImageDatasetId=current.target.dataset.id;
                let currentDataSetId=current.target.parentElement.dataset.num;
                pictureChosen.push(currentImageDatasetId);
                pictureParentId.push(currentDataSetId);
                if(pictureChosen.length===2) 
                {
                    document.querySelectorAll('.grid_items').forEach((e)=>e.parentElement.classList.add('pointer_events_none'));
                    //Match Check
                    setTimeout(declareCurrentResult,1000);
                }
            }
        });
  });
}

//Game Level Select and Prepare the Game
function gameExecution(setLevel="hard"){
    let gameTime;
    if(setLevel==="easy"){
        gameTime=1000;
    }else if(setLevel==="normal"){
        gameTime=500;
    }else if(setLevel==="hard"){
        gameTime=100;
    }
    shuffleArray(allPictures);
    allPictures.forEach((e)=>{
        document.querySelector('.game_sets').innerHTML+=`
        <div class="transform_pic_3d" data-num="${e.id}">
            <img src="Assets/blank.jpg" class="grid_items card_back"  data-id="${e.name}" alt="Blank"/>
            <img src="${e.src}" class="grid_items card_front" alt="${e.name}" data-id="${e.name}"/>
        </div>
            `;
    });
    let allSelectedPictures=document.querySelectorAll('.transform_pic_3d');
    setTimeout(()=>{
        allSelectedPictures.forEach((e)=>{
            e.classList.add('rotate');
        });
    },gameTime)
    selectTimes();
}