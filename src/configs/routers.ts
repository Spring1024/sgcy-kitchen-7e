import ORDER from '../pages/order.jsx';
import CHECKOUT from '../pages/checkout.jsx';
import DETAIL from '../pages/detail.jsx';
import ORDERS from '../pages/orders.jsx';
import PROFILE from '../pages/profile.jsx';
import ADMIN from '../pages/admin.jsx';
import ADMIN_MENU from '../pages/admin-menu.jsx';
import ADMIN_ORDERS from '../pages/admin-orders.jsx';
export const routers = [{
  id: "order",
  component: ORDER
}, {
  id: "checkout",
  component: CHECKOUT
}, {
  id: "detail",
  component: DETAIL
}, {
  id: "orders",
  component: ORDERS
}, {
  id: "profile",
  component: PROFILE
}, {
  id: "admin",
  component: ADMIN
}, {
  id: "admin-menu",
  component: ADMIN_MENU
}, {
  id: "admin-orders",
  component: ADMIN_ORDERS
}]