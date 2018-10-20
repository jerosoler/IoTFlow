import MqttreadComponent from './MqttreadComponent.vue';

export default class MqttreadControl extends Rete.Control {
  constructor() {
   super("mqttreadcontrol");

   this.component = MqttreadComponent;

  }

}
