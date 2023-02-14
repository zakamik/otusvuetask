import { computed, ref } from "vue";
import { uuid } from "vue-uuid";
import axios from "axios";

let offset = 0;
let searchString = "";
const searchStatus = ref("");
const authorsFound = ref(0);
const inProgress = ref(false);

export const authorItemsPerPage = ref(10);
export const totalAuthors = computed(() => authorsFound.value);
export const authorsLoading = computed(() => inProgress.value);
export const searchResult = computed(() => searchStatus.value);

class authorItem {
  name: string;
  birthDate: string;
  workCount: string;
  key: string;

  constructor(nm: string, bd: string, wc: string, k: string) {
    this.name = nm;
    this.birthDate = bd;
    this.workCount = wc;
    this.key = k;
  }
}

export const authors = ref<Array<authorItem>>([]);

export function getAuthorsOffset() {
  return offset;
}

export function setAuthorsOffset(newOffset: number) {
  offset = newOffset;
  console.log("offset", newOffset, offset);
  offset = offset < 0 ? 0 : offset;
  console.log("offset", newOffset, offset);
}

export function addAuthor(name: string, bd: string, workC: string) {
  const newBook = new authorItem(name, bd, workC, uuid.v4());
  authors.value.unshift(newBook);
}

export function deleteAuthor(idx: string) {
  const filtered = authors.value.filter((value) => {
    return value.key !== idx;
  });
  authors.value = filtered;
}

/**
 * false in argument means same argument. empty string mens default search
 * @param newSearch
 */
export function loadAuthorsList(newSearch?: any) {
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
    .get("https://openlibrary.org/search/authors.json", {
      params: {
        offset: offset,
        limit: authorItemsPerPage.value,
        q: search,
      },
    })
    .then((response) => {
      // console.log(response);
      const data = response.data;
      authorsFound.value = data.numFound;
      authors.value = [];
      data.docs.forEach((element: any) => {
        const author = new authorItem(
          element.name,
          element.birth_date ?? "n/a",
          element.work_count ?? "n/a",
          element.key
        );
        authors.value.push(author);
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
