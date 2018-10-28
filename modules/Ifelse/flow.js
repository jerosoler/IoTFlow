//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var IfelseControl = require('~/modules/Ifelse/IfelseControl.js').default;


var info = `
if(data == value) { Ouput UP } else { Output Down }<br>
<b>Input</b><br>
- data<br>
<b>Output</b><br>
- data<br>

`;

export default  class IfelseComponent extends Rete.Component {
  constructor(){
      super("Ifelse");
      this.elementname = 'If Else';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#8d4d8b';
      this.elementinput = true;
      this.elementoutput = true;
      this.elementoutputnum = 2;
      this.info = info;
  }
  builder(node) {

    return node
    .addControl(new IfelseControl())
    .addInput(new Rete.Input("Name", "input",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, "text","Value"))
    .addControl(new InfoControl(info, 'If Else', node.id))
    .addOutput(new Rete.Output("Name",'output', strSocket))
    .addOutput(new Rete.Output("Name2",'output', strSocket));

  }


}
