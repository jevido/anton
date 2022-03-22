<script>
  import { userData} from "@/store.js";
  import Router from "@/components/Router.svelte";
  // set userData
</script>

<Router />

<!-- Fragile theme  -->
<style>
  :root {
    --text_color: #cccccc;
    --link_color: #2daa26;
    --input_color: #550eb3;
    --input_color_dark: #510da9;
    --input_text_color: #ffffff;
    --input_disabled_color: #29104b;
    --highlight_background: linear-gradient(150deg, #0fb663, #65a50d);
    --highlight_color: #32bf2b;
    --highlight_color_dark: #30b629;
    --highlight_text_color: #000000;
    --danger_color: #bf2b32;
    --danger_color_dark: #b62930;
    --scrollbar_foreground_color: #5a0fbc;
    --scrollbar_hover_color: #7113eb;
    --scrollbar_background_color: #220735;
    --background: linear-gradient(120deg, #03103a, #2d064b, #2d064b, #37062e);
    --background_pattern_color: none;
    --parallax_slider_color: #1c052d;
    --navigation_background: rgba(0, 0, 0, 0.1);
    --body_background: none;
    --layer_1_color: #140320;
    --layer_1_color_border: #220637;
    --layer_1_text_color: #cccccc;
    --layer_2_color: #220735;
    --layer_2_color_border: #300a4b;
    --layer_3_color: #330d4e;
    --layer_3_color_border: #411163;
    --layer_4_color: #431564;
    --layer_4_color_border: #51197a;
    --chart_1_color: #32bf2b;
    --chart_2_color: #2b32bf;
    --chart_3_color: #bf2b32;
    --shadow_color: #000000;
  }
</style>
