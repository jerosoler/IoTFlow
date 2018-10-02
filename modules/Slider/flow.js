//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var SliderControl = require('~/modules/Slider/SliderControl.js').default;


var info = `
<b>Output</b><br>
- Number<br>
<b>Config</b><br>
- Min<br>
- Max<br>
`;

export default  class SliderComponent extends Rete.Component {
  constructor(){
      super("Slider");
      this.elementname = 'Slider';
      this.elementtype = 'Dashboard'; // Functions
      this.elementcolor = '#378132';
      this.elementinput = false;
      this.elementoutput = true;
  }
  builder(node) {
    return node
          .addControl(new TextControl(this.editor, 'msg', false, "text","Name"))
          .addControl(new TextControl(this.editor, 'min', false, "number", 0))
          .addControl(new TextControl(this.editor, 'max', false, "number", 255))
          .addOutput(new Rete.Output("Name",'Slider', strSocket))
          .addControl(new SliderControl())
          .addControl(new InfoControl(info, 'Slider', node.id));


  }


}
