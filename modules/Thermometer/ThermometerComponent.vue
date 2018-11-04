<template>
    <el-select v-model="value" :placeholder="placeholder" @change="update()" size="small">
     <el-option
       v-for="item in values"
       :key="item.value"
       :label="item.value"
       :value="item.value">
     </el-option>
   </el-select>

</template>

<script>
export default {
  props: ['readonly', 'emitter', 'ikey', 'type', 'placeholder', 'that'],
   data() {
        return {
            value: 'LM35',
            values: [
              {
                value: 'LM35',
              },
              {
                value: 'TMP36',
              },
              {
                value: 'DS18B20',
              },
              {
                value: 'TMP102',
              },
              {
                value: 'MPU6050',
              },
              {
                value: 'MPL115A2',
              },
              {
                value: 'MPL3115A2',
              },
              {
                value: 'BMP180',
              },
              {
                value: 'HTU21D',
              },
              {
                value: 'HIH6130',
              },
              {
                value: 'MCP9808',
              },
              {
                value: 'MS5611',
              },
              {
                value: 'TH02',
              },
              {
                value: 'DHT11_I2C_NANO_BACKPACK',
              },
              {
                value: 'DHT21_I2C_NANO_BACKPACK',
              },
              {
                value: 'DHT22_I2C_NANO_BACKPACK',
              },
              {
                value: 'SI7020',
              },
              {
                value: 'SI7021',
              },
              {
                value: 'LSM303C',
              }  
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

    }
}
</script>
<style scoped>

</style>
