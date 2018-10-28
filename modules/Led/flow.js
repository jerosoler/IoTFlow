var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Input</b><br>
- Number: 0 - 255 (Brightness)<br>
- True<br>
- False<br>
- Toggle<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Led/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/led/">More info</a>
`;

export default class LedComponent extends Rete.Component {
  constructor(){
    super("Led");
    this.elementname = 'Led';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = true;
    this.elementoutput = false;
    this.info = info;
  }
  builder(node){
    return node.addControl(new InfoControl(info, 'Led', node.id)).addInput(new Rete.Input("String", "Led",  strSocket, true)).addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addInput(new Rete.Input("String", "Board",  strSocket, true)).addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
