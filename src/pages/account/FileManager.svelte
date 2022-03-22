<script>
  import { fileManager } from "@/store.js";
  import Icon from "svelte-awesome";
  import {
    image,
    music,
    tv,
    folder,
    cogs,
    fileText,
  } from "svelte-awesome/icons";

  function uploadFile(event) {
    for (let file of event.target.files) {
      fileManager.upload(file);
    }
  }

  let files = [];
  $: filteredOptions = getFilteredOptions(filters, files, value);

  // Order the extensions by most used, so the includes is faster ;)
  let filters = [
    {
      title: "Images",
      extensions: [
        "png",
        "jpg",
        "jpeg",
        "webp",
        "raw",
        "gif",
        "ico",
        "icon",
        "bmp",
        "cpt",
        "dds",
        "dib",
        "dng",
        "emf",
        "heic",
        "pcx",
        "pic",
        "psd",
        "psdx",
        "tga",
        "thm",
        "tif",
        "tiff",
        "wbmp",
        "wdp",
      ],
      icon: image,
      active: false,
    },
    {
      title: "Audio",
      extensions: [
        "mp3",
        "wav",
        "m4a",
        "m4b",
        "ogg",
        "opus",
        "3ga",
        "aac",
        "aiff",
        "amr",
        "ape",
        "arf",
        "asf",
        "asx",
        "cda",
        "dvf",
        "flac",
        "gp4",
        "gp5",
        "gpx",
        "logic",
        "m4p",
        "midi",
        "pcm",
        "rec",
        "snd",
        "sng",
        "uax",
        "wma",
        "wpl",
        "zab",
      ],
      icon: music,
      active: false,
    },
    {
      title: "Video's",
      extensions: [
        "mp4",
        "webm",
        "mpeg",
        "mpg",
        "wmv",
        "mkv",
        "avi",
        "mov",
        "m4v",
        "264",
        "3g2",
        "3gp",
        "arf",
        "asf",
        "asx",
        "bik",
        "dash",
        "dat",
        "dvr",
        "flv",
        "h264",
        "m2t",
        "m2ts",
        "mod",
        "mts",
        "ogv",
        "prproj",
        "rec",
        "rmvb",
        "swf",
        "tod",
        "tp",
        "ts",
        "vob",
        "wlmp",
      ],
      icon: tv,
      active: false,
    },
    {
      title: "Zip files",
      extensions: [
        "zip",
        "rar",
        "7z",
        "7zip",
        "gz",
        "tgz",
        "jar",
        "tar",
        "pkg",
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "008",
        "009",
        "010",
        "a00",
        "a01",
        "a02",
        "a03",
        "a04",
        "a05",
        "ace",
        "air",
        "appxbundle",
        "arc",
        "arj",
        "asec",
        "bar",
        "bin",
        "c00",
        "c01",
        "c02",
        "c03",
        "cab",
        "cbr",
        "cbz",
        "cso",
        "deb",
        "dlc",
        "gz",
        "gzip",
        "hqx",
        "inv",
        "ipa",
        "isz",
        "jar",
        "msu",
        "nbh",
        "pak",
        "rar",
        "pkg",
        "r00",
        "r01",
        "r02",
        "r03",
        "r04",
        "r05",
        "r06",
        "r07",
        "r08",
        "r09",
        "r10",
        "rar",
        "rpm",
        "sis",
        "sisx",
        "sit",
        "sitd",
        "sitx",
        "tar",
        "uax",
        "vsix",
        "webarchive",
        "xap",
        "z01",
        "z02",
        "z03",
        "z04",
        "z05",
        "zab",
        "zipx",
      ],
      icon: folder,
      active: false,
    },
    {
      title: "Apps",
      extensions: [
        "exe",
        "air",
        "app",
        "application",
        "jar",
        "js",
        "appx",
        "bat",
        "bin",
        "com",
        "cpl",
        "deb",
        "dll",
        "elf",
        "lnk",
        "msi",
        "prg",
        "rpm",
        "shs",
        "vbs",
        "xap",
      ],
      icon: cogs,
      active: false,
    },
    {
      title: "Documents",
      extensions: [
        "abw",
        "aww",
        "chm",
        "cnt",
        "dbx",
        "djvu",
        "doc",
        "docm",
        "docx",
        "dot",
        "dot",
        "dotm",
        "dotx",
        "epub",
        "gp4",
        "ind",
        "indd",
        "key",
        "keynote",
        "mht",
        "mpp",
        "odf",
        "ods",
        "odt",
        "opx",
        "ott",
        "oxps",
        "pages",
        "pdf",
        "pmd",
        "pot",
        "potx",
        "pps",
        "ppsx",
        "ppt",
        "pptm",
        "pptx",
        "prn",
        "prproj",
        "ps",
        "pub",
        "pwi",
        "rtf",
        "sdd",
        "sdw",
        "shs",
        "snp",
        "sxw",
        "tpl",
        "vsd",
        "wpd",
        "wps",
        "wri",
        "xps",
        "xls",
        "xlsm",
        "xlsx",
      ],
      icon: fileText,
      active: false,
    },
  ];

  // Can be used to refresh data
  async function getFiles() {
    const request = await fetch("/api/user/files");
    const response = await request.json();

    files = response.files;
  }

  function getFilteredOptions(filters, files, searchValue) {
    for (let filter of filters) {
      if (filter.active) {
        files = files.filter((file) => {
          let extension = file.name.split(".").pop();
          return filter.extensions.includes(extension);
        });
      }
    }

    if (searchValue !== "") {
      files = files.filter(function (file) {
        return file.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
    return files;
  }

  function toggleFilter(filterIndex) {
    const wasActive = filters[filterIndex].active;

    for (let filter of filters) {
      filter.active = false;
    }

    // Flip status
    if (wasActive) {
      filters[filterIndex].active = !filters[filterIndex].active;
    }

    // Doe maar een dubbele vla flip
    filters[filterIndex].active = !filters[filterIndex].active;
  }

  getFiles();

  let value = "";

  // Trying out the lazy load
  let scrollList;

  let scrollY = 0;
  let scrollHeight;
  let listItemSize;

  function parseScroll() {
    scrollY = scrollList.scrollTop;
    scrollHeight = scrollList.scrollHeight;
  }
</script>

<!-- File manager header -->
<header class="header">
  <div class="container px-6 py-8 mx-auto flex flex-row justify-between">
    <span class="text-4xl">File Manager</span>
    <label class="">
      <input type="file" hidden multiple on:change={uploadFile} />
      <span
        class="py-2 px-4 rounded hover:cursor-pointer text-white text-lg font-normal bg-blue-500 hover:bg-blue-700"
        >Upload file</span>
    </label>
  </div>
</header>

<section id="quick-filters" class="container px-6 py-8 mx-auto">
  <div class="flex flex-row justify-evenly">
    {#each filters as filter, index}
      <div
        class="flex flex-col text-center hover:cursor-pointer"
        class:active={filter.active}
        on:click={() => {
          toggleFilter(index);
        }}>
        <Icon data={filter.icon} class="h-12 w-12 self-center" />
        {filter.title}
      </div>
    {/each}
  </div>

  <input
    type="text"
    class="w-full mt-4 bg-slate-500 text-white rounded-lg p-2"
    placeholder="Search files"
    bind:value />
</section>

<!-- Files -->
<section id="files" class="container px-6 py-8 mx-auto">
  <ul
    class="overflow-y-auto h-96"
    bind:this={scrollList}
    on:scroll={parseScroll}>
    {#each filteredOptions as file, index}
      <li>
        <!-- 27.2 list item height, 384 ul height -->
        <a href={"/file/" + file.id} class="flex items-center">
          {#if index * 27.2 < scrollY + 384}
          <img
            class="w-16 h-16"
            src="/api/file/{file.id}/thumbnail?width=32height=32"
            alt="" />
        {/if}
        {file.name}</a>
      </li>
    {:else}
      <li>No options left</li>
    {/each}
  </ul>
</section>

<style>
  .header {
    background-color: var(--background);
  }
  .active {
    color: var(--highlight_color);
  }
</style>
