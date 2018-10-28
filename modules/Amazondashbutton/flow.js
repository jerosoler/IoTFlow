//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;

var info = `
<b>Output</b><br>
- Toggle<br>
<img src="`+require('~/modules/Amazondashbutton/imagen.jpg')+`" width="300px;">
`;

export default  class AmazondashbuttonComponent extends Rete.Component {
  constructor(){
      super("Amazondashbutton");
      this.elementname = 'Amazon Dash Button';
      this.elementtype = 'Devices'; // Functions
      this.elementcolor = '#8b9fff';
      this.elementinput = false;
      this.elementoutput = true;
      this.info = info;

  }
  builder(node) {
    return node
    .addControl(new TextControl(this.editor, 'msg', false, "text","MAC"))
    .addOutput(new Rete.Output("Name", "Input", strSocket))
    .addControl(new InfoControl(info, 'Amazon Dash Button', node.id));

  }


}
