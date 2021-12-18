const ScoreWarningComponent = {
  render: () => {
    return `
    <div class="modal">
      <div class="modal__dialog-wrapper">
        <h2 class="modal__text">You should play this category first?</h2>
        <button onclick="location.href = '#/modal/cancel'" class="button button_question button_colored">Cancel</button>
      </div>
    </div>
    `;
  }
}

export {ScoreWarningComponent}