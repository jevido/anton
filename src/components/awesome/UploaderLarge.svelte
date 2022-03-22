<script>
  import { fileManager } from "@/store.js";
</script>

{#each $fileManager as file}
  {file.name}&nbsp;{file.progress}%<br/>
{/each}
