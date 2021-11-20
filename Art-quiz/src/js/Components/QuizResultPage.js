import { Timer } from "../Timer"
import { Quiz } from "../Quiz"
import { PlayAudio } from "../PlayAudio"

const QuizResultPage = {
  render: () => { 
    let timer = new Timer()
    timer.removeTimer()
    let quiz = new Quiz()
    let isSuccess = quiz.checkSuccess() 
    console.log('isSuccess',isSuccess)
    return (isSuccess) ?  WinModal.render() : GameOverModal.render()
  }
}

const WinModal = {
  render: () => {
    const playAudio = new PlayAudio;
    playAudio.sound('goodResult')
    let quiz = new Quiz()
    let nextID = quiz.getNextId();
    let answeredRight = quiz.answeredRight
    let amount = quiz.amount
    let type = quiz.type
    quiz.finishThisQuiz()   
    return `
    <div class="modal">
      <div class="modal__dialog-wrapper">
        <div class="trophy-cup-icon trophy-cup-icon_star modal__trophy-cup-icon"></div>
        <h4 class="modal__congratulations">Congratulations!</h4>
        <h1 class=""modal__answered-questions">${answeredRight}/${amount}</h1>
        <div class="modal__buttons">
          <button onclick="location.href = '#/category&${type}'" class="button button_modal">Categories</button>
          <button onclick="location.href = '#/category/quiz&${nextID}'" class="button button_colored button_modal">Next Quiz</button>
        </div>
      </div>
    </div>
    `;
  }
}

const GameOverModal = {
  render: () => {
    const playAudio = new PlayAudio;
    playAudio.sound('badResult')
    let quiz = new Quiz()
    let id = quiz.id
    let type = quiz.type
    quiz.finishThisQuiz() 

    return `
    <div class="modal">
      <div class="modal__dialog-wrapper">
        <div class="trophy-cup-icon trophy-cup-icon_break modal__trophy-cup-icon"></div>
        <h1 class="modal__answered-questions">Game over!</h1>
        <h4 class="modal__congratulations">Play again?</h4>
        <div class="modal__buttons">
          <button onclick="location.href = '#/category&${type}'" class="button button_modal">Cancel</button>
          <button onclick="location.href = '#/category/quiz&${id}'" class="button button_colored button_modal">Yes</button>
        </div>
      </div>
    </div>
    `;
  }
}

export {QuizResultPage}