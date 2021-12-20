import Modal from './Modal';

export default class InfoWindow extends Modal {
  
  constructor(parentElement:HTMLElement, title:string, description: string){
    super(parentElement, title, description, ['modal', 'modal_warning'], false);

  }
}