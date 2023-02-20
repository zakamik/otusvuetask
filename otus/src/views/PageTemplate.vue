<template>
  <div class="container">
    <!-- Page Header -->
    <header class="masthead">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1><slot name="header"></slot></h1>
              <!--              <span class="subheading"> A Blog Theme by Start Bootstrap </span>-->
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <slot name="main"></slot>

    <hr />
  </div>
</template>

<style lang="scss" scoped>
/*header {
  line-height: 1.5;
  max-height: 100vh;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>

<script setup></script>
