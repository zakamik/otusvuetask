import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListAuthors from "@/views/ListAuthors.vue";
import ListBooks from "@/views/ListBooks.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/authors",
      name: "authors",
      component: ListAuthors,
    },
    {
      path: "/authors/add",
      name: "addAuthor",
      component: ListAuthors,
    },
    {
      path: "/books",
      name: "books",
      component: ListBooks,
    },
    {
      path: "/books/add",
      name: "addBook",
      component: ListBooks,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
