import ExecComponent from './ExecComponent.vue';

export default class ExecControl extends Rete.Control {
  constructor() {
   super("execcontrol");

   this.component = ExecComponent;

  }

}
