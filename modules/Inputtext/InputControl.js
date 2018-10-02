import InputComponent from './InputComponent.vue';

export default class InputControl extends Rete.Control {
  constructor() {
   super("inputcontrol");

   //this.template = "<p>hola</p>"
   this.component = InputComponent;



  }

}
