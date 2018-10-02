//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var ColorControl = require('~/modules/Colorpicker/ColorControl.js').default;

var info = `
<b>Output</b><br>
- Color Hexa<br>
<b>Example</b><br>
- #FFFFFF
`;

export default  class ColorpickerComponent extends Rete.Component {
  constructor(){
      super("Colorpicker");
      this.elementname = 'Color Picker';
      this.elementtype = 'Dashboard'; // Functions
      this.elementcolor = '#378132';
      this.elementinput = false;
      this.elementoutput = true;
  }
  builder(node) {
    return node

    .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
    .addOutput(new Rete.Output("Name",'Colorpicker', strSocket))
    .addControl(new InfoControl(info, 'Color Select', node.id))
    .addControl(new ColorControl());

  }


}
