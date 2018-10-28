//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var BotonControl = require('~/modules/Buttonpress/BotonControl.js').default;

var info = `
<b>Output</b><br>
- True (Press)<br>
- False (Hold)<br>
`;

export default  class ButtonpressComponent extends Rete.Component {
  constructor(){
      super("Buttonpress");
      this.elementname = 'Button Press';
      this.elementtype = 'Dashboard'; // Functions
      this.elementcolor = '#378132';
      this.elementinput = false;
      this.elementoutput = true;
      this.info = info;
  }
  builder(node) {
    return node
    .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
    .addOutput(new Rete.Output("Name",'Buttonpress', strSocket))
    .addControl(new InfoControl(info, 'Button Press', node.id))
    .addControl(new BotonControl());


  }


}
