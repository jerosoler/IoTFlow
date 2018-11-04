var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var BoardControl = require('~/assets/js/flows/BoardControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var ThermometerControl = require('~/modules/Thermometer/ThermometerControl.js').default;



var info = `
<b>Ouput</b><br>
- Number (Celsius)<br>
<b>Connection:</b><br>
<img src="`+require('~/modules/Thermometer/image.png')+`" width="300px;"><br>
<a target="_blanck" href="http://johnny-five.io/api/thermometer/">More info</a>
`;

export default class ThermometerComponent extends Rete.Component {
  constructor(){
    super("Thermometer");
    this.elementname = 'Thermometer';
    this.elementtype = 'Firmata'; // Functions
    this.elementcolor = '#8b9fff';
    this.elementinput = false;
    this.elementoutput = true;
    this.info = info;
  }
  builder(node){
    return node
    .addControl(new InfoControl(info, 'Thermometer', node.id))
    .addOutput(new Rete.Output("Name",'Thermometer', strSocket))
    .addControl(new TextControl(this.editor, 'msg', false, 'pin', "PIN"))
    .addControl(new ThermometerControl(this.editor, 'controller', false, 'relay', "Controller"))
    .addControl(new BoardControl(this.editor, 'board', false, 'select', "Board"));
 }

}
