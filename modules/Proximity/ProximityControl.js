import ProximityComponent from './ProximityComponent.vue';

export default class ProximityControl extends Rete.Control {
  constructor(emitter, key, readonly, type = 'text', placeholder) {
          super(key);
          this.emitter = emitter;
           this.key = key;
           this.component = ProximityComponent;
           this.props = { emitter, ikey: key, readonly, type: type, placeholder: placeholder, that: this};
       }

  setValue(val) {
       this.component.value = val; // vueContext and
       this.update() // update() will be added after mounting of the component
   }


}
