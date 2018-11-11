var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;


var info = `
<b>Call</b><br>
Alexa Name [on/off]<br>
<b>Ouput</b><br>
- true<br>
- Output 1 (On)<br>
- Output 2 (Off)<br>
<b>Configure:</b><br>
- Name (For call)<br>
- Port (Different port for each device)<br>
<img src="`+require('~/modules/Alexa/icon.png')+`" "><br>
* Simulates a wemo device
<a target="_blanck" href="https://github.com/dhleong/wemore">More info</a>
`;

export default class AlexaComponent extends Rete.Component {
  constructor(){
    super("Alexa");
    this.elementname = 'Alexa';
    this.elementtype = 'Devices'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.elementoutputnum = 2;
    this.info = info;
  }
  builder(node){
    return node
    .addOutput(new Rete.Output("Name",'Alexa', strSocket))
    .addOutput(new Rete.Output("Name2",'output', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'text', "Name"))
    .addControl(new TextControl(this.editor, 'msg2', false, 'number', "Port"))
    .addControl(new InfoControl(info, 'Button Firmata', node.id));
 }

}
