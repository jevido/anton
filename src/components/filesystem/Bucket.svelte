<script>
  import { currentRoute } from "@/store.js";
  import Bucket from "@/components/filesystem/Bucket.svelte";

  export let data;
  console.debug('Bucket', data);

  // async function fetchInfo() {
  //   let info = await fetch(
  //     "/api/filesystem/" + $currentRoute.id + "/" + data.path
  //   );
  //   info = await info.json();

  //   return info;
  // }
</script>


<div class="bucket">
  It's me the bucket
  {#if data.children}
    {#each data.children as child}
      {#if child.type === "file"}
        File: {child.name}
      {/if}
    {/each}
  {/if}
</div>

<!-- {#await fetchInfo()}
  <p>Fetching info</p>
{:then info}
  {info.base.name}
  {#each info.children as child}
    {#if child.type === "dir"}
      <svelte:component this={Bucket} data={child} />
    {/if}
  {/each}
{/await} -->
