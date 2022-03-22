<script>
  import page from "page";
  import { fileManager, userData } from "@/store.js";

  // TODO: Add upload tracker
  // TODO: expand with the store for dynamic routes
  let routes = [{ url: "/files", name: "My Files" }];

  async function logout() {
    userData.set({});
    await fetch("/api/user/session", {
      method: "DELETE",
    });

    // Remove the expired token
    document.cookie =
      "pd_auth_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    page.redirect("/login");
  }
</script>

<div class="flex w-2/12">
  <!-- Spacing -->
</div>

<nav
  class="navigation flex flex-col fixed w-2/12 h-screen pt-5 px-2.5 overflow-y-auto overflow-x-hidden transition-all">
  <a href="/" class="block text-3xl text-center mx-4 p-3 rounded-md"
    >Dashboard</a>
  <hr class="divider border-none h-0.5 m-3" />

  <div class="">
    {#each routes as route}
      <a
        href={route.url}
        class="float-none block text-center my-1 p-2 mx-4 font-light text-3xl text-ellipsis overflow-hidden transition-colors duration-75 rounded-md no-underline">
        {route.name}
      </a>
    {/each}

    <hr class="divider border-none h-0.5 m-3" />

    {#if $fileManager.length > 0}
      <h2 class="bold text-xl text-center">Uploading files</h2>
      {#each $fileManager as file}
        {#if file.progress < 100}
          <p class="text-center">{file.name}&nbsp;{file.progress}%</p>
        {/if}
      {/each}
      <hr class="divider border-none h-0.5 m-3" />
      <h2 class="bold text-xl text-center">Uploaded files</h2>
      {#each $fileManager as file}
        {#if file.progress === 100}
          <p class="text-center"><a href="/file/{file.id}">{file.name}</a></p>
        {/if}
      {/each}

      <hr class="divider border-none h-0.5 m-3" />
    {/if}

    <div class="footer block absolute inset-x-0 bottom-0">
      {#if $userData.username}
        <h4 class="text-center p-2">
          <button on:click={logout} class="text-2xl py-2 px-4 rounded-md"
            >Log out</button>
        </h4>
      {/if}
    </div>
  </div>
</nav>

<style>
  .navigation {
    background: var(--navigation_background);
    min-width: 250px;
  }
  .navigation .footer {
    background: var(--navigation_background);
    border-top: 1px solid var(--input_color);
  }
  .navigation a:hover,
  .navigation button:hover {
    background-color: var(--input_color);
    color: var(--input_text_color);
    text-decoration: none;
  }
  .navigation a {
    color: var(--layer_1_text_color);
    font-family: "Open Sans Light", sans-serif;
  }
  .divider {
    background-color: var(--input_color);
  }
</style>
