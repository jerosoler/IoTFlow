var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Input</b><br>
- Data<br>
HTML support
`;

export default class ReadComponent extends Rete.Component {
  constructor(){
    super("Read");
    this.elementname = 'Read';
    this.elementtype = 'Dashboard'; // Functions
    this.elementcolor = '#378132';
    this.elementinput = true;
    this.elementoutput = false;
    this.info = info;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Read', node.id))
    .addInput(new Rete.Input("String", "Read",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
 }

}
