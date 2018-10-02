//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var DelayControl = require('~/modules/Delay/DelayControl.js').default;

var info = `
<b>Input</b><br>
- data<br>
<b>Output</b><br>
- data<br>
<b>Configuration:</b><br>
Miliseconds
`;

export default  class DelayComponent extends Rete.Component {
  constructor(){
      super("Delay");
      this.elementname = 'Delay';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#f5ab3e';
      this.elementinput = true;
      this.elementoutput = true;
  }
  builder(node) {

    return node
    .addControl(new DelayControl())
    .addInput(new Rete.Input("Name", "input",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, "number", 0))
    .addControl(new InfoControl(info, 'Delay', node.id))
    .addOutput(new Rete.Output("Name",'output', strSocket));


  }


}
