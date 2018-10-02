import SliderComponent from './SliderComponent.vue';

export default class SliderControl extends Rete.Control {
  constructor() {
   super("slidercontrol");

   //this.template = "<p>hola</p>"
   this.component = SliderComponent;



  }

}
