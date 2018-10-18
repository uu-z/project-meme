<template lang="pug">
  div(id="app")
    Menu(mode="horizontal" theme="dark" active-name="1")
      MenuItem(name="1")
        router-link(to="/images") images
    router-view
</template>

<script>
export default {
  name: "meme"
};
</script>

<style lang="stylus">
@import url('~iview/dist/styles/iview.css')
@import url('~viewerjs/dist/viewer.css')
</style>
