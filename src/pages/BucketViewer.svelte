<script>
  import { currentRoute } from "@/store.js";
  import Bucket from "@/components/filesystem/Bucket.svelte";

  // We're a bucket first component
  async function fetchInfo() {
    let resource = "/api/filesystem/" + $currentRoute.id;
    if ($currentRoute.path) {
      resource += "/" + $currentRoute.path;
    }
    resource += "?stat";

    let info = await fetch(resource);
    info = await info.json();
    console.debug(info);
    return info;
  }

  async function oldFetchInfo() {
    let info = await fetch(
      "/api/file/" + $currentRoute.id + "/" + $currentRoute.path + "/info"
    );

    // It's probably a bucket
    if (!info.ok) {
      info = await fetch("/api/filesystem/" + $currentRoute.id);
    }
    info = await info.json();
    console.debug("main bucket", info);
    return info;
  }
</script>

<!-- This could be either file or bucket -->
{#await fetchInfo()}
  <p>Fetching info</p>
{:then info}
  {#if info.id}
    <!-- It's a file -->
    File name: {info.name}
  {:else if info.bucket}
    <!-- It's a bucket -->
    Bucket name:
    {info.bucket.name}
    {#each info.children as child}
      {#if child.type === "dir"}
        <svelte:component this={Bucket} data={child} />
      {/if}
      {#if child.type === "file"}
        File name: <a href="/viewer/{info.bucket.id}{child.path}"
          >{child.name}</a>
      {/if}
    {/each}
  {/if}
{/await}
