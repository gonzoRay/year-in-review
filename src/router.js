import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import firebase from "firebase/app";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/create",
      name: "create",
      component: () =>
        import(/* webpackChunkName: "create" */ "./views/Create.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/review",
      name: "review",
      component: () =>
        import(/* webpackChunkName: "review" */ "./views/Review.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // TODO: firebase.auth().currentUser is null when the page reloads
  //        Need to wrap in a promise and not resolve until callback comes back.
  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
