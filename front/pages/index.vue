<template>
  <div>
    <Menu />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Listagem
          </h1> 
          <h2 class="subtitle">
            Estados e cidades Brasileiras 
          </h2>
        </div>
      </div>
    </section>
    <ListAll />
  </div>
</template>

<script>
import Menu from '~/components/parts/menu' 
import ListAll from '~/components/listAll' 

export default {
  components: {
    Menu,
    ListAll
  }
}
</script>

<style lang="scss"> 
  @import "~/assets/scss/_main.scss";
</style>
