import DelayComponent from './DelayComponent.vue';

export default class DelayControl extends Rete.Control {
  constructor() {
   super("delaycontrol");

   //this.template = "<p>hola</p>"
   this.component = DelayComponent;



  }

}
