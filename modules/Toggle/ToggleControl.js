import ToggleComponent from './ToggleComponent.vue';

export default class ToggleControl extends Rete.Control {
  constructor() {
   super("togglecontrol");

   //this.template = "<p>hola</p>"
   this.component = ToggleComponent;



  }

}
