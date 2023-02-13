import { computed, ref } from "vue";
import { uuid } from "vue-uuid";
import axios from "axios";

let offset = 0;
let searchString = "";
const searchStatus = ref("");
const booksFound = ref(0);
const inProgress = ref(false);

export const bookItemsPerPage = ref(10);
export const totalBooks = computed(() => booksFound.value);
export const booksLoading = computed(() => inProgress.value);
export const searchResult = computed(() => searchStatus.value);

class bookItem {
  title: string;
  author: string;
  subject: string;
  key: string;

  constructor(ttl: string, au: string, subj: string, k: string) {
    this.title = ttl;
    this.author = au;
    this.subject = subj;
    this.key = k;
  }
}

export const books = ref<Array<bookItem>>([]);

export function getBooksOffset() {
  return offset;
}

export function setBooksOffset(newOffset: number) {
  offset = newOffset;
  console.log("offset", newOffset, offset);
  offset = offset < 0 ? 0 : offset;
  console.log("offset", newOffset, offset);
}

export function addBook(title: string, author: string, subject: string) {
  const newBook = new bookItem(title, author, subject, uuid.v4());
  books.value.unshift(newBook);
}

export function deleteBook(idx: string) {
  const filtered = books.value.filter((value) => {
    return value.key !== idx;
  });
  books.value = filtered;
}

/**
 * false in argument means same argument. empty string mens default search
 * @param newSearch
 */
export function loadBooksList(newSearch?: any) {
  inProgress.value = true;
  let search;

  if (newSearch !== false) {
    if (newSearch !== searchString) {
      offset = 0;
      searchString = newSearch;
    }
    search = searchString === "" ? "*" : searchString;
  } else {
    search = searchString === "" ? "*" : searchString;
  }

  console.log(newSearch, searchString, search);
  axios
    .get("https://openlibrary.org/search.json", {
      params: {
        offset: offset,
        limit: bookItemsPerPage.value,
        title: search,
      },
    })
    .then((response) => {
      // console.log(response);
      const data = response.data;
      booksFound.value = data.numFound;
      books.value = [];
      data.docs.forEach((element: any) => {
        const authors = element.author_name ?? [];
        const subjects = element.subject ?? [];

        const book = new bookItem(
          element.title,
          authors.join(", "),
          subjects.join(", "),
          element.key
        );
        books.value.push(book);
      });
      searchStatus.value = "";
    })
    .catch((error) => {
      searchStatus.value = error.response;
      console.log(error);
    })
    .then(() => {
      inProgress.value = false;
    });
}
