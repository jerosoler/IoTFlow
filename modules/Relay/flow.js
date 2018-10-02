var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var RelayControl = require('~/modules/Relay/RelayControl.js').default;


var info = `
<b>Input</b><br>
- True<br>
- False<br>
- Toggle<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Relay/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/relay/">More info</a>
`;

export default class RelayComponent extends Rete.Component {
  constructor(){
    super("Relay");
    this.elementname = 'Relay';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = true;
    this.elementoutput = false;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Relay', node.id))
    .addInput(new Rete.Input("String", "Pin",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new RelayControl(this.editor, 'type', false, 'relay', "TYPE"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
