<template>
  <header class="container">
    <div class="navigate">
      <span class="navbar-brand">OTUS библиотека</span>
      <span class="nav-item">
        <router-link class="menu-item" :to="{ name: 'home' }">Home</router-link>
      </span>
      <span class="nav-item">
        <router-link class="menu-item" :to="{ name: 'about' }"
          >About</router-link
        >
      </span>
      <span class="nav-item">
        <router-link class="menu-item" :to="{ name: 'books' }"
          >Книги</router-link
        >
      </span>
      <span class="nav-item" v-if="curRouteName === 'books'">
        <router-link class="menu-item" :to="{ name: 'addBook' }"
          >Добавить книгу</router-link
        >
      </span>
      <span class="nav-item">
        <router-link class="menu-item" :to="{ name: 'authors' }"
          >Авторы</router-link
        >
      </span>
      <span class="nav-item" v-if="curRouteName === 'authors'">
        <router-link class="menu-item" :to="{ name: 'addAuthor' }"
          >Добавить автора</router-link
        >
      </span>
    </div>
  </header>
</template>

<style scoped>
/*
  .container {
    display: block;
  }
  .navigate {
    align-items: center;
    display: inline;
  }
  */
.menu-item {
  margin: 1em;
}
</style>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const curRouteName = computed(() => useRoute().name);
</script>
