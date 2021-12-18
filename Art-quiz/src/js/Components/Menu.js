import { Settings } from "../Settings";

const Menu = {
  render: () => {
    let settings = new Settings()
    return `
    <div class="menu">
      <a href="#/">
        <h4 class="menu__icon icon_home" id="home-link">Home</h4>
      </a>
      <a href="#/category&${settings.quizType}">
      <h4 class="menu__icon icon_categories" id="categories-link">Categories</h4>
      </a>
      <a href="#/score">
      <h4 class="menu__icon icon_score" id="score-link">Score</h4>
      </a>
    </div>
    `;
  }
} 

export {Menu}