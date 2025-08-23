import { createRouter, createWebHistory } from 'vue-router';
import BrowseMoviesPage from '../pages/BrowseMoviesPage.vue';
import UserDetailsPage from '../pages/UserDetailsPage.vue';
import MovieDetailsPage from "../pages/MovieDetailsPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import PageNotFound from "../pages/PageNotFound.vue";
import CreateMoviesPage from "../pages/CreateMoviesPage.vue";
import PaywallPage from "../pages/PaywallPage.vue";

//Renders page components when user navigates
const routes = [
    { path: '/', name: 'BrowseMovies', component: BrowseMoviesPage },
    { path: '/movies', name: 'BrowseMoviesPage', component: BrowseMoviesPage },
    { path: '/user-details', name: 'UserDetailsPage', component: UserDetailsPage },
    { path: '/movie/:id', name: 'MovieDetailsPage', component: MovieDetailsPage},
    {path: '/login', name: "LoginPage", component: LoginPage},
    {path: '/movie/create', name: "CreateMoviesPage", component: CreateMoviesPage},
    {path: '/paywall', name: "PaywallPage", component: PaywallPage},
    { path: '/:catchAll(.*)*', name: "PageNotFound", component: PageNotFound} //This catches our error page not found
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;