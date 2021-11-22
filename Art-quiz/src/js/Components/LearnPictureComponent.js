import { Settings } from "../Settings"
import { PlayAudio } from "../PlayAudio"

const LearnPictureComponent = {
  render: (categoryNumber, imageNum) => {

    const playAudio = new PlayAudio()
    playAudio.sound('openPage')

    const settings = new Settings()
    const category =  settings.categories[settings.quizType][categoryNumber]
    const imgDescription = category.imgData.find( img => img.imageNum == imageNum)
    const nextImageNum = category.imgData.find( img => img.imageNum == +imageNum+1) ? +imageNum + 1 : +category.imgData[0].imageNum;

    return `
    <div class="modal">
      <div class="modal__dialog-wrapper modal__dialog-wrapper_wide">
        <img class="modal__img" src="./base-img/full/${imgDescription.imageNum}full.jpg" alt="picture" >
        <h4 class="modal__picture-name">${imgDescription.name}</h4>
        <h4 class="modal__author">${imgDescription.author}, ${imgDescription.year}</h4>
        <div class="modal__buttons">
          <button onclick="location.href = '#/modal/cancel'" class="button button_modal">Cancel</button>
          <button onclick="location.href = '#/modal/learn-picture&${categoryNumber}&${nextImageNum}'" class="button button_colored button_modal">Next picture</button>
        </div>
      </div>
    </div>
    `
  }
}

export {LearnPictureComponent}