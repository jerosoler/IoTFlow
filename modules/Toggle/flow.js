//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var ToggleControl = require('~/modules/Toggle/ToggleControl.js').default;

var info = `
<b>Output</b><br>
- Toggle
`;

export default  class ToggleComponent extends Rete.Component {
  constructor(){
      super("Toggle");
      this.elementname = 'Toggle';
      this.elementtype = 'Dashboard'; // Functions
      this.elementcolor = '#378132';
      this.elementinput = false;
      this.elementoutput = true;
      this.info = info;
  }
  builder(node) {
    return node
    .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
    .addOutput(new Rete.Output("Name", "Toggle", strSocket))
    .addControl(new ToggleControl())
    .addControl(new InfoControl(info, 'Toggle', node.id));

  }


}
