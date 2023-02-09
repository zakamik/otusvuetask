<template>

  <div class="book-add">
    <div class="title input-item">
      <span class="small-title">Имя: </span><input v-model="authorName"/>
    </div>
    <div class="author input-item"><span class="small-title">Дата роджения: </span>
      <input v-model="birthDate"/>
    </div>
    <div class="bookSubject input-item"><span class="small-title">Количество книг: </span>
      <input v-model="workCount"/>
    </div>
    <div class="input-item">
    <button @click="addAuthor()">Добавить автора</button>
    </div>
  </div>
  <div class="booksList">
    <ul>
      <input v-model="searchString" :disabled="inProgress" type="text">
      <button :disabled="inProgress" @click="loadAuthorsList(true)">Искать</button>
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
      <div>Авторы с {{ offset + 1 }} по {{ offset + itemsPerPage }} из {{ totalAuthors }}</div>
      <li v-for="item in authorsList" :key="item.key">
        <AuthorItem>
          <template #name>{{ item.name }}</template>
          <template #birthDate>{{ item.birthDate }}</template>
          <template #workCount>{{ item.workCount }}</template>
        </AuthorItem>
        <button class="deleteAuthor" @click="deleteAuthor(item.key)">Удалить</button>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import { uuid } from 'vue-uuid';

import AuthorItem from './AuthorItem.vue'

const authorsList = ref([]);

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
const totalAuthors = ref(authorsList.value.length);
const inProgress = ref(false);

function canGoBack() {
  let result = offset.value > 0 && !inProgress.value;
  console.log('canGoBack', result);
  return (result);
}

function canGoForward() {
  return (((offset.value + itemsPerPage.value) <= totalAuthors.value) && !inProgress.value);
}

function previousPage() {
  if (!canGoBack()) {
    return;
  }
  offset.value -= itemsPerPage.value;
  offset.value = offset.value < 0 ? 0 : offset.value;
  loadAuthorsList(false);
}

function nextPage() {
  if (!canGoForward()) {
    return;
  }
  offset.value += itemsPerPage.value;
  loadAuthorsList(false);
}

function deleteAuthor(idx) {
  let filtered = authorsList.value.filter((value, index) => {
    return value.key !== idx;
  });
  authorsList.value = filtered;
  totalAuthors.value -= 1;
}

function loadAuthorsList(newSearch) {
  inProgress.value = true;
  let search = searchString.value === '' ? '*' : searchString.value;
  if (newSearch) {
    offset.value = 0;
  }
  console.log(search);
  axios
      .get('https://openlibrary.org/search/authors.json',
          {
            params: {
              offset: offset.value,
              limit: itemsPerPage.value,
              q: search,
            }
          })
      .then((response) => {
        // console.log(response);
        const data = response.data;
        totalAuthors.value = data.numFound;
        authorsList.value = [];
        data.docs.forEach((element) => {
          let author = {};
          let authors = element.author_name ?? [];
          let subjects = element.subject ?? [];

          author.name = element.name;
          author.birthDate = element.birth_date ?? 'n/a';
          author.workCount = element.work_count ?? 'n/a';
          author.key = element.key;
          authorsList.value.push(author);
        })
      })
      .catch((error) => {
        console.log(error);
      })
      .then((result) => {
        inProgress.value = false;
      });
}

const authorName = ref('');
const birthDate = ref('');
const workCount = ref('');

function addAuthor() {
  const newAuthor = {
    name: '', birthDate: '', workCount: '', key: '',
  };
  newAuthor.name = authorName.value;
  newAuthor.birthDate = birthDate.value;
  newAuthor.workCount = workCount.value;
  newAuthor.key = uuid.v4();

  authorsList.value.unshift(newAuthor);
  authorName.value = '';
  birthDate.value = '';
  workCount.value = '';
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