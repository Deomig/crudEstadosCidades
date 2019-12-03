<template>
  <div>
    <Menu />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Alteração - Estado
          </h1>
          <h2 class="subtitle">
            Estados e cidades Brasileiras
          </h2>
        </div>
      </div>
    </section>
    <formEstado /> 
  </div>
</template>

<script>
import Menu from '~/components/parts/menu'
import formEstado from '~/components/formEstado'

export default {
  components: {
    Menu, 
    formEstado
  }
}
</script>

<style lang="scss"> 
  @import "~/assets/scss/_main.scss";
</style>
