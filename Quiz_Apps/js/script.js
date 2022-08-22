const btn = document.querySelector(".btn button");
const rules = document.querySelector(".rules");
const leftBtn = document.querySelector(".buttons .left");

const rightBtn = document.querySelector(".buttons .right");
const question = document.querySelector(".question");

const timeCount = document.querySelector(".time_count .seconds");

const timeLine = document.querySelector(".time_line");


btn.onclick = () => {
    rules.classList.add("active_info");
}
leftBtn.onclick = () => {
    rules.classList.remove("active_info");
}
rightBtn.onclick = () => {
    rules.classList.remove("active_info");
    question.classList.add("active_question");
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
}

let que_count = 0;
let counter;
let timevalue = 15;
let counterLine;
let widthValue = 0;


const btn2 = document.querySelector(".btn2 button");
const result_box = document.querySelector(".result_box");
const replay = document.querySelector(".replay");
const end = document.querySelector(".end");

btn2.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++;
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timevalue);

        clearInterval(counterLine);
        startTimerLine(widthValue);

        btn2.style.display = "none";
    }
    else{
        showResultBox();
    }
}


// show questions

function showQuestions(index){
    const que_text = document.querySelector(".texts");
    const option_list = document.querySelector(".myOptions");
    let option_tag = '<div class="options">'+ questions[index].options[0] +'</div>'
                    + '<div class="options">'+ questions[index].options[1] +'</div>'
                    + '<div class="options">'+ questions[index].options[2] +'</div>'
                    + '<div class="options">'+ questions[index].options[3] +'</div>';
    let que_tag = '<span>'+ questions[index].numb +'.'+ questions[index].question +'</span>';
    que_text.innerHTML = que_tag;

    option_list.innerHTML = option_tag;

    const total_questions = document.querySelector(".total_questions");
    let total_que_tag = '<p>'+ questions[index].numb +' of 5 Question</p>';
    total_questions.innerHTML = total_que_tag;

    const option = option_list.querySelectorAll(".options");
    for(let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}


// option selected
let checkIcon = '<div class="check icon"><i class="fa fa-check" aria-hidden="true"></i></div>';
let crossIcon = '<div class="cross icon"><i class="fa fa-times" aria-hidden="true"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let user_answer = answer.textContent;
    let correct_answer = questions[que_count].answer;

    const option_list = document.querySelector(".myOptions");
    let alloptions = option_list.children.length;
    if(user_answer == correct_answer){
        answer.classList.add("correct");
        console.log("Correct");
        answer.insertAdjacentHTML("beforeend",checkIcon);
    }
    else{
        answer.classList.add("wrong");
        console.log("Wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);

        for(let i = 0; i < alloptions; i++){
            if(option_list.children[i].textContent == correct_answer){
                option_list.children[i].setAttribute("class","options correct");
                option_list.children[i].insertAdjacentHTML("beforeend",checkIcon);
            }
        }
    }

    for(let i = 0; i < alloptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    btn2.style.display = "block";
}

function showResultBox(){
    rules.classList.remove("active_info");
    question.classList.remove("active_question");

    result_box.classList.add("active_result");
}

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 10){
            timeCount.textContent = "0"+time;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }

    }
}

function startTimerLine(time){
    counterLine = setInterval(timerLine,37);
    function timerLine(){
        time = time + 1;
        timeLine.style.width = time + "px";
        if(time > 400){
            clearInterval(counterLine);
        }
    }
    
}