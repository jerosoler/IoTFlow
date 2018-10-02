import RequestComponent from './RequestComponent.vue';

export default class RequestControl extends Rete.Control {
  constructor() {
   super("requestcontrol");

   this.component = RequestComponent;

  }

}
