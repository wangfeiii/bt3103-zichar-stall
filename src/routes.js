// Import the components you want to define routes for.
import PageContent from './components/PageContent.vue'
import orders from './components/Orders.vue'
import modify from './components/Modify.vue'
import dashboard from './components/Dashboard.vue'

export default [
  { path: '/', component: PageContent },
  { path: '/orders', component: orders },
  { path: '/modify',name:'Modify', component: modify },
  {path: '/dashboard', component: dashboard}
]