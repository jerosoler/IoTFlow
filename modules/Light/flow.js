var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Ouput</b><br>
- data [From 0 to 1]<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Light/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/light/">More info</a>
`;

export default class PinreadComponent extends Rete.Component {
  constructor(){
    super("Light");
    this.elementname = 'Light';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.info = info;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Light', node.id))
    .addOutput(new Rete.Output("Name",'Light', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
