<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="name"></slot>
      </h3>
      <p class="author"><span class="small-title">Дата рождения:</span> <slot name="birthDate">n/a</slot></p>
      <p class="workCount"><span class="small-title">Количество книг:</span> <slot name="workCount">n/a</slot></p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

</script>

<style scoped>
.small-title {
  font-weight: bold;
}
</style>