import { Quiz } from "./Quiz";
import { settings } from "./Settings";

console.log('components START')


// Components
const HomeComponent = {
  render: () => {
    return `
    ${HeaderComponent.render()}
    <main class="main-page" id="main-page">
      <div class="main-page__menu" id="main-page-menu">
        <div class="logo"></div>
        <a href="#/category-artist">
          <button class="button" id="artist-quiz-btn">Artist quiz</button>
        </a>
        <a href="#/category-pictures">
          <button class="button" id="picture-quiz-btn">Pictures quiz</button>
        </a>
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
  //if (quiz.isLastQuestion) return QuizResultPage.render(id);
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
        <a href="${href}">
          <button class="button button_colored button_modal" id="next-btn">Next</button>
        </a>
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
        <a href="#/">
          <button class="button button_modal" id="home-btn">Home</button>
        </a>
        <a href="#/category-artist">
          <button class="button button_colored button_modal"  id="next-quiz-btn">Next Quiz</button>
        </a>
        </div>
      </div>
    </div>
    `;
  }
}

const Page2Component = {
  render: () => {
    return `
      <section>
        <h1>Page 2</h1>
        <p>This is just a test</p>
      </section>
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
  { path: '/page2', component: Page2Component, },
];

function parseLocation () {
  console.log('location.hash', location.hash)
  let pathStr = location.hash.slice(1).toLowerCase() || '/';
  if (pathStr.includes('&')) return pathStr.split('&')
  else return [pathStr, null]
} 

function findComponentByPath (path, routes) {
  let regexp = new RegExp(`^\\${path}$`, 'gm')
  return routes.find(route => route.path.match(regexp)) || undefined;
}

const router = () => {
  const mainPage = document.getElementById('main-page')
  const coverPage = document.getElementById('cover-page')

  const [path, ...param] = parseLocation();
  console.log('path', path, 'param', param)
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {};

  if (path.includes('modal')) coverPage.innerHTML = component.render(...param);
  else {
    coverPage.innerHTML = '';
    mainPage.innerHTML = component.render(...param);
  }
  /*
  coverPage.addEventListener('animationend', (event, html) => {
    mainPage.innerHTML = html;
    coverPage.innerHTML = 'hgtrh';
  })
  */

};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);