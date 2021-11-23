import { PlayAudio } from "../PlayAudio"
import { Quiz } from "../Quiz"
import { Timer } from "../Timer"
import { FooterComponent } from "./FooterComponent"

const QuizPage = {
  render: (id) => {
  const playAudio = new PlayAudio()
  playAudio.sound('openPage')

  const quiz = new Quiz(id);
  const answers = quiz.nextQuestion();
  new Timer()

  if (quiz.type === 'pictures') return NextPictureComponent.render(answers, quiz.rightAnswer, id)
  else return NextArtistComponent.render(answers, quiz.rightAnswer, id)
  }
}

const NextArtistComponent = {
  render: (answers, rightAnswer, id) => {
    const images = answers.reduce( (html,item) => {
      return html + QuestionPictureComponent.render(item.imageNum, id)
    },'');
    return `
    <div class="quiz">
    <a href="#/modal/confirm-exit&${id}"> 
      <div class="escape-cross escape-cross_top-left"></div>
    </a>
      <h3 class="quiz__question">Which is ${rightAnswer.author} picture?</h3>
      <div class="quiz__question-wrapper">
      ${images}
      </div>
    </div>
    ${FooterComponent.render()}
    `;
  }
} 

const QuestionPictureComponent = {
  render: (imageNum, id) => {
    return `
    <a href="#/modal/answer&${imageNum}&${id}">
        <img class="quiz__img-tile" src="./base-img/square/${imageNum}.jpg" alt="choose-picture">
    </a>
    `
  }
}

const NextPictureComponent = {
  render: (answers, rightAnswer, id) => {
    const names = answers.reduce( (html,item) => {
      return html + QuestionAuthorComponent.render(item, id)
    },'');
    return `
    <div class="quiz">
      <a href="#/modal/confirm-exit&${id}"> 
        <div class="escape-cross escape-cross_top-left"></div>
      </a>
      <h3 class="quiz__question">Who is thr author of the picture?</h3>
      <img class="quiz__img-question" src="./base-img/square/${rightAnswer.imageNum}.jpg" alt="picture">
      <div class="quiz__question-wrapper">
      ${names}
      </div>
    </div>
    ${FooterComponent.render()}
    `;
  }
} 

const QuestionAuthorComponent = {
  render: (item, id) => {
    return `
        <button onclick="location.href = '#/modal/answer&${item.imageNum}&${id}'" class="button button_question">${item.author}</button>
    `
  }
}

export {QuizPage}