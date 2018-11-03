var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Ouput</b><br>
- true<br>
- Output 1 (open)<br>
- Output 2 (close)<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Switchfirmata/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/switch/">More info</a>
`;

export default class SwitchFirmataComponent extends Rete.Component {
  constructor(){
    super("Switchfirmata");
    this.elementname = 'Switch Firmata';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.elementoutputnum = 2;
    this.info = info;
  }
  builder(node){
    return node
    .addOutput(new Rete.Output("Name",'Switch Firmata', strSocket))
    .addOutput(new Rete.Output("Name2",'output', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"))
    .addControl(new InfoControl(info, 'Switch Firmata', node.id));
 }

}
