let lifes = 5;
const number = Math.floor(Math.random() * 100) + 1;
const result = document.getElementById("result");
const guesses = document.getElementById("previous-guesses");
document.getElementById("Guess-number").focus();
document.getElementById("lifes").innerText = `Lifes : ${lifes}`;

console.log(number);

function updateResultCorrect() {
  if (result.classList.contains("wrong")) {
    result.classList.remove("wrong");
  }
  document.getElementById("Guess-number").disabled = true;
  result.classList.add("correct");
  result.innerText = "You Guessed it right";
  document.getElementById("number").innerText = `${number}`;
}

function updateResultWrong(inputVal) {
  result.classList.add("wrong");
  console.log(result);
  const text = `${inputVal},`;
  guesses.innerText += text;
}

function Guess() {
  const inputVal = Number(document.getElementById("Guess-number").value);
  if (inputVal) {
    if (inputVal === number) {
      updateResultCorrect();
    } else {
      updateResultWrong(inputVal);
      document.getElementById("Guess-number").value = "";
      if (lifes == 1) {
        result.innerText = "Game Over";
        document.getElementById("Guess-number").disabled = true;
        document.getElementById("number").innerText = `${number}`;
      } else {
        lifes--;
        if (inputVal < number) result.innerText = "Higher";
        else result.innerText = "Lower";
        document.getElementById("lifes").innerText = `Lifes : ${lifes}`;
        document.getElementById("Guess-number").focus();
      }
    }
  }
}

function playAgain() {
  window.location.reload();
}
