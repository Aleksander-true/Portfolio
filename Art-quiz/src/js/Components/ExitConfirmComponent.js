import { Quiz } from "../Quiz";

const ExitConfirmComponent = {
  render: (id) => {
    let quiz = new Quiz()

    return `
    <div class="modal">
      <div class="modal__dialog-wrapper">
        <h4 class="modal__text">Do you want to quite the game?</h4>
        <div class="modal__buttons">
          <button onclick="location.href = '#/modal/cancel&${id}'" class="button button_modal">Cancel</button>
          <button onclick="location.href = '#/category&${quiz.type}'" class="button button_colored button_modal">Quit</button>
        </div>
      </div>
    </div>
    `;
  }
}

export {ExitConfirmComponent}