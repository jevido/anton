import { userData } from "@/store.js";

import Dashboard from "@/pages/Dashboard.svelte";
import Login from "@/pages/Login.svelte";
import Error404 from "@/pages/errors/404.svelte";
import BucketViewer from "@/pages/BucketViewer.svelte";
import FileViewer from "@/pages/File.svelte";

import PublicLayout from "@/components/layouts/Public.svelte";

// Account related
import Profile from "@/pages/account/Profile.svelte";
import FileManager from "@/pages/account/FileManager.svelte";

// PixelDrain related

import About from "@/pages/About.svelte";
import Apps from "@/pages/Apps.svelte";
import Acknowledgements from "@/pages/Acknowledgements.svelte";

const routes = [
  {
    path: "/",
    title: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/file/:id",
    title: "File Viewer",
    component: FileViewer
  },
  {
    path: "/viewer/:id",
    title: "File manager",
    component: BucketViewer,
  },
  {
    path: "/viewer/:id/:path",
    title: "File manager",
    component: BucketViewer,
  },
  {
    path: "/files",
    title: "File manager",
    component: FileManager,
  },
  {
    path: "/about",
    title: "About",
    component: About,
  },
  {
    path: "/apps",
    title: "Apps",
    component: Apps,
  },
  {
    path: "/acknowledgements",
    title: "Acknowledgements",
    component: Acknowledgements,
  },
  {
    path: "/login",
    title: "Login",
    component: Login,
    layout: PublicLayout,
    auth: false,
  },
  {
    path: "*",
    title: "404",
    component: Error404,
  },
];

export default routes;
