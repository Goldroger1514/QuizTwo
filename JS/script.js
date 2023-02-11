let time = document.querySelector(".time");
let totalQuestions = 0;
let questionsCount = document.querySelector(".count");
let questionCounter = 0;
let select = document.querySelector("#category");
let timer;
let correctAnswers = 0;
function fetchData() {
  fetch(`JS/${select.value}.json`)
    .then((response) => response.json())
    .then((data) => {
      totalQuestions = data.length;
      showBullets();
      clearInterval(timer);
      if(questionCounter==totalQuestions){
        changeInfo();
        return;
      }
      showData(data[questionCounter++]);
      interval(data[questionCounter]);
    });
}
let randomArrayIndex = [];
function changeInfo(){
  toggleHidden();
  showResult();
}
function showBullets() {
  let bulletsContainer = document.querySelector(".bullets");
  bulletsContainer.innerHTML='';
  for (let i = 0; i < totalQuestions; i++) {
    let span = document.createElement("span");
    bulletsContainer.append(span);
    if(i<=questionCounter)
    span.classList.add('active');
  }
}
function showResult() {
  let wrapper = document.querySelector(".wrapper");
  wrapper.style.textAlign = "center";
  wrapper.innerHTML = `
        You got ${correctAnswers} from ${totalQuestions}
        <button class='start-again' >Start Again</button>
        `;
  let startAgainBtn = document.querySelector("button.start-again");
  startAgainBtn.style.cssText = "display:block;margin-top:10px";
  startAgainBtn.addEventListener("click", function () {
    location.reload();
  });
}
function showData(data) {
  let questionTxt = document.querySelector(".question");
  let total = document.querySelector("small");
  questionsCount.innerHTML++;
  questionTxt.innerHTML = data.question;
  total.innerHTML = totalQuestions;
  let ul = document.querySelector("ul");
  ul.innerHTML = "";
  let indexesArray = [];
  for (let i = 0; i < data.choices.length; i++) indexesArray.push(i);
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * indexesArray.length);
    let li = document.createElement("li");
    ul.append(li);
    let input = document.createElement("input");
    li.append(input);
    let label = document.createElement("label");
    li.append(label);
    label.textContent = data.choices[indexesArray[random]];
    indexesArray.splice(random, 1);
    if (data.answer == label.textContent) input.classList.add("correct");
    label.htmlFor = `q${i + 1}`;
    input.id = `q${i + 1}`;
    input.type = "radio";
    input.name = "choice";
    input.checked = true;
  }
  
}
let next = document.querySelector(".next");
let start = document.querySelector(".start");
let allHidden = document.querySelectorAll(".hidden");
function toggleHidden() {
  allHidden.forEach((hidden) => hidden.classList.toggle("hidden"));
}
start.onclick = function () {
  toggleHidden();
  start.classList.add("hidden");
  document.querySelector(".category").classList.add("hidden");
  fetchData();
  before.style.animationName = "fill";
};
let before = document.querySelector(".wrapper .load-bar .before");
next.onclick = function () {
  fetchData();
  before.style.animationName = "none";
  loadBar();
  checkValue();
};
function interval(data='null') {
  time.textContent = 60;
  timer = setInterval(() => {
    time.textContent--;
    if (time.textContent == "0") {
      clearInterval(timer);
      loadBar();
      fetchData();
    }
  }, 1000);
}
function checkValue() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.checked && input.classList.contains("correct")) correctAnswers++;
  });
}
function loadBar(){
  before.style.animationName = "none";
  setTimeout(() => {
    before.style.animationName = "fill";
  }, 0.00000001);
}