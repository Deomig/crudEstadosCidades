<template>
  <section class="container form">
    <div class="columns">
      <div class="column is-5"><label class="label">Estado</label><input class="input" type="text" placeholder="Estado" v-model="estadoInsert" :class="{'is-danger' : error}"> </div>
      <div class="column is-1"><label class="label">UF</label><input class="input" type="text" placeholder="UF" v-model="ufInsert" :class="{'is-danger' : error}"> </div>       
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
      ufInsert: '',
      error: false, 
      modal: false
    }
  }, 
  created() {
    this.$store.dispatch("common/getdataEstado", this.$route.params.estado)    
  },
  computed: {
    dataEstado() {
      return this.$store.state.common.dataEstado
    },     
    responseApi() {
      return this.$store.state.common.responseApi
    }
  },
  watch: { 
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
      if (!this.$route.params.estado || !this.estadoInsert || !this.ufInsert) {
        this.error = !this.error
      } else {
        let data = {
          'id': this.$route.params.estado,
          'nome': this.estadoInsert, 
          'sigla': this.ufInsert  
        }

        this.$store.dispatch("common/updateEstado", data)        
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