export default class BoardControl extends Rete.Control {

    constructor(emitter, key, readonly, type = 'select') {
        super();
        this.emitter = emitter;
        this.key = key;
        this.type = type;
        var text = '';
        var values = require('./../../../files/boards.json').boards;
        values.forEach(function(a,i) {
          text += `<option value="`+a.name+`">`+a.name+`</option>`;
          //this.template += ``;
        });
        this.template = `
        <select name="boards":readonly="readonly" :value="value" @input="change($event)" >
        `;
        this.template += text;
        this.template += `
        </select>
        `;

        this.scope = {
            value: null,
            readonly,
            change: this.change.bind(this)
        };
    }

    onChange() {}

    change(e) {
        this.scope.value = this.type === 'number' ? +e.target.value : e.target.value;
        this.update();
        this.onChange();
    }

    update() {
        if (this.key)
            this.putData(this.key, this.scope.value)
        this.emitter.trigger('process');
        this._alight.scan();
    }

    mounted() {
        this.scope.value = this.getData(this.key) || (this.type === 'number' ? 0 : '...');
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}
