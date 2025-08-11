import { createRouter, createWebHistory } from 'vue-router';
import BrowseMoviesPage from '../pages/BrowseMoviesPage.vue';
import UserDetailsPage from '../pages/UserDetailsPage.vue';
import MovieDetailsPage from "../pages/MovieDetailsPage.vue";
import LoginPage from "../pages/LoginPage.vue";

//Renders page components when user navigates
const routes = [
    { path: '/', name: 'BrowseMovies', component: BrowseMoviesPage },
  { path: '/movies', name: 'BrowseMoviesPage', component: BrowseMoviesPage },
  { path: '/user-details', name: 'UserDetailsPage', component: UserDetailsPage },
    { path: '/movie/:id', name: 'MovieDetailsPage', component: MovieDetailsPage},
    {path: '/login', name: "LoginPage", component: LoginPage}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;