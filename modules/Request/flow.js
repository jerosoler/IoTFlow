//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var RequestControl = require('~/modules/Request/RequestControl.js').default;


var info = `
<b>Input</b><br>
- None<br>
<b>Output</b><br>
- body<br>
`;

export default  class RequestComponent extends Rete.Component {
  constructor(){
      super("Request");
      this.elementname = 'Request';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#8d4d8b';
      this.elementinput = true;
      this.elementoutput = true;
      this.info = info;
  }
  builder(node) {

    return node
    .addControl(new RequestControl())
    .addInput(new Rete.Input("Name", "input",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, "text","Url"))
    .addControl(new InfoControl(info, 'Request', node.id))
    .addOutput(new Rete.Output("Name",'output', strSocket));

  }


}
