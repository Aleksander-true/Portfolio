import { Quiz } from "./Quiz";
import { settings } from "./Settings";

// Components
const HomeComponent = {
  render: () => {
    return `
    ${HeaderComponent.render()}
    <main class="main-page" id="main-page">
      <div class="main-page__menu" id="main-page-menu">
        <div class="logo"></div>
          <button onclick="location.href = '#/category-artist'" class="button" id="artist-quiz-btn">Artist quiz</button>
          <button onclick="location.href = '#/category-pictures'" class="button" id="picture-quiz-btn">Pictures quiz</button>
      </div>
    </main>
    ${FooterComponent.render()}
    `;
  }
} 
const HeaderComponent = {
  render: () => {
    return `
    <header class="header">
      <a href="#/settings">
        <span class="settings_icon settings_top-right"></span>
      </a>
    </header>
    `;
  }
} 

const FooterComponent = {
  render: () => {
    return `
    <footer class="footer">
      <div class="rss-logo"></div>
      <div class="developer">App developer: Aleksander Seryapin</div>
      <div class="developed-year">2021</div>
    </footer>
    `;
  }
} 

const CategoryArtistComponent = {
  render: () => {
    let cardsHTML = settings.categories.reduce( (html,cat) => {
      return html + CategoryCard.render(cat)
    },'');
    return `
    ${HeaderComponent.render()}
    <div class="categories show-page" id="categories-page">
    <div class="logo logo_marked"></div>
    <div class="categories__title"><h2>Categories</h2></div>
    <div class="categories__cards-wrapper" id="cards-wrapper">
    ${cardsHTML}
    </div>
    ${FooterMenu.render()}
    `
  }
} 

const CategoryCard = {
  render: ({name, id, isPlayed, answeredQty, totalQuestions, imgData}) => {
    return `
    <div class="card played__${isPlayed}" id="${id}">
      <span class="card_name"> <h4>${name}</h4></span>
      <span class="card_solved-qty visible__${isPlayed}"><h4>${answeredQty}/${totalQuestions}</h4></span>
      <a href="#/category-artist/quiz&${id}">
        <img class="card_img" src="./base-img/square/${imgData[0].imageNum}.jpg" alt="picture">
      </a>
    </div>
    `;
  }
} 

const FooterMenu = {
  render: () => {
    return `
    <div class="footer-menu">
      <a href="#/">
        <h4 class="footer-menu__icon icon_home" id="home-link">Home</h4>
      </a>
      <a href="#/category-artist">
      <h4 class="footer-menu__icon icon_categories" id="categories-link">Categories</h4>
      </a>
      <a href="#/score">
      <h4 class="footer-menu__icon icon_score" id="score-link">Score</h4>
      </a>
    </div>
    `;
  }
} 

const QuizPage = {
  render: (id) => {
  let quiz = new Quiz(id);
  let answers = quiz.nextQuestion();
  let rightAnswer = quiz.rightAnswer;
  return NextQuestionComponent.render(answers, rightAnswer, id)
  }
}

const NextQuestionComponent = {
  render: (answers, rightAnswer, id) => {
    let images = answers.reduce( (html,item) => {
      return html + QuestionPictureComponent.render(item.imageNum, id)
    },'');
    return `
    <div class="quiz" id="artist-quiz">
      <h4 class="quiz__question"><h4>Какую картину написал ${rightAnswer.author}</h4>
      <div class="wrapper_2-col">
      ${images}
      </div>
    </div>
    `;
  }
} 

const QuestionPictureComponent = {
  render: (imageNum, id) => {
    return `
    <a href="#/modal/answer&${imageNum}&${id}">
        <img class="quiz__img-tile" id="0" src="./base-img/square/${imageNum}.jpg" alt="choose-picture">
    </a>
    `
  }
}

const CheckAnswerComponent = {
  render: (answerImageNum, id) => {
    let quiz = new Quiz(id)
    let rightAnswer = quiz.rightAnswer;
    let isRight = false;
    if (answerImageNum === rightAnswer.imageNum)  {
      isRight = true;
      quiz.answeredRight++;
    }
    let href = `#/category-artist/quiz&${id}`
    if (quiz.isLastQuestion) href = `#/modal/result-quiz&${id}`

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

const QuizResultPage = {
  render: (id) => {
    let quiz = new Quiz(id)
    let answeredRight = quiz.answeredRight;
    let amount = quiz.amount;
    quiz.finishThisQuiz(id)
    return `
    <div class="modal">
      <div class="modal__dialog-wrapper">
        <div class="trophy-cup-icon modal__trophy-cup-icon"></div>
        <h4 class="modal__congratulations">Congratulations!</h4>
        <h1 class=""modal__answered-questions">${answeredRight}/${amount}</h1>
        <div class="modal__buttons">
          <button onclick="location.href = '#/'" class="button button_modal">Home</button>
          <button onclick="location.href = '#/category-artist'" class="button button_colored button_modal">Next Quiz</button>
        </div>
      </div>
    </div>
    `;
  }
}

const ErrorComponent = {
  render: () => {
    return `
      <section>
        <h1>Error</h1>
        <p>This is just a test</p>
      </section>
    `;
  }
}

// Routes 
const routes = [
  { path: '/', component: HomeComponent, },
  { path: '/category-artist', component: CategoryArtistComponent, },
  { path: '/category-artist/quiz', component: QuizPage, },
  { path: '/modal/answer', component: CheckAnswerComponent, },
  { path: '/modal/result-quiz', component: QuizResultPage, },
];


export {routes};




