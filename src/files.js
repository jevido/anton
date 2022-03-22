import { writable } from "svelte/store";

const manager = () => {
  let files = [];
  const { subscribe, set, update } = writable(files);

  const methods = {
    // Accepts a FileList entry
    upload(file) {
      let index = files.length;
      let formdata = new FormData();

      formdata.append("name", file.name);
      formdata.append("file", file);

      // Push the uploaded file in the tracked list. And update svelte
      update((files) => {
        files.push({
          name: file.name,
          progress: 0,
        });
        return files;
      });

      let xhr = new XMLHttpRequest();
      xhr.open("PUT", "/api/file/" + file.name);
      xhr.timeout = 21600000; // 6 hours, to account for slow connections
      xhr.upload.onprogress = (event) => {
        update((files) => {
          files[index].progress = parseInt((event.loaded / event.total) * 100);
          return files;
        });
      };

      // Never remove the files from the list, since the index could be wrong when uploading multiple files
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (this.status == 201) {
            update((files) => {
              files[index].id = JSON.parse(xhr.response).id;
              return files;
            });
          } else {
             // error: cross origin, http status not 201, bad connection
             console.error(xhr);
          }
        }
      };
      xhr.send(formdata);
    },
  };

  return {
    subscribe,
    set,
    update,
    ...methods,
  };
};

const fileManager = manager();

export { fileManager };
