import { createRouter, createWebHistory } from 'vue-router';
import BrowseMoviesPage from '../pages/BrowseMoviesPage.vue';
import HomePage from '../pages/HomePage.vue';
import UserDetailsPage from '../pages/UserDetailsPage.vue';

//Renders page components when user navigates
const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
  { path: '/movies', name: 'BrowseMoviesPage', component: BrowseMoviesPage },
  { path: '/user-details', name: 'UserDetailsPage', component: UserDetailsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;