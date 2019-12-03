<template>
  <div>
    <Menu />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Alteração - Cidade
          </h1> 
          <h2 class="subtitle">
            Estados e cidades Brasileiras 
          </h2>
        </div>
      </div>
    </section>
    <formCidade />
  </div>
</template>

<script>
import Menu from '~/components/parts/menu'
import formCidade from '~/components/formCidade'

export default {
  components: {
    Menu, 
    formCidade
  }
}
</script>

<style lang="scss"> 
  @import "~/assets/scss/_main.scss";
</style>
