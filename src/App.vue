<template>
  <div class="app">
    <component-sandbox :component="MyComponent">
      <!-- <my-component></my-component> -->
    </component-sandbox>
  </div>
</template>

<script>
import Price from './components/Price.vue'
import MyComponent from './components/MyComponent.vue'

export default {
  name: 'app',
  components: {
    MyComponent,
    Price,
  },
  data: () => ({
    MyComponent,
    Price,
  }),
}
</script>

<style lang="stylus">
html, body {
  background: #333638
}

h1, h2, h3, h4, h5, h6 {
  font-size: 1.2em
  margin-bottom: 6px
}
h1, h2, h3, h4, h5, h6, span, p, pre, em, b, label, input, textarea {
  font-family: 'Consolas', monospace
  color: #aaa
}

i {
  font-family: 'FontAwesome'
}
textarea, input {
  font-family: monospace
  background: none
}
</style>


<style scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
</style>
