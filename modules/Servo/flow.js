var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Input</b><br>
- Number: 0 - 180 (Degrees)<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Servo/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/servo/">More info</a>
`;

export default class ServoComponent extends Rete.Component {
  constructor(){
    super("Servo");
    this.elementname = 'Servo';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = true;
    this.elementoutput = false;
    this.info = info;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Servo', node.id))
    .addInput(new Rete.Input("String", "Servo",  strSocket, true))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
