<template>
  <div class="item">
    <div class="details">
      <h3>
        {{ bookTitle }}
      </h3>
      <p class="author">
        <span class="small-title">Автор:</span> {{ bookAuthor }}
      </p>
      <p class="bookSubject">
        <span class="small-title">Описание:</span> {{ bookSubject }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bookTitle: string;
  bookAuthor: string;
  bookSubject: string;
}>();
</script>

<style scoped>
.small-title {
  font-weight: bold;
}
</style>
