import BotonComponent from './BotonComponent.vue';

export default class BotonpressControl extends Rete.Control {
  constructor() {
   super("botoncontrolpress");

   //this.template = "<p>hola</p>"
   this.component = BotonComponent;



  }

}
