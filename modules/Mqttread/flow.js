//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var MqttreadControl = require('~/modules/Mqttread/MqttreadControl.js').default;


var info = `
<b>Input</b><br>
- None<br>
<b>Output</b><br>
- Payload<br>
`;

export default  class MqttreadComponent extends Rete.Component {
  constructor(){
      super("Mqttread");
      this.elementname = 'mqtt Read';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#8d4d8b';
      this.elementinput = false;
      this.elementoutput = true;
      this.info = info;
  }
  builder(node) {

    return node
    .addControl(new MqttreadControl())
    .addControl(new TextControl(this.editor, 'msg', false, "text","Topic"))
    .addControl(new InfoControl(info, 'mqtt Read', node.id))
    .addOutput(new Rete.Output("Name",'output', strSocket));

  }


}
