<template>
  <div class="item">
    <div class="details">
      <h3>
        {{ name }}
      </h3>
      <p class="author">
        <span class="small-title">Дата рождения:</span> {{ birthDate }}
      </p>
      <p class="workCount">
        <span class="small-title">Количество книг:</span> {{ workCount }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  birthDate: string;
  workCount?: number;
}>();
</script>

<style scoped>
.small-title {
  font-weight: bold;
}
</style>
