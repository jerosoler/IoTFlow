//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var BotonControl = require('~/modules/Buttonio/BotonControl.js').default;

var info = `
<b>Output</b><br>
- True<br>
- False<br>
`;

export default  class ButtonComponent extends Rete.Component {
  constructor(){
      super("Buttonio");
      this.elementname = 'Button On/Off';
      this.elementtype = 'Dashboard'; // Functions
      this.elementcolor = '#378132';
      this.elementinput = false;
      this.elementoutput = true;
      this.info = info;
  }
  builder(node) {
    return node
    .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
    .addOutput(new Rete.Output("Name",'Buttonio', strSocket))
    .addControl(new InfoControl(info, 'Button on/off', node.id))
    .addControl(new BotonControl());


  }


}
