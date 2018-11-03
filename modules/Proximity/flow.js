var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var ProximityControl = require('~/modules/Proximity/ProximityControl.js').default;



var info = `
<span style="color:red;">* Require PingFirmata</span><br>
- Ping Firmata <a target="_blanck" href="https://gist.githubusercontent.com/rwaldron/0519fcd5c48bfe43b827/raw/f17fb09b92ed04722953823d9416649ff380c35b/PingFirmata.ino">Download</a><br>
<b>Ouput</b><br>
- Number (In cm)<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Proximity/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/proximity/">More info</a>
`;

export default class PinreadComponent extends Rete.Component {
  constructor(){
    super("Proximity");
    this.elementname = 'Proximity';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.info = info;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Proximity', node.id))
    .addOutput(new Rete.Output("Name",'Proximity', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new ProximityControl(this.editor, 'controller', false, 'relay', "Controller"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
