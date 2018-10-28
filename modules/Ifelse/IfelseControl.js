import IfelseComponent from './IfelseComponent.vue';

export default class IfelseControl extends Rete.Control {
  constructor() {
   super("ifelsecontrol");

   this.component = IfelseComponent;

  }

}
