const homeBtn = document.querySelector(".homeBtn button");
const rulesBox = document.querySelector(".rulesBox");
const exitButton = document.querySelector(".buttons .exitButton");

const continueButton = document.querySelector(".buttons .continueButton");
const questions = document.querySelector(".questions");
const optionList = document.querySelector(".myOptions");

const timeCount = document.querySelector(".timeCount .seconds");

const timeLines = document.querySelector(".questionHeader .timeLines"); 
const timeOff = document.querySelector(".questionHeader .timeLeft");


homeBtn.onclick = () => {
   rulesBox.classList.add("activeInfo");
} 

exitButton.onclick = () => {
   rulesBox.classList.remove("activeInfo");
}
continueButton.onclick = () => {
   // resultBox.classList.remove("activeResult");
   resultBox.classList.remove("activeInfo");

   questions.classList.add("activeInfo2");
   showQuestions(0);
   startTimer(15);

   startTimerLine(0);

}


const nextBtn = document.querySelector(".nextBtn");

const resultBox = document.querySelector(".resultBox");
const restartQuiz = document.querySelector(".buttons2 .restart1");
const exitQuiz = document.querySelector(".buttons2 .exit");
 




exitQuiz.onclick = ()=>{
window.location.reload();
}





restartQuiz.onclick = ()=>{
   resultBox.classList.remove("activeResult");
   questions.classList.add("activeInfo2");
  
    que_count = 0; 
    timeValue = 15; 
    userScore = 0;
    widthValue = 0;

    showQuestions(que_count);
    clearInterval(counter); 
    startTimer(timeValue)
    clearInterval(counterLine); 
    startTimerLine(widthValue); 
    nextBtn.style.display = "none"; 
   
   


    timeOff.textContent = "Time Left";
}


let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = () => {
   if(que_count < questions2.length -1 ){
    
      que_count ++
      showQuestions(que_count);
      
      clearInterval(counter)
      startTimer(timeValue);

      clearInterval(counterLine)
      startTimerLine(widthValue);
      nextBtn.style.display = "none";

     


     
      timeOff.textContent = "Time Left";

   }else{
      console.log("you have complete your task🙂")
      showResultBox();
   }
}

function showQuestions(index) {
   const queText = document.querySelector('.text');
   const optionList = document.querySelector(".myOptions");
   let queTag = "<span>" + questions2[index].numb + '. ' + questions2[index].question + "</span>";
   let optionTag = '<div class="options">' + questions2[index].options[0] + '</div>' +
                   '<div class="options">' + questions2[index].options[1] + '</div>' +
                   '<div class="options">' + questions2[index].options[2] + '</div>' +
                   '<div class="options">' + questions2[index].options[3] + '</div>' 
    
    queText.innerHTML = queTag;
   optionList.innerHTML = optionTag;
   const totalQues = document.querySelector(".totalQues");
   let totalQuesTag = '<p>' + questions2[index].numb + ' of 5 Questions </p>';
   totalQues.innerHTML = totalQuesTag;


   const option = optionList.querySelectorAll(".options");
   for(let i=0; i<option.length; i++){
      option[i].setAttribute("onclick", "optionSelected(this)");
   }
}

let tickIcon = '<div class="tickIcon"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="crossIcon"><i class="fas fa-times"></i></div>'






function optionSelected(answer){
   clearInterval(counter);
   clearInterval(counterLine);

   let userAns = answer.textContent;
   let correctAns = questions2[que_count].answer;
   let allOptions = optionList.children.length;

   if(userAns == correctAns){
      userScore +=1;
      console.log(userScore);
      answer.classList.add("correct");
      console.log("Your Answer Is Correct");
      answer.insertAdjacentHTML("beforeend", tickIcon);
   }else{
      answer.classList.add("incorrect");
      console.log(" Your Answer Is Wrong");
      answer.insertAdjacentHTML("beforeend", crossIcon);

      
      for(let i = 0; i<allOptions; i++){
         if(optionList.children[i].textContent == correctAns){
            optionList.children[i].setAttribute("class", "options correct");
            optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
         }
      }
   }

   for(let i = 0; i<allOptions; i++){
      optionList.children[i].classList.add("disabled");
   }

   nextBtn.style.display = "block";
}






// =========  ResultBox ======= 
function showResultBox(){
   rulesBox.classList.remove("activeInfo");
   questions.classList.remove("activeInfo2");
   resultBox.classList.add("activeResult");

   const scoreText = document.querySelector(".scoreText");
   if(userScore > 3){
     let scoreTag = '<span>Congratulation🙂You Got<p>' + userScore + '</p>Out Of<p>' + questions2.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
   }
   else if(userScore > 1){
      let scoreTag = '<span>Carry on👍 You Got <p>' + userScore + '</p> Out Of <p>' + questions2.length + '</p></span>';
         scoreText.innerHTML = scoreTag;
    }
    else{
      let scoreTag = '<span>You Are Fail🙂 You Got <p>' + userScore + '</p> Out Of <p>' + questions2.length + '</p></span>';
         scoreText.innerHTML = scoreTag;
    }
}




function startTimer(time){
   counter = setInterval(timer, 1000);
   function timer(){
      timeCount.textContent = time;
      time--;
      if(time<9){
         let addZero = timeCount.textContent;
         timeCount.textContent = "0" + addZero;
      }


      if(time < 0){
         clearInterval(counter)
         timeCount.textContent = "00"

         timeOff.textContent = "Time Left";

         let correctAns = questions2[que_count].answer;
         let allOptions = optionList.children.length;
         
         for(let i = 0; i<allOptions; i++){
            if(optionList.children[i].textContent == correctAns){
               optionList.children[i].setAttribute("class", "options correct");
               optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
         }
        
         for(let i = 0; i < allOptions; i++){
            optionList.children[i].classList.add("disabled");
         }
        
         nextBtn.style.display = "block";
         
      }
   }
}




function startTimerLine(time){
   counterLine = setInterval(timer, 50);
   function timer(){
      time += 1
      timeLines.style.width = time + "px";
      if(time > 319){
         clearInterval(counterLine);
      }
   }
}




// ======= If users not select ans in due time   ======
function optionNotSelected(time){
   let correctAns = questions2[que_count].answer;

    if(time<0){
        correctAns
        answer.insertAdjacentHTML("beforeend", tickIcon);
        nextBtn.style.display = "block";

    }else{}

}