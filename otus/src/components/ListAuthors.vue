<template>
  <div class="author-add">
    <div class="title input-item">
      <span class="small-title">Имя: </span><input v-model="authorName" />
    </div>
    <div class="author input-item">
      <span class="small-title">Дата рождения: </span>
      <input v-model="birthDate" />
    </div>
    <div class="bookSubject input-item">
      <span class="small-title">Количество книг: </span>
      <input v-model="workCount" />
    </div>
    <div class="input-item">
      <button @click="addAuthor(authorName, birthDate, workCount)">
        Добавить автора
      </button>
    </div>
  </div>
  <div class="booksList">
    <input v-model="searchString" :disabled="authorsLoading" type="text" />
    <button :disabled="authorsLoading" @click="loadAuthorsList(searchString)">
      Искать
    </button>
    <nav>
      <button :disabled="!canGoBack()" class="button" @click="previousPage()">
        Назад
      </button>
      <button :disabled="!canGoForward()" class="button" @click="nextPage()">
        Вперёд
      </button>
      <span v-show="authorsLoading">
        <svg
          height="1em"
          viewBox="0 0 24 24"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g class="spinner_Wezc">
            <circle cx="12" cy="2.5" opacity=".14" r="1.5" />
            <circle cx="16.75" cy="3.77" opacity=".29" r="1.5" />
            <circle cx="20.23" cy="7.25" opacity=".43" r="1.5" />
            <circle cx="21.50" cy="12.00" opacity=".57" r="1.5" />
            <circle cx="20.23" cy="16.75" opacity=".71" r="1.5" />
            <circle cx="16.75" cy="20.23" opacity=".86" r="1.5" />
            <circle cx="12" cy="21.5" r="1.5" />
          </g>
        </svg>
      </span>
    </nav>
    <div>
      Авторы с {{ getAuthorsOffset() + 1 }} по
      {{ getAuthorsOffset() + authorItemsPerPage }} из {{ totalAuthors }}
    </div>
    <div v-if="totalAuthors === 0 && !authorsLoading">Авторов не найдено</div>
    <div v-if="searchResult !== ''">
      Ошибка при поиске авторов: {{ searchResult }}
    </div>

    <ul>
      <li v-for="item in authors" :key="item.key">
        <AuthorItem>
          <template #name>{{ item.name }}</template>
          <template #birthDate>{{ item.birthDate }}</template>
          <template #workCount>{{ item.workCount }}</template>
        </AuthorItem>
        <button class="deleteAuthor" @click="deleteAuthor(item.key)">
          Удалить
        </button>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  addAuthor,
  authorItemsPerPage,
  authors,
  authorsLoading,
  deleteAuthor,
  getAuthorsOffset,
  loadAuthorsList,
  searchResult,
  setAuthorsOffset,
  totalAuthors,
} from "@/library/authors";
import AuthorItem from "./AuthorItem.vue";

const searchString = ref("");

function canGoBack() {
  let result = getAuthorsOffset() > 0 && !authorsLoading;
  console.log("canGoBack", result);
  return result;
}

function canGoForward() {
  const result =
    getAuthorsOffset() + authorItemsPerPage.value <= totalAuthors.value;
  return result;
}

function previousPage() {
  if (!canGoBack()) {
    return;
  }
  setAuthorsOffset(getAuthorsOffset() - authorItemsPerPage.value);
  loadAuthorsList(false);
}

function nextPage() {
  if (!canGoForward()) {
    return;
  }
  setAuthorsOffset(getAuthorsOffset() + authorItemsPerPage.value);
  loadAuthorsList(false);
}

const authorName = ref("");
const birthDate = ref("");
const workCount = ref("");

onMounted(() => {
  // loadBooksList(false);
});
</script>

<style scoped>
.author-add {
  padding-bottom: 1em;
}
.small-title {
  font-weight: bold;
}
.input-item {
  text-align: right;
}

.spinner_Wezc {
  transform-origin: center;
  animation: spinner_Oiah 0.75s step-end infinite;
}

@keyframes spinner_Oiah {
  8.3% {
    transform: rotate(30deg);
  }
  16.6% {
    transform: rotate(60deg);
  }
  25% {
    transform: rotate(90deg);
  }
  33.3% {
    transform: rotate(120deg);
  }
  41.6% {
    transform: rotate(150deg);
  }
  50% {
    transform: rotate(180deg);
  }
  58.3% {
    transform: rotate(210deg);
  }
  66.6% {
    transform: rotate(240deg);
  }
  75% {
    transform: rotate(270deg);
  }
  83.3% {
    transform: rotate(300deg);
  }
  91.6% {
    transform: rotate(330deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
