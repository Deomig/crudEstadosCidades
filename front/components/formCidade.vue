<template>
  <section class="container form"> 
    <div class="columns">          
      <div class="column is-one-third">
        <div class="field">
          <label class="label">Estado</label>
          <div class="control has-icons-left">
            <div class="select" :class="{'is-danger' : error}">             
              <select id="selectInsert">
                <option v-for="(item, index) in dataEstados" :key="index" :value="item.id" :selected="item.id==idUf">
                  {{item.nome}}/{{item.sigla}}
                </option>                     
              </select>
            </div>
            <div class="icon is-small is-left">
              <i class="fas fa-globe"></i>
            </div>
          </div>
        </div>
      </div>  
      <div class="column is-5"><label class="label">Cidade</label><input class="input" type="text" placeholder="Cidade" v-model="cidadeInsert" :class="{'is-danger' : error}"> </div>   
    </div>
    <p class="help is-danger subtitle is-10" v-if="error">Preencha corretamente os campos!</p>
    <div class="columns">
      <div class="column"><button class="button is-link" @click="updateEstado">Atualizar</button></div>
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
      estadoInsert: '', 
      cidadeInsert: '', 
      ufInsert: '',
      idUf: '',
      error: false, 
      modal: false
    }
  }, 
  created() {   
    this.idUf = this.$route.path.split('/')[2]
    this.$store.dispatch("common/getdataEstados") 
    this.$store.dispatch("common/getdataCidade", this.$route.params.cidade)    
    this.$store.dispatch("common/getdataEstado", this.idUf)
  },
  computed: {
    dataEstados() {
      return this.$store.state.common.dataEstados
    },
    dataEstado() {
      return this.$store.state.common.dataEstado
    }, 
    dataCidade() {
      return this.$store.state.common.dataCidade
    },     
    responseApi() {
      return this.$store.state.common.responseApi
    }
  },
  watch: {    
    dataCidade(ref){
      this.cidadeInsert = ref.nome
    },
    dataEstado(ref){
      this.estadoInsert = ref.nome
      this.ufInsert = ref.sigla
    },
    responseApi(ref) {         
      this.modal = true
    }    
  },
  methods: {
    closeModal () {
      this.$store.commit('common/setResponse', '')
      this.modal = false  
      this.$router.push('/')           
    },  
    updateEstado() {
      if (!this.$route.params.cidade || !this.cidadeInsert) {
        this.error = !this.error
      } else {
        let data = {
          'id': this.$route.params.cidade,
          'idEstado': document.getElementById("selectInsert").value,
          'nome': this.cidadeInsert
        }         
        this.$store.dispatch("common/updateCidade", data)        
      }
    }
  }
}
</script>

<style lang="scss">
   .form {
     padding: 35px 0;
   }    
</style>