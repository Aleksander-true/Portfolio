import { Quiz } from "./Quiz";
import { Settings } from "./Settings";
import { Timer } from "./Timer";

// Components
const HomeComponent = {
  render: () => {
    return `
    ${HeaderComponent.render()}
    <main class="main-page" id="main-page">
      <div class="main-page__menu" id="main-page-menu">
        <div class="logo"></div>
          <button onclick="location.href = '#/category&artist'" class="button" id="artist-quiz-btn">Artist quiz</button>
          <button onclick="location.href = '#/category&pictures'" class="button" id="picture-quiz-btn">Pictures quiz</button>
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
      <a href="#/modal/settings">
        <span class="settings-icon_icon settings-icon_top-right"></span>
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

const CategoryComponent = {
  render: (type) => {
    let settings = new Settings()
    console.log('CategoryComponent settings', settings)
    settings.quizType = type;
    let cardsHTML = settings.categories[type].reduce( (html,cat) => {
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
      <a href="#/category/quiz&${id}">
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
  console.log('quizPage id', id)
  let quiz = new Quiz(id);
  let answers = quiz.nextQuestion();
  let rightAnswer = quiz.rightAnswer;
  new Timer(id)

  if (quiz.type === 'pictures') return NextPictureComponent.render(answers, rightAnswer, id)
  else return NextArtistComponent.render(answers, rightAnswer, id)
  }
}

const TimerComponent = {
  render: (seconds,total) => {
    console.log('seconds',seconds,'total',total )
  let percent = (seconds/total)*100
  if (total == '0') return ''
  else  return `
  <div class="timer">
    <input class="timer__range" type="range" name="time" value="${seconds}" style="background: linear-gradient(
      to right,
      #ffbca2 0%,
      #ffbca2 ${percent}%,
      #a4a4a4 ${percent}%,
      #a4a4a4 100%
    );">
    <div class="timer__seconds">${seconds}</div>
  </div>
  `
  }
}

const NextArtistComponent = {
  render: (answers, rightAnswer, id) => {
    let images = answers.reduce( (html,item) => {
      return html + QuestionPictureComponent.render(item.imageNum, id)
    },'');
    return `
    <div class="quiz" id="artist-quiz">
      <div class="escape-cross escape-cross_top-left"></div>
      <h4 class="quiz__question">Какую картину написал ${rightAnswer.author}?</h4>
      <div class="wrapper_2-col">
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
    let names = answers.reduce( (html,item) => {
      return html + QuestionAuthorComponent.render(item, id)
    },'');
    return `
    <div class="quiz" id="artist-quiz">
      <div class="escape-cross escape-cross_top-left"></div>
      <h4 class="quiz__question">Назовите автора этой картины?</h4>
      <img class="quiz__img-question" src="./base-img/full/${rightAnswer.imageNum}full.jpg" alt="picture">
      <div class="wrapper_2-col">
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

const CheckAnswerComponent = {
  render: (answerImageNum, id) => {
    let quiz = new Quiz(id)
    let rightAnswer = quiz.rightAnswer;
    let isRight = false;
    if (answerImageNum === rightAnswer.imageNum)  {
      isRight = true;
      quiz.answeredRight++;
    }
    let href = `#/category/quiz&${id}`
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
    let timer = new Timer(id)
    timer.removeTimer()

    let quiz = new Quiz(id)
    let type = quiz.type;
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
          <button onclick="location.href = '#/category&${type}'" class="button button_modal">Categories</button>
          <button onclick="location.href = '#/category/quiz&${getNextId(id)}'" class="button button_colored button_modal">Next Quiz</button>
        </div>
      </div>
    </div>
    `;
  }
}

function getNextId(id) {
  let settings = new Settings()
  let index = settings.categories[settings.quizType].findIndex(item => item.id === id)
  if (index + 1 == settings.categories[settings.quizType].length) return settings.categories[settings.quizType][0].id
  else return settings.categories[settings.quizType][index + 1].id
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

const SettingsComponent = {
  render: () => {
    let settings = new Settings();
    settings.changeSettings();
    return `
    <div class="settings" id="settings-page"> 
    <h4 class="settings__header">Settings</h4>
    <div class="settings__container ">
      <h2 class="settings__title">Volume</h2>
      <input class="volume__range" type="range" name="volume" id="volume-range">
        <span class="volume__icon volume__icon_mute"></span>
        <span class="volume__icon volume__icon_speaker"></span>
    </div>
    <div class="settings__container">
      <h2 class="settings__title">Time game</h2>
      <div class="settings__time">
        <h2 class="settings__time-text">ON</h2>
        <div class="switch-btn switch-on" id="time-game"></div>
      </div>
    </div>
    <div class="settings__container" id="container-time-to-answer">
      <h2 class="settings__title">Time to answer</h2>
      <div class="settings__time">
        <button class="button button_set-time button_colored" onclick="this.nextElementSibling.stepDown()"></button>
        <input class="settings__input"   type="number" name="" id="time-to-answer" value="20" min="2" max="99">
        <button class="button button_set-time button_set-time_plus" onclick="this.previousElementSibling.stepUp()"></button>
      </div>
    </div>
    <div class="settings__container settings__container_buttons">
      <button class="button button_question" id="default-btn">Default</button>
      <button onclick="location.href = '#/'" class="button button_question button_colored">Home</button>
    </div>
  </div>
  ${FooterComponent.render()}
  <iframe style="display:none" id="frame" onload="" src=""></iframe>
    `
  }
}

// Routes 
const routes = [
  { path: '/', component: HomeComponent, },
  { path: '/modal/settings', component: SettingsComponent, },
  { path: '/category', component: CategoryComponent, },
  { path: '/category/quiz', component: QuizPage, },
  { path: '/category/quiz/header-timer', component: TimerComponent, },
  { path: '/modal/answer', component: CheckAnswerComponent, },
  { path: '/modal/result-quiz', component: QuizResultPage, },
];



export {routes};




