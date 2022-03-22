<script>
  import { tick } from "svelte";

  export let hidden = true;
  export let searchCallback;
  export let onPick;

  $: filteredOptions = getFilteredOptions(value, options);
  $: !hidden && focusText();

  function onAction(selectedOption) {
    onPick(selectedOption);
    hidden = true;
  }

  async function focusText() {
    value = "";
    await tick();
    inputElement.focus();
  }

  async function onKeyDown(event) {
    // CTRL + K
    if (event.ctrlKey && event.keyCode === 75) {
      event.preventDefault();
      value = "";
      hidden = false;
      inputElement.focus();
      // Just refresh data when CTRL + K, so you get fresh data in case of uploads ;)
      options = await searchCallback();
    }

    if (hidden) return;

    switch (event.keyCode) {
      case 27:
        hidden = true;
        break;
      case 38: // Arrow Up
        event.preventDefault();
        if (document.activeElement === inputElement) {
          listElement.lastChild.focus();
        } else if (document.activeElement.previousSibling) {
          document.activeElement.previousSibling.focus();
        } else {
          listElement.lastChild.focus();
        }
        break;
      case 40: // Arrow down
        event.preventDefault();
        if (document.activeElement === inputElement) {
          listElement.firstChild.focus();
        } else if (document.activeElement.nextSibling) {
          document.activeElement.nextSibling.focus();
        } else {
          listElement.firstChild.focus();
        }
        break;
      case 13: // Enter
        let index = Array.prototype.slice
          .call(listElement.children)
          .indexOf(document.activeElement);

        if (filteredOptions[index]) {
          onAction(filteredOptions[index]);
        }
        break;
      default:
        if (
          (event.key.length === 1 &&
            event.ctrlKey === false &&
            event.altKey === false &&
            event.metaKey === false) ||
          event.key === "Backspace"
        ) {
          inputElement.focus();
        }
    }
  }

  function getFilteredOptions(value, options) {
    if (value == "") {
      return [];
    }
    return options
      .filter(function (option) {
        return option.name.toLowerCase().includes(value.toLowerCase());
      })
      .slice(0, 10);
  }

  let options = [];
  let inputElement;
  let listElement;
  let value = "";
</script>

<svelte:window on:keydown={onKeyDown} />

<div
  class:hidden
  class="background fixed w-screen h-screen left-0 top-0"
  on:click={() => {
    hidden = true;
  }} />
<div class:hidden class="foreground rounded-b-lg fixed left">
  <input
    type="text"
    class="w-full rounded-lg p-2"
    placeholder="Search files"
    bind:value
    bind:this={inputElement} />
  <ul class="list rounded-lg" bind:this={listElement}>
    {#each filteredOptions as option}
      <li
        tabindex="0"
        class="item w-fill flex p-3 rounded-lg"
        on:click={() => {
          onAction(option);
        }}>
        {option.name}
      </li>
    {/each}
  </ul>
</div>

<style>
  .hidden {
    display: none;
  }
  .background {
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .foreground {
    z-index: 1001;
    left: 10%;
    top: 10%;
    width: 80%;
    background: var(--background);
  }

  .item {
    color: var(--text_color);
  }

  .item:hover,
  .item:focus {
    color: var(--highlight_color);
    cursor: pointer;
  }
</style>
