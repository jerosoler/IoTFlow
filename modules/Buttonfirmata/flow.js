var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Ouput</b><br>
- true<br>
- Output 1 (down)<br>
- Output 2 (up)<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Buttonfirmata/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/button/">More info</a>
`;

export default class ButtonFirmataComponent extends Rete.Component {
  constructor(){
    super("Buttonfirmata");
    this.elementname = 'Button Firmata';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.elementoutputnum = 2;
    this.info = info;
  }
  builder(node){
    return node
    .addOutput(new Rete.Output("Name",'Button Firmata', strSocket))
    .addOutput(new Rete.Output("Name2",'output', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"))
    .addControl(new InfoControl(info, 'Button Firmata', node.id));
 }

}
