<template>
  <header> 
      <nav class="navbar is-light">
      <div class="container">
        <div class="navbar-brand"> 
          <span class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-end">
            <a @click="$router.push('/')" class="navbar-item" :class="{'is-active' : $route.name === 'index'}">Home</a>
            <a @click="$router.push('/readme')" class="navbar-item" :class="{'is-active' : $route.name === 'readme'}">Readme</a> 
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
 
export default {
    mounted() {    
        var burger = document.querySelector('.burger')
        var nav = document.querySelector('#'+burger.dataset.target)
    
        burger.addEventListener('click', function(){             
            burger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        })
    }
}
</script>

<style>

</style>