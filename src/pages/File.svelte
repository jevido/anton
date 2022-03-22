<script>
  import { currentRoute } from "@/store.js";
  import * as FileViewer from "@/components/filesystem/types/";

  async function getFileInfo(id) {
    let fileData = await fetch("/api/file/" + id + "/info");
    fileData = await fileData.json();
    console.debug("File data:", fileData);
    return fileData;
  }

  let mimeTypesTranslator = {
    "video/mp4": FileViewer.Video,
    "video/webm": FileViewer.Video,
    "application/zip": FileViewer.Zip,
    "image/jpeg": FileViewer.Image,
    "image/png": FileViewer.Image,

    // Text Variants
    "application/json": FileViewer.Text,
    "text/css; charset=utf-8": FileViewer.Text,
    "text/plain; charset=utf-8": FileViewer.Text,
    "text/html; charset=utf-8": FileViewer.Text,
  };
</script>

{#if $currentRoute.id}
  {#await getFileInfo($currentRoute.id) then fileData}
    <!-- <p>{fileData.mime_type}</p> -->
    <svelte:component
      this={mimeTypesTranslator[fileData.mime_type]}
      {fileData} />
  {/await}
{/if}
