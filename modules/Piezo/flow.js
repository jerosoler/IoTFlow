var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Input</b><br>
- True<br>
- False<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Piezo/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/piezo/">More info</a>
`;

export default class PiezoComponent extends Rete.Component {
  constructor(){
    super("Piezo");
    this.elementname = 'Piezo';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = true;
    this.elementoutput = false;
    this.info = info;
  }
  builder(node){
    return node.addControl(new InfoControl(info, 'Piezo', node.id)).addInput(new Rete.Input("String", "Piezo",  strSocket, true)).addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addInput(new Rete.Input("String", "Board",  strSocket, true)).addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
