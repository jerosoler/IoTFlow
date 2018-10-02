//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Input</b><br>
- data<br>
<b>Output</b><br>
- return<br>
<b>Example:</b><br>
<pre style="background: beige;    border-radius: 4px;    padding: 5px">
if(data > 48) {
return true;
} else {
return false;
}</pre>
`;

export default  class FunctionComponent extends Rete.Component {
  constructor(){
      super("Function");
      this.elementname = 'Functions';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#8d4d8b';
      this.elementinput = true;
      this.elementoutput = true;
  }
  builder(node) {

    return node.addControl(new InfoControl(info, 'Function', node.id)).addControl(new TextControl(this.editor, 'msg', false, "textarea", "return data;")).addInput(new Rete.Input("Name", "input",  strSocket, true)).addOutput(new Rete.Output("Name",'output', strSocket));

  }


}
