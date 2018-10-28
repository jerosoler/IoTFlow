//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var ExecControl = require('~/modules/Exec/ExecControl.js').default;


var info = `
<b>Input</b><br>
- data<br>
<b>Output</b><br>
- data<br>
<b>Examples</b><br>
-echo hello world <br>
-echo hello world '+data+'<br>
`;

export default  class ExecComponent extends Rete.Component {
  constructor(){
      super("Exec");
      this.elementname = 'Exec';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#8d4d8b';
      this.elementinput = true;
      this.elementoutput = true;
      this.info = info;
  }
  builder(node) {

    return node
    .addControl(new ExecControl())
    .addInput(new Rete.Input("Name", "input",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, "text","echo Hello World"))
    .addControl(new InfoControl(info, 'Exec', node.id))
    .addOutput(new Rete.Output("Name",'output', strSocket));

  }


}
