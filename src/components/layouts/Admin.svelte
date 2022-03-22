<script>
  import Navigation from "@/components/layouts/admin/Navigation.svelte";
  import Header from "@/components/layouts/admin/Header.svelte";
  import Banner from "@/components/layouts/admin/Banner.svelte";
  import Footer from "@/components/layouts/admin/Footer.svelte";
  import QuickSearchBar from "@/components/awesome/QuickSearch.svelte";
  import page from "page";

  import { currentPage } from "@/store.js";

  // Quicksearch things
  const onPick = (selectedOption) => {
    page.redirect("/file/" + selectedOption.id);
  };
  async function searchCallback() {
    let myFiles = await fetch("/api/user/files");
    let json = await myFiles.json();
    myFiles = json.files;
    return myFiles;
  }
</script>

<div class="flex flex-row background m-0 p-0 min-h-screen">
  <Navigation />

  <div class="flex flex-col grow m-2">
    {#if $currentPage.path == "/"}
      <Header />
    {:else}
      <Banner />
    {/if}
    <main class="flex flex-wrap flex-col">
      <slot />
    </main>
    <Footer />
  </div>
</div>

<QuickSearchBar {searchCallback} {onPick} />

<style>
  .background {
    font-family: system-ui, sans-serif;
    font-size: 17px;
    line-height: 1.6em;
    color: var(--text_color);
    background: var(--background);
  }
</style>
