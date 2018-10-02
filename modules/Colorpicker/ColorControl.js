import ColorComponent from './ColorComponent.vue';

export default class ColorControl extends Rete.Control {
  constructor() {
   super("color");

   //this.template = "<p>hola</p>"
   this.component = ColorComponent;



  }

}
