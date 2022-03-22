<script>
  import Prism from "prismjs";
  import "prismjs/themes/prism-okaidia.min.css";
  export let fileData;

  async function fetchText(id) {
    let file = await fetch("/api/file/" + id);
    return {
      file: await file.text(),
      language: Prism.languages[language] ?? Prism.languages['txt']
    };
  }

  let language = fileData.name.split(".").pop();
  
  function onKeyDown(event) {
    // CTRL + A
    if (event.ctrlKey && event.keyCode === 65) {
      if (window.getSelection) {
        let node = document.getElementById('code');
        event.preventDefault();
        const range = document.createRange();
        range.selectNode(node);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }
  }
</script>

{#await fetchText(fileData.id)}
  Fetching file...
{:then file}
  <pre><code id="code" 
      >{@html Prism.highlight(file.file, file.language)}</code></pre>
{/await}

<svelte:window on:keydown={onKeyDown} />
