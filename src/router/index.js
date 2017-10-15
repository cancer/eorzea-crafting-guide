import HomeComponent from '../components/Home.vue';
import DetailComponent from '../components/Detail.vue';

const routes = {
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeComponent,
    },
    {
      path: '/levels/:id',
      name: 'Levels',
    },
    {
      path: '/jobs/:id',
      name: 'Jobs',
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: DetailComponent,
    },
  ],
  mode: 'history',
};

export default routes;
