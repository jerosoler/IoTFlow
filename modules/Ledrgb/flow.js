var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Input</b><br>
- Number: 0 - 100 (Intensity)<br>
- True<br>
- False<br>
- Toggle<br>
- Color hexa<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Ledrgb/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/led.rgb/">More info</a>
`;

export default class LedrgbComponent extends Rete.Component {
  constructor(){
    super("Ledrgb");
    this.elementname = 'Led RGB';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = true;
    this.elementoutput = false;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Led RGB', node.id))
    .addInput(new Rete.Input("String", "Led",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN R"))
    .addControl(new TextControl(this.editor, 'msg2', false, 'pin', "PIN G"))
    .addControl(new TextControl(this.editor, 'msg3', false, 'pin', "PIN B"))
    .addInput(new Rete.Input("String", "Board",  strSocket, true))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
