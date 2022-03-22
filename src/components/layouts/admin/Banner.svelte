<script>
  let now = new Date();
  let currentMonth = now.getMonth();
  let currentDate = now.getDate();
  let file = "checker" + Math.floor(Math.random() * 18);

  if (now.getDay() === 3 && Math.random() > 0.95) {
    file = "checker_wednesday";
  } else if (currentMonth === 7 && currentDate === 8) {
    file = "checker_dwarf";
  } else if (currentMonth === 7 && currentDate === 24) {
    file = "checker_developers";
  } else if (currentMonth === 9 && currentDate === 31) {
    file = "checker_halloween";
  } else if (
    currentMonth === 11 &&
    (currentDate === 25 || currentDate === 26)
  ) {
    file = "checker_christmas";
  }

  let bannerBackgroundImage = "/img/background/" + file + ".png";
</script>

<div
  class="header-container rounded-xl shadow-lg"
  style="background-image: url('{bannerBackgroundImage}');">
  <img src="/img/branding/header_orbitron_wide.png" alt="Header" />
</div>

<style>
  .header-container {
    text-align: center;
    padding: 2em 0em;
    background-color: var(--bg-color-light);
    background-repeat: repeat;
    background-attachment: fixed;
    background-blend-mode: luminosity;

    color: var(--layer_1_text_color);
  }

  img {
    width: 100%;
    max-width: 800px;
    margin: auto;
  }
</style>
