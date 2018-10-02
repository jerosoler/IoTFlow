import TextComponent from './../../../components/TextComponent.vue';



export default class TextControlVue extends Rete.Control {
  constructor(emitter, key, readonly, type = 'text', placeholder) {
          super(key);
          this.emitter = emitter;
           this.key = key;
           this.component = TextComponent;
           this.props = { emitter, ikey: key, readonly, type: type, placeholder: placeholder, that: this};
       }

  setValue(val) {
       this.component.value = val; // vueContext and
       this.update() // update() will be added after mounting of the component
   }

}
