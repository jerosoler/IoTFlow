import CronComponent from './CronComponent.vue';

export default class CronControl extends Rete.Control {
  constructor() {
   super("croncontrol");

   //this.template = "<p>hola</p>"
   this.component = CronComponent;



  }

}
