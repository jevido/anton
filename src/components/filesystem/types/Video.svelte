<script>
  export let fileData;
</script>

<h2 class="text-center py-3">{fileData.name}</h2>
<video width="100%" height="100%" controls>
  <track kind="captions" />
  <source src="/api/file/{fileData.id}" type="{fileData.mime_type}" />
  Your browser does not support the video tag.
</video>
