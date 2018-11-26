//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var MqttsendControl = require('~/modules/Mqttsend/MqttsendControl.js').default;


var info = `
<b>Input</b><br>
- NULL pass data or input value<br>
`;

export default  class MqttsendComponent extends Rete.Component {
  constructor(){
      super("Mqttsend");
      this.elementname = 'mqtt Send';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#8d4d8b';
      this.elementinput = true;
      this.elementoutput = false;
      this.info = info;
  }
  builder(node) {

    return node
    .addControl(new InfoControl(info, 'mqtt Send', node.id))
    .addInput(new Rete.Input("Name", "input",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, "text","Topic"))
    .addControl(new TextControl(this.editor, 'msg2', false, "text","Payload"))
    .addControl(new MqttsendControl());


  }


}
