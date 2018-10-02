export default class TextControl extends Rete.Control {

    constructor(emitter, key, readonly, type = 'text', placeholder) {
        super();
        this.emitter = emitter;
        this.key = key;
        this.type = type;
        if(type == "textarea")  {
        this.template = `<textarea :readonly="readonly" :value="value" @input="change($event)"/ placeholder="${placeholder}" name="${key}"></textarea>`;
        } else {
        this.template = `<input type="${type}" :readonly="readonly" :value="value" @input="change($event)"/ placeholder="${placeholder}" name="${key}">`;
        }


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
        //this.scope.value = this.getData(this.key) || (this.type === 'number' ? 0 : '...');
        this.scope.value = this.getData(this.key)
        this.update();
    }

    setValue(val) {
        this.scope.value = val;
        this._alight.scan()
    }
}
