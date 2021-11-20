import { Quiz } from "../Quiz";
import { PlayAudio } from "../PlayAudio";

const CheckAnswerComponent = {
  render: (answerImageNum) => {
    const quiz = new Quiz()
    const rightAnswer = quiz.rightAnswer;
    const isRight = quiz.checkRightAnswer(answerImageNum)

    const playAudio = new PlayAudio()
    isRight ? playAudio.sound('rightAnswer') : playAudio.sound('falseAnswer')
    const href = (quiz.isLastQuestion) ? `#/modal/result-quiz` : `#/category/quiz`
    return `
    <div class="modal">
      <div class="modal__dialog-wrapper">
        <img class="modal__img" src="./base-img/square/${rightAnswer.imageNum}.jpg" alt="right-picture" >
        <div class="check-icon check-icon_${isRight} modal__check"></div>
        <h4 class="modal__picture-name">${rightAnswer.name}</h4>
        <h5 class="modal__author">${rightAnswer.author}, ${rightAnswer.year}</h5>
          <button onclick="location.href = '${href}'" class="button button_colored button_modal" id="next-btn">Next</button>
      </div>
    </div>
    `
  }
} 

export {CheckAnswerComponent}