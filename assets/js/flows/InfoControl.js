import InfoComponent from './../../../components/InfoComponent.vue';

export default class InfoControl extends Rete.Control {
  constructor(text, title, id) {
   super("info");
        this.component = InfoComponent;
        this.props = { data: text, title: title, id: id };

  }
  setValue(val) {
       this.vueContext.value = val; // vueContext and
       this.update() // update() will be added after mounting of the component
   }

}
