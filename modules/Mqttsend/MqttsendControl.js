import MqttsendComponent from './MqttsendComponent.vue';

export default class MqttsendControl extends Rete.Control {
  constructor() {
   super("mqttsendcontrol");

   this.component = MqttsendComponent;

  }

}
