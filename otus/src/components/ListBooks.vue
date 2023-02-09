<template>

  <div class="book-add">
    <div class="title input-item">
      <span class="small-title">Название: </span><input v-model="bookTitle"/>
    </div>
    <div class="author input-item"><span class="small-title">Автор: </span>
      <input v-model="author"/>
    </div>
    <div class="bookSubject input-item"><span class="small-title">Описание: </span>
      <input v-model="bookSubject"/>
    </div>
    <div class="input-item">
    <button @click="addBook()">Добавить книгу</button>
    </div>
  </div>
  <div class="booksList">
    <ul>
      <input v-model="searchString" :disabled="inProgress" type="text">
      <button :disabled="inProgress" @click="loadBooksList(true)">Искать</button>
      <nav>
        <button :disabled="!canGoBack()" class="button" @click="previousPage()">Назад</button>
        <button :disabled="!canGoForward()" class="button" @click="nextPage()">Вперёд</button>
        <span v-show="inProgress">
      <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><g class="spinner_Wezc"><circle
          cx="12" cy="2.5" opacity=".14" r="1.5"/><circle cx="16.75" cy="3.77" opacity=".29" r="1.5"/><circle cx="20.23"
                                                                                                              cy="7.25"
                                                                                                              opacity=".43"
                                                                                                              r="1.5"/><circle
          cx="21.50" cy="12.00" opacity=".57" r="1.5"/><circle cx="20.23" cy="16.75" opacity=".71" r="1.5"/><circle
          cx="16.75" cy="20.23" opacity=".86" r="1.5"/><circle cx="12" cy="21.5" r="1.5"/></g></svg>
    </span>
      </nav>
      <div>Книги с {{ offset + 1 }} по {{ offset + itemsPerPage }} из {{ totalBooks }}</div>
      <li v-for="item in booksList" :key="item.key">
        <BookItem>
          <template #title>{{ item.title }}</template>
          <template #author>{{ item.author }}</template>
          <template #subject>{{ item.subject }}</template>
        </BookItem>
        <button class="deleteBook" @click="deleteBook(item.key)">Удалить</button>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import { uuid } from 'vue-uuid';

import BookItem from './BookItem.vue'

const booksList = ref([]);

/*
{
  title: 'книга1', author: 'автор1', subject: 'описание 1'
},
{
  title: 'книга2',
      author: 'автор2',
    subject: 'описание 2'
}
*/

const offset = ref(0);
const itemsPerPage = ref(10);
const searchString = ref('');
const totalBooks = ref(booksList.value.length);
const inProgress = ref(false);

function canGoBack() {
  let result = offset.value > 0 && !inProgress.value;
  console.log('canGoBack', result);
  return (result);
}

function canGoForward() {
  return (((offset.value + itemsPerPage.value) <= totalBooks.value) && !inProgress.value);
}

function previousPage() {
  if (!canGoBack()) {
    return;
  }
  offset.value -= itemsPerPage.value;
  offset.value = offset.value < 0 ? 0 : offset.value;
  loadBooksList(false);
}

function nextPage() {
  if (!canGoForward()) {
    return;
  }
  offset.value += itemsPerPage.value;
  loadBooksList(false);
}

function deleteBook(idx) {
  let filtered = booksList.value.filter((value, index) => {
    return value.key !== idx;
  });
  booksList.value = filtered;
  totalBooks.value -= 1;
}

function loadBooksList(newSearch) {
  inProgress.value = true;
  let search = searchString.value === '' ? '*' : searchString.value;
  if (newSearch) {
    offset.value = 0;
  }
  console.log(search);
  axios
      .get('https://openlibrary.org/search.json',
          {
            params: {
              offset: offset.value,
              limit: itemsPerPage.value,
              title: search,
            }
          })
      .then((response) => {
        // console.log(response);
        const data = response.data;
        totalBooks.value = data.numFound;
        booksList.value = [];
        data.docs.forEach((element) => {
          let book = {};
          let authors = element.author_name ?? [];
          let subjects = element.subject ?? [];

          book.title = element.title;
          book.author = authors.join(', ');
          book.subject = subjects.join(', ');
          book.key = element.key;
          booksList.value.push(book);
        })
      })
      .catch((error) => {
        console.log(error);
      })
      .then((result) => {
        inProgress.value = false;
      });
}

const bookTitle = ref('');
const author = ref('');
const bookSubject = ref('');

function addBook() {
  const newBook = {
    title: '', author: '', subject: '', key: '',
  };
  newBook.title = bookTitle.value;
  newBook.author = author.value;
  newBook.subject = bookSubject.value;
  newBook.key = uuid.v4();

  booksList.value.unshift(newBook);
  bookTitle.value = '';
  author.value = '';
  bookSubject.value = '';
}

onMounted(() => {
  // loadBooksList(false);
});
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
  animation: spinner_Oiah .75s step-end infinite
}

@keyframes spinner_Oiah {
  8.3% {
    transform: rotate(30deg)
  }
  16.6% {
    transform: rotate(60deg)
  }
  25% {
    transform: rotate(90deg)
  }
  33.3% {
    transform: rotate(120deg)
  }
  41.6% {
    transform: rotate(150deg)
  }
  50% {
    transform: rotate(180deg)
  }
  58.3% {
    transform: rotate(210deg)
  }
  66.6% {
    transform: rotate(240deg)
  }
  75% {
    transform: rotate(270deg)
  }
  83.3% {
    transform: rotate(300deg)
  }
  91.6% {
    transform: rotate(330deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>