import BoardComponent from './../../../components/BoardComponent.vue';



export default class BoardControlVue extends Rete.Control {
  constructor(emitter, key, readonly, type = 'select', placeholder) {
          super(key);
          this.emitter = emitter;
           this.key = key;
           this.component = BoardComponent;
           this.props = { emitter, ikey: key, readonly, type: type, placeholder: placeholder, that: this};
       }

  setValue(val) {
       this.component.value = val; // vueContext and
       this.update() // update() will be added after mounting of the component
   }

}
