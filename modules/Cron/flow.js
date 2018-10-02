//var strSocket = new Rete.Socket('String');
var strSocket = require('~/assets/js/flows/strsockets.js').strSocket;
var TextControl = require('~/assets/js/flows/TextControlVue.js').default;
var InfoControl = require('~/assets/js/flows/InfoControl.js').default;
var CronControl = require('~/modules/Cron/CronControl.js').default;

var info = `
<b>Output</b><br>
- None<br>
<b>Configuration:</b><br>
<pre><code> # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
</code></pre>
<a target="_blanck" href="https://www.npmjs.com/package/node-cron">More info</a>
`;

export default  class CronComponent extends Rete.Component {
  constructor(){
      super("Cron");
      this.elementname = 'Cron';
      this.elementtype = 'Functions'; // Functions
      this.elementcolor = '#f5ab3e';
      this.elementinput = true;
      this.elementoutput = true;
  }
  builder(node) {

    return node
    .addControl(new CronControl())
    .addControl(new TextControl(this.editor, 'msg', false, "text","*"))
    .addControl(new TextControl(this.editor, 'msg2', false, "text","*"))
    .addControl(new TextControl(this.editor, 'msg3', false, "text","*"))
    .addControl(new TextControl(this.editor, 'msg4', false, "text","*"))
    .addControl(new TextControl(this.editor, 'msg5', false, "text","*"))
    .addControl(new TextControl(this.editor, 'msg6', false, "text","*"))
    .addControl(new InfoControl(info, 'Cron', node.id))
    .addOutput(new Rete.Output("Name",'output', strSocket));


  }


}
