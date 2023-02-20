<template>
  <PageTemplate>
    <template #header>О сайте</template>

    <template #main>
      <div class="container">Тестовое задание OTUS</div>
    </template>
  </PageTemplate>
</template>

<style>
/*
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
*/
</style>
<script>
import { defineComponent } from "vue";
import PageTemplate from "@/views/PageTemplate.vue";

export default defineComponent({
  components: { PageTemplate },
});
</script>
