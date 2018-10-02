<template>
  <div v-if="type === 'text'">
  <el-input v-model="value"  @change="update()" :placeholder="placeholder" size="small"></el-input>
  </div>
  <div v-else-if="type === 'number'">
      <el-input-number class="number" v-model="value"  controls-position="right" @change="update()"  size="small"></el-input-number>
  </div>
  <div v-else-if="type === 'pin'">
    <el-select v-model="value" :placeholder="placeholder" @change="update()" size="small">
     <el-option
       v-for="item in values"
       :key="item.value"
       :label="item.label"
       :value="item.value">
     </el-option>
   </el-select>
  </div>
  <div v-else-if="type === 'textarea'">
    <el-input type="textarea" v-model="value"  @change="update()" :placeholder="placeholder" ></el-input>
  </div>
</template>

<script>
export default {
  props: ['readonly', 'emitter', 'ikey', 'type', 'placeholder', 'that'],
   data() {
        return {
            value: 0,
            values: [
              {
                value: 'A0',
                label: 'Analog 0'
              },
              {
                value: 'A1',
                label: 'Analog 1'
              },
              {
                value: 'A2',
                label: 'Analog 2'
              },
              {
                value: 'A3',
                label: 'Analog 3'
              },
              {
                value: 'A4',
                label: 'Analog 4'
              },
              {
                value: 'A5',
                label: 'Analog 5'
              },
              {
                value: 'A6',
                label: 'Analog 6'
              },
              {
                value: 'A7',
                label: 'Analog 7'
              },
              {
                value: 'A8',
                label: 'Analog 8'
              },
              {
                value: 'A9',
                label: 'Analog 9'
              },

              {
                value: 1,
                label: 'Digital 1'
              },
              {
                value: 2,
                label: 'Digital 2'
              },
              {
                value: 3,
                label: 'Digital 3'
              },
              {
                value: 4,
                label: 'Digital 4'
              },
              {
                value: 5,
                label: 'Digital 5'
              },
              {
                value: 6,
                label: 'Digital 6'
              },
              {
                value: 7,
                label: 'Digital 7'
              },
              {
                value: 8,
                label: 'Digital 8'
              },
              {
                value: 9,
                label: 'Digital 9'
              },
              {
                value: 10,
                label: 'Digital 10'
              },
              {
                value: 11,
                label: 'Digital 11'
              },
              {
                value: 12,
                label: 'Digital 12'
              },
              {
                value: 13,
                label: 'Digital 13'
              },
              {
                value: 14,
                label: 'Digital 14'
              },
              {
                value: 15,
                label: 'Digital 15'
              },
              {
                value: 16,
                label: 'Digital 16'
              },
              {
                value: 17,
                label: 'Digital 17'
              },
              {
                value: 18,
                label: 'Digital 18'
              },
              {
                value: 19,
                label: 'Digital 19'
              },
              {
                value: 20,
                label: 'Digital 20'
              },
              {
                value: 21,
                label: 'Digital 21'
              },
              {
                value: 22,
                label: 'Digital 22'
              },
              {
                value: 23,
                label: 'Digital 23'
              },
              {
                value: 24,
                label: 'Digital 24'
              },
              {
                value: 25,
                label: 'Digital 25'
              },
              {
                value: 26,
                label: 'Digital 26'
              },
              {
                value: 27,
                label: 'Digital 27'
              },
              {
                value: 28,
                label: 'Digital 28'
              },
              {
                value: 29,
                label: 'Digital 29'
              },


            ]
        }
   },
  methods: {
       update() {
          if (this.ikey)
            this.that.putData(this.ikey, this.value)
            this.that.emitter.trigger('process');
      }
    },
    mounted() {
      this.value = this.that.getData(this.ikey);
      if(this.type === 'number' && this.value === undefined) {
        console.log("test" + this.placeholder);
        this.value = this.placeholder;
          this.that.putData(this.ikey, this.value);
      }
    }
}
</script>
<style scoped>

</style>
