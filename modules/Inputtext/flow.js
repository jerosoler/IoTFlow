//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var InputControl = require('~/modules/Inputtext/InputControl.js').default;

var info = `
<b>Output</b><br>
- Text
`;

export default  class InputtextComponent extends Rete.Component {
  constructor(){
      super("Inputtext");
      this.elementname = 'Input Text';
      this.elementtype = 'Dashboard'; // Functions
      this.elementcolor = '#378132';
      this.elementinput = false;
      this.elementoutput = true;
  }
  builder(node) {
    return node
    .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
    .addOutput(new Rete.Output("Name", "Input", strSocket))
    .addControl(new InputControl())
    .addControl(new InfoControl(info, 'Input text', node.id));

  }


}
