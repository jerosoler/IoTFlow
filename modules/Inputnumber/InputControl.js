import InputComponent from './InputComponent.vue';

export default class InputNumberControl extends Rete.Control {
  constructor() {
   super("inputcontrolnumber");

   //this.template = "<p>hola</p>"
   this.component = InputComponent;



  }

}
