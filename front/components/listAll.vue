<template>
  <section class="container"> 
    <div class="btn-header">
      <button class="button is-link" @click="showInsert(0)">Cadastrar Estado</button>
      <button class="button is-link" @click="showInsert(1)">Cadastrar Cidade</button>
    </div> 
    <div class="notification" v-show="btn">
      <button class="delete" @click="showInsert(0)"></button>
      <div class="columns">
        <div class="column "><input class="input" type="text" placeholder="Estado" v-model="estadoInsert" :class="{'is-danger' : error}"> </div>
        <div class="column is-1"><input class="input" type="text" placeholder="UF" v-model="ufInsert" :class="{'is-danger' : error}"> </div>
        <div class="column "><button class="button is-success" @click="insertEstado">Salvar</button></div>
      </div>
      <p class="help is-danger subtitle is-10" v-if="error">Preencha corretamente os campos!</p>
    </div>
    <div class="notification" v-show="btn2">
      <button class="delete" @click="showInsert(1)"></button>
      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select" :class="{'is-danger' : error2}">
                <select id="selectInsert">
                  <option v-for="(item, index) in dataEstados" :key="index" :value="item.id">
                    {{item.nome}}
                  </option>                     
                </select>
              </div>
              <div class="icon is-small is-left">
                <i class="fas fa-globe"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="column"><input class="input" type="text" placeholder="Cidade" :class="{'is-danger' : error2}" v-model="cidadeInsert"> </div>
        <div class="column "><button class="button is-success" @click="insertCidade">Salvar</button></div>
      </div> 
      <p class="help is-danger subtitle is-10" v-if="error2">Preencha corretamente os campos!</p>
    </div> 
    <div class="table-container">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Estados</th>
          <th>UF</th>
          <th>Cidades</th>
          <th></th>
        </tr>
      </thead>
      <tbody> 
        <tr v-for="(item, index) in dataList" :key="index">
          <td>{{item.estado}}</td>
          <td>{{item.uf}}</td>
          <td>{{item.cidade}}</td>
          <td class="actions"> 
            <button class="button is-small is-link is-light" @click="$router.push('/update/'+ item.id+'/'+item.idCidade)">Alterar</button>  
            <button class="button is-small is-danger is-light" @click="deleteCidade(0, item.idCidade)" v-if="item.lengthCity>1">
              Excluir Cidade
            </button>
             <button class="button is-small is-danger is-light" @click="deleteCidade(item.id, item.idCidade)" v-if="item.lengthCity===1">
              Excluir Estado/Cidade
            </button>
            <button class="button is-small is-danger is-light" @click="deleteEstado(item.id)" v-if="item.lengthCity===0">
              Excluir Estado
            </button>            
          </td>  
        </tr> 
      </tbody>
    </table>
    </div>
    <div class="modal" :class="[modal ? 'is-active': '']">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        {{responseApi}}
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </section>
</template>
<script>
 
export default {
  data() {
    return {
      dataList: [],
      btn: false,
      btn2: false,
      uf: 'Selecione o Estado',
      estadoInsert: '',
      cidadeInsert: '',
      ufInsert: '',
      error: false,
      error2: false,
      modal: false
    }
  }, 
  created() {
    this.$store.dispatch("common/getdataEstados")
    this.$store.dispatch("common/getdataCidades")  
    setTimeout(function() {  
      this.loadData()    
    }.bind(this), 500);
  },
  computed: {
    dataEstados() {
      return this.$store.state.common.dataEstados
    },
    dataCidades() {
      return this.$store.state.common.dataCidades
    },
    responseApi() {
      return this.$store.state.common.responseApi
    }
  },
  watch: {
    responseApi() {
      this.modal = true
    }
  },
  methods: {
    closeModal () {
      this.modal = false
      this.btn = false
      this.btn2 = false
    },
    loadData (){     
      let self = this
      this.dataList = []
      this.dataEstados.map((item) => {
        let datCity = []
        datCity = self.dataCidades
        .filter(itemCidade => itemCidade.idEstado === item.id)
        .map(function(item2){
          self.dataList.push({"id": item.id, "estado": item.nome, "uf": item.sigla, "idCidade": item2.id, "cidade": item2.nome, "lengthCity": self.dataCidades.length})          
        })  
        
        if (!datCity.length) 
          self.dataList.push({"id": item.id, "estado": item.nome, "uf": item.sigla, "idCidade": '', "cidade": "-", "lengthCity": 0})           
      })       
    },
    deleteEstado(id) {      
      this.$store.dispatch("common/deleteEstado", id)   
      setTimeout(function() {  
        this.loadData()
      }.bind(this), 500)   
    },
    deleteCidade(id, idCidade) {  
      if (!id) {
        this.$store.dispatch("common/deleteCidade", idCidade)    
      } else {
        this.deleteEstado(id)
      }
        
      setTimeout(function() {  
        this.loadData()
      }.bind(this), 500)   
    },
    showInsert(ref) {      
      if (ref === 0) {
        this.btn = !this.btn
      } else {
        this.btn2 = !this.btn2
      }
      this.error = false
      this.error2 = false
    },
    insertEstado() {
      if (!this.estadoInsert || !this.ufInsert) {
        this.error = !this.error
      } else {
        let data = {
          'nome': this.estadoInsert, 
          'sigla': this.ufInsert  
        }
        
        this.$store.dispatch("common/insertEstado", data)
        setTimeout(function() {  
          this.loadData()
        }.bind(this), 500)   
      }
    },
    insertCidade() {
      if (!this.cidadeInsert) {
        this.error2 = !this.error2
      } else {
        let data = {
          'nome': this.cidadeInsert, 
          'idEstado': document.getElementById("selectInsert").value  
        } 
        this.$store.dispatch("common/insertCidade", data)
        setTimeout(function() {  
          this.loadData()
        }.bind(this), 500)   
      }
    } 
  }
}
</script>

<style lang="scss">
  
</style>