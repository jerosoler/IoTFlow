<template>
  <div>
  <div class="container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Boards</span>
      <el-button class="newboard"  type="success" style="float: right;" icon="el-icon-circle-plus" circle @click="dialogFormVisible = true"></el-button>
    </div>
    <el-table
      :data="lista"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name"
        width="180" sortable >
      </el-table-column>
      <el-table-column
        prop="com"
        label="Com"
        width="180" sortable >
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
        width="180" sortable>
      </el-table-column>
      <el-table-column
        prop="port"
        label="PORT" sortable>
      </el-table-column>
      <el-table-column
      label="Delete">
       <template slot-scope="scope">
           <el-button
             size="mini"
             type="danger"
            @click="handleDelete(scope.$index, scope.row.name)" >Delete</el-button>
       </template>
      </el-table-column>
    </el-table>
  </el-card>
  <br>
  <el-button type="primary" @click="restartboards()">Restart Boards</el-button>
  <br>
  <br>
  <el-button type="primary" @click="backup()">Backup</el-button>


  <el-dialog title="New board" :visible.sync="dialogFormVisible">
   <el-form :model="form">
     <el-form-item label="Name">
       <el-input v-model="form.name" auto-complete="off" placeholder="A"></el-input>
     </el-form-item>

     <el-radio-group v-model="form.radio">
      <el-radio label="USB">StandardFirmata (USB)
        <el-tooltip class="item" effect="dark" content="Not autoreconnect" placement="top-start">
         <i class="el-icon-warning"></i>
       </el-tooltip>
     </el-radio>
      <el-radio label="WIFI">StandardFirmataWifi</el-radio>
      <el-radio label="RASPI">Raspberry Local
        <el-tooltip class="item" effect="dark" content="Only one" placement="top-start">
         <i class="el-icon-warning"></i>
       </el-tooltip>
      </el-radio>
    </el-radio-group>
    <br>
    <br>




     <div v-if="form.radio == 'WIFI'">
       <el-form-item label="IP">
         <el-input v-model="form.ip" auto-complete="off" placeholder="192.168.1.20"></el-input>
       </el-form-item>
       <el-form-item label="Port">
         <el-input v-model="form.port" auto-complete="off" placeholder="3030"></el-input>
       </el-form-item>
    </div>
    <div v-if="form.radio == 'USB'">
       <el-form-item>
         <label>
         <el-tooltip class="item" effect="dark" content="Com not autoreconnect" placement="top-start">
           <i class="el-icon-warning"></i>
         </el-tooltip>
          Com </label>
         <el-select v-model="form.com" filterable placeholder="Select" >
          <el-option
            v-for="item in listacom"
            :key="item.comName"
            :label="item.comName"
            :value="item.comName">
          </el-option>
        </el-select>
       </el-form-item>



    </div>

   </el-form>
   <span slot="footer" class="dialog-footer">
     <el-button @click="dialogFormVisible = false">Cancel</el-button>
     <el-button type="primary" @click="addcard()">Confirm</el-button>
   </span>
 </el-dialog>

  </div>
  <el-footer><i class="fa fa-code" style="font-weight:bold;"></i> with <i class="fa fa-heart" style="color:red;"></i> By <a href="https://twitter.com/jerosoler" target="_blank" style="color:white; text-decoration:none;font-weight:bold;">Jero Soler</a></el-footer>

</div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    var lista = await app.$axios.$get('listboards');
    var listacom = await app.$axios.$get('listcom');
    return { lista, listacom }
  },
  data() {
    return {
      dialogFormVisible: false,
       form: {
         name: '',
         radio: 'WIFI',
         com: '',
         ip: '',
         port: ''
       }
    }
  },
  methods: {
    backup() {
      window.open('/backup');
    },
    restartboards() {
      this.$axios.$get('restartboards')
      .then(function (response) {

        })

        this.$message({
          type: 'success',
          message: 'Restarting!!!'
        });
    },
    addcard() {
      if(this.form.radio == "USB") {
        this.form.ip = '';
        this.form.port = '';
      } else if(this.form.radio == "RASPI") {
        this.form.ip = '';
        this.form.port = '';
        this.form.com = '';
      } else {
        this.form.com = '';
      }

      var upload = this.$axios.$post('saveboard', {
          name: this.form.name,
          type: this.form.radio,
          com: this.form.com,
          ip: this.form.ip,
          port: this.form.port
        }).then(function (response) {
          return true;
        })
        if(upload) {
            this.refreshlist()
            this.dialogFormVisible = false;
            this.form.name = '';
            this.form.radio = 'WIFI';
            this.form.com = '';
            this.form.ip = '';
            this.form.port = '';
        }
    },
    handleDelete: async function (index, row) {
     var that = this;
     var busqueda = 0;
     for(var i = 0; i < this.lista.length; i++)
      {
        if(this.lista[i].name == row)
        {
          busqueda = i;
        }
      }

      var respuesta = await this.$axios.$post('removeboard', {
            id: busqueda
      }).then(function (response) {
          return true
        })
      if (respuesta) {
          this.refreshlist();
          this.removed()
      }
    },
    removed () {
      this.$notify({
        title: 'Delete',
        message: 'Successfully erased',
        type: 'warning'
      })
    },
    async refreshlist () {
        var listaboards = await this.$axios.$get('listboards');
          this.lista = listaboards;
    },

  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  min-height: calc(100vh - 136px);
}

.newboard {

  font-size: 24px;
  padding: 5px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  width: 35px;
  height: 35px;
  top: 8px;

}
footer {
  margin-top: 20px;
  background: black;
  text-align: center;
  color: white;
  line-height: 60px;
  margin-left: -20px;
  margin-right: -20px;
}
</style>
