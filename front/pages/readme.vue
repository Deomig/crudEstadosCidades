<template>
  <div>
    <Menu />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Readme
          </h1> 
          <h2 class="subtitle">
            Project
          </h2>
        </div>
      </div>
    </section>
    <div class="container content is-small">
      <h1>Repository</h1>
      <p>git clone https://idmiguel@bitbucket.org/idmiguel/teste-zooxsmart.git</p> 
      <h1>Commands General</h1>
      <p>make start</p>   
      <h1>Commands OneByOne</h1>
      <div class="columns">
        <div class="column">
          <h2>Back (API)</h2>  
          <p>cd teste-zooxsmart</p>    
          <ul>        
            <li>cd back/</li>
            <li>npm install</li>
            <li>node index.js</li>
          </ul>
        </div>
        <div class="column">
          <h2>Front NuxtJs</h2>      
          <ul>       
            <li>cd front/</li>
            <li>npm install</li>
            <li>npm run dev</li>
          </ul>
        </div>
      </div>      
    </div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Stacks
          </h1> 
          <h2 class="subtitle">
            Project
          </h2>
        </div>
      </div>
    </section>  
    <section class="container readme">
       <div class="tile is-ancestor ">
        <div class="tile is-vertical is-8">
          <div class="tile">            
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-info">
                <p class="title">NuxtJs</p>
                <p class="subtitle">Vue FrameWork </p>                
              </article> 
              <article class="tile is-child notification is-warning">
                 <p class="title">Node Express</p>
                  <p class="subtitle">Api Rest</p> 
              </article>
            </div>
          </div>
         
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-success">
            <div class="content">
              <p class="title">JWT <br /></p>
              <p class="subtitle">Json Web Token</p> 
            </div>
          </article>
        </div>
         <div class="tile is-parent">
            <article class="tile is-child notification is-danger">
              <p class="title">Bulma</p>
              <p class="subtitle">Style Framework</p> 
            </article>
          </div>
      </div>
    </section>  
   
  </div>
</template>

<script>
import Menu from '~/components/parts/menu'

export default {
  components: {
    Menu
  }   
}
</script>

<style lang="scss"> 
  @import "~/assets/scss/_main.scss";

  .content, .readme {
    margin-top: 30px;
  }

</style>
