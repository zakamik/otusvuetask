<template>
  <PageTemplate>
    <template #header>Книги</template>
    <template #main>
      <div class="row">
        <div class="col col-sm-3 book-add" v-if="curRouteName === 'addBook'">
          <div class="title input-item">
            <span class="small-title">Название: </span
            ><input v-model="bookTitle" />
          </div>
          <div class="author input-item">
            <span class="small-title">Автор: </span>
            <input v-model="author" />
          </div>
          <div class="bookSubject input-item">
            <span class="small-title">Описание: </span>
            <input v-model="bookSubject" />
          </div>
          <div class="input-item">
            <button @click="addNewBook()">Добавить книгу</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="booksList">
          <input v-model="searchString" :disabled="booksLoading" type="text" />
          <button :disabled="booksLoading" @click="loadBooksList(searchString)">
            Искать
          </button>
          <button
            :disabled="booksLoading || !canGoBack()"
            class="button"
            @click="previousPage()"
          >
            Назад
          </button>
          <button
            :disabled="booksLoading || !canGoForward()"
            class="button"
            @click="nextPage()"
          >
            Вперёд
          </button>
          <span v-show="booksLoading">
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
          <div>
            Книги с {{ getBooksOffset() + 1 }} по
            {{ getBooksOffset() + bookItemsPerPage }} из {{ totalBooks }}
          </div>
          <div v-if="totalBooks === 0 && !booksLoading">Книг не найдено</div>
          <div v-if="searchResult !== ''">Ошибка при поиске книг</div>
          <ul>
            <li v-for="item in books" :key="item.key">
              <BookItem
                :book-title="item.title"
                :book-author="item.author"
                :book-subject="item.subject"
              />
              <button class="deleteBook" @click="deleteBook(item.key)">
                Удалить
              </button>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </template>
  </PageTemplate>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import {
  addBook,
  bookItemsPerPage,
  books,
  booksLoading,
  deleteBook,
  getBooksOffset,
  loadBooksList,
  searchResult,
  setBooksOffset,
  totalBooks,
} from "@/library/books";

import BookItem from "../components/BookItem.vue";
import PageTemplate from "@/views/PageTemplate.vue";
import { useRoute, useRouter } from "vue-router";
const bookTitle = ref("");
const author = ref("");
const bookSubject = ref("");

const searchString = ref("");

function canGoBack() {
  let result = getBooksOffset() > 0 && !booksLoading;
  console.log("canGoBack:", result);
  return result;
}

function canGoForward() {
  const result = getBooksOffset() + bookItemsPerPage.value <= totalBooks.value;
  console.log("canGoForward", result);
  console.log("bookItemsPerPage", bookItemsPerPage.value);
  console.log("totalBooks", totalBooks.value);
  return result;
}

function previousPage() {
  if (!canGoBack()) {
    return;
  }
  setBooksOffset(getBooksOffset() - bookItemsPerPage.value);

  loadBooksList(false);
}

function nextPage() {
  if (!canGoForward()) {
    return;
  }
  const newOffset = getBooksOffset() + bookItemsPerPage.value;
  console.log("pass new offset", newOffset);
  setBooksOffset(newOffset);
  loadBooksList(false);
}

const router = useRouter();
function addNewBook() {
  addBook(bookTitle, author, bookSubject);
  router.push({ name: "books" });
}

onMounted(() => {
  if (books.value.length === 0) {
    loadBooksList("");
  }
});

const curRouteName = computed(() => useRoute().name);
</script>

<style scoped>
.book-add {
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
