let buttonSart = document.querySelector(".over-page span");
let pageOver = document.querySelector(".over-page");
let yourName = document.querySelector(".info .name span");
let tries = document.querySelector(".info .wrong span");
let block = document.querySelectorAll(".block");


let backCard = document.querySelector(".back");

//catch the container
let container = document.querySelector(".container");

//to start game
buttonSart.onclick = function(){
    let theName = prompt("what is your name");
    if(theName == null || theName == ""){
        yourName.textContent = "unkown";    
    }else{
    yourName.textContent = theName;
    };
    pageOver.remove();
    let count = setInterval(contDown ,1000);
    
}
let seconds = 120;
//function to count the secound


let divCountTime = document.querySelector(".time");
function contDown (){

   let  mintues = Math.floor(seconds / 60);
   let remindSec = seconds % 60;
   if(seconds > 0){
       seconds = seconds - 1;
       if(seconds <= 30){
        divCountTime.style.color ="red";
        location.reload();
       }
   }else{
       clearInterval(count);
   }
   divCountTime.innerHTML = `${mintues} : ${remindSec}`;
}

let duration = 1000;
let orderRange = Array.from(Array(block.length).keys());

shuffel(orderRange);

block.forEach(function(e,ind){
    e.style.order = orderRange[ind];  

    e.addEventListener("click",function(){

        flipped (e);
        
    });
    
});
//array to collect the flipped elements

let allFlippedBlocks = [];
//function is flipped
function flipped (blk){

    blk.classList.add("is-flipped");

    //collect blocks has flipped
    allFlippedBlocks.push(blk);
    
    console.log(allFlippedBlocks);
    //check if the two div has class is-flipped
    if(allFlippedBlocks.length === 2){
        console.log("two blocks selected");

        //stop clicking function
        container.classList.add("stop-click");

        setTimeout(function(){
            //stop clicking function
        container.classList.remove("stop-click");

            //check matching clicking function
            checkMatching (allFlippedBlocks[0],allFlippedBlocks[1]);

        },duration);  
    };
   
};

let successPoint = document.querySelector("#success-point");
let faildPoint = document.querySelector("#fail-point");
let winGame = document.querySelector("#win-game");
//Function check matching clicking function
function checkMatching (firstItem,secondItem){

    if(firstItem.dataset.icons == secondItem.dataset.icons){
        //remove is flipped
        firstItem.classList.remove("is-flipped");
        secondItem.classList.remove("is-flipped");

        // console.log("there are the same in dataset")

        //add is opended
        firstItem.classList.add("opened");
        secondItem.classList.add("opened");

        successPoint.play();
    }else{
        //increase the tries
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
          //remove is flipped
          firstItem.classList.remove("is-flipped");
          secondItem.classList.remove("is-flipped");
          faildPoint.play();
          limitTries ();
    };
    allFlippedBlocks.length = 0;
};

//function check if the tries = 12
function limitTries () {
    if( parseInt(tries.innerHTML) === 6){
        alert("you are the limit tries");
        location.reload();
    }
}

//function to shuffle Elements
function shuffel (array) {
    
    let temp = Math.floor(Math.random() * (array.length));

     for(let z = array.length; z > 0; z--){
        let temp = Math.floor(Math.random() * (array.length));
        let ele = array[z];
        array[z] = array[temp];
        array[temp] = ele;
    };
    return array;
};
