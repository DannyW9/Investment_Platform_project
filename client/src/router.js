import Vue from 'vue';
import Router from 'vue-router';
import PortfolioView from '@/views/PortfolioView.vue';
import StockView from '@/views/StockView.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'stocks',
      component: PortfolioView
    },
    {
      path: '/stocks',
      name: 'stocks',
      component: PortfolioView
    },
    {
      path: '/stocks/details',
      name: 'stockview',
      component: StockView,
      props: true
    }
  ]
});
