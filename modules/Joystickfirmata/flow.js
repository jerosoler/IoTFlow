var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Ouput</b><br>
- data [From -1 to 1]<br>
- Output 1 (x)<br>
- Output 2 (y)<br>
- For Button use "Button Firmata"<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Joystickfirmata/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/joystick/">More info</a>
`;

export default class JoystickfirmataComponent extends Rete.Component {
  constructor(){
    super("Joystickfirmata");
    this.elementname = 'Joystick Firmata';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.elementoutputnum = 2;
    this.info = info;
  }
  builder(node){
    return node
    .addOutput(new Rete.Output("Name",'Joystickfirmata', strSocket))
    .addOutput(new Rete.Output("Name2",'Joystickfirmata', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new TextControl(this.editor, 'msg2', false, 'pin', "PIN"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"))
    .addControl(new InfoControl(info, 'Joystick Firmata', node.id));
 }

}
