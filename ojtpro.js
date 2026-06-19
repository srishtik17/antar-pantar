const questions=[
  {q:"Capital of India?",o:["Delhi","Mumbai","Chennai","Pune"],a:0},
  {q:"2 + 2 = ?",o:["3","4","5","6"],a:1},
  {q:"HTML stands for?",o:["Hyper Text Markup Language","High Text","Home Tool","None"],a:0},
  {q:"CSS is used for?",o:["Logic","Database","Styling","Compiler"],a:2},
  {q:"JavaScript runs in?",o:["Browser","Printer","Monitor","Scanner"],a:0}
];

let current=0;
let answers={};
let flags=new Set();
let time=300;
let timer;

// START
function startExam(){
  home.classList.add("hidden");
  exam.classList.remove("hidden");
  render();
  startTimer();
}

// TIMER
function startTimer(){
  timer=setInterval(()=>{
    time--;
    let m=String(Math.floor(time/60)).padStart(2,"0");
    let s=String(time%60).padStart(2,"0");
    timerEl().textContent=`${m}:${s}`;

    if(time<=0) submitExam();
  },1000);
}

function timerEl(){
  return document.getElementById("timer");
}

// RENDER
function render(){
  qno.textContent=current+1+" / "+questions.length;

  question.innerHTML="<h3>"+questions[current].q+"</h3>";

  options.innerHTML=questions[current].o.map((x,i)=>
    `<div class="option ${answers[current]===i?'selected':''}"
    onclick="selectAns(${i})">${x}</div>`
  ).join("");

  renderPalette();
}

// SELECT ANSWER
function selectAns(i){
  answers[current]=i;
  render();
}

// NAVIGATION
function nextQ(){
  if(current<questions.length-1) current++;
  render();
}

function prevQ(){
  if(current>0) current--;
  render();
}

function flagQ(){
  if(flags.has(current)) flags.delete(current);
  else flags.add(current);
  render();
}

function gotoQ(i){
  current=i;
  render();
}

// PALETTE
function renderPalette(){
  palette.innerHTML=questions.map((_,i)=>{
    let c="";
    if(answers[i]!=null) c="answered";
    if(flags.has(i)) c="flagged";

    return `<button class="${c}" onclick="gotoQ(${i})">${i+1}</button>`;
  }).join("");
}

// SUBMIT
function submitExam(){
  clearInterval(timer);

  let correct=0;

  questions.forEach((q,i)=>{
    if(answers[i]===q.a) correct++;
  });

  let wrong=Object.keys(answers).length-correct;
  let unanswered=questions.length-Object.keys(answers).length;

  exam.classList.add("hidden");
  result.classList.remove("hidden");

  let percent=Math.round(correct/questions.length*100);

  score.textContent=`Score: ${correct}/${questions.length} (${percent}%)`;
  details.textContent=`Correct: ${correct}, Wrong: ${wrong}, Unanswered: ${unanswered}, Flagged: ${flags.size}`;
}