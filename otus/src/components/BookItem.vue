<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="title">No title</slot>
      </h3>
      <p class="author"><span class="small-title">Автор:</span> <slot name="author">No authors</slot></p>
      <p class="bookSubject"><span class="small-title">Описание:</span> <slot name="subject">No subject</slot></p>
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