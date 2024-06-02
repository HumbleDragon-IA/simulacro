import { createRouter, createWebHistory } from 'vue-router';
import Formulario from './components/Formulario.vue';
import Preguntas from './components/Preguntas.vue';

const routes = [
  { path: '/', component: Formulario },
  { path: '/formulario', component: Formulario },
  { path: '/preguntas', component: Preguntas },
  { path: '/:pathMatch(.*)*', component: Formulario }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;