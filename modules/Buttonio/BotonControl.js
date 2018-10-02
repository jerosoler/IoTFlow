import BotonComponent from './BotonComponent.vue';

export default class BotonControl extends Rete.Control {
  constructor() {
   super("botoncontrol");

   //this.template = "<p>hola</p>"
   this.component = BotonComponent;



  }

}
