<script>
  import { currentRoute, currentPage, userData } from "@/store.js";
  import AdminLayout from "@/components/layouts/Admin.svelte";
  import PublicLayout from "@/components/layouts/Public.svelte";

  import router from "page";
  import routes from "@/routes.js";
  // import Layout from "@/components/layout/admin.svelte";

  // The current page as is defined in @/routes.js
  let current;
  let page = null;
  let params = {};
  let Layout;

  // Default layout
  let defaultLayout = PublicLayout;
  if ($userData.username) {
    Layout = defaultLayout = AdminLayout;
  }

  // TODO: use user from store for authenticated routes
  let user = false;

  routes.forEach((route) => {
    // Loop around all of the routes and create a new instance of
    // router for reach one with some rudimentary checks.

    router(
      route.path,
      // Set the params variable to the context.
      // We use this on the component initialisation
      (ctx, next) => {
        params = { ...ctx.params };
        currentRoute.set(ctx.params);
        next();
      },
      // Check if auth is valid. If so, set the page to the component
      // otherwise redirect to login.
      () => {
        if (route.auth && !userData) {
          router.redirect("/login");
        } else {
          page = route.component;
          current = route;
          currentPage.set(route);
          Layout = route.layout || defaultLayout;
        }
      }
    );
  });

  router.start();
</script>

<svelte:head>
  <title>{current?.title + " ~ PixelDrain"}</title>
</svelte:head>

<main>
  <svelte:component this={Layout}>
    <svelte:component this={page} />
  </svelte:component>
</main>

