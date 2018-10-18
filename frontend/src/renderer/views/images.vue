<template lang="pug">
  div
    Input(v-model="search" @on-enter="")
      Button(slot="append" icon="md-search" @click="")
      Button(slot="append" icon="md-add" @click="uploadModal = true")
    Modal(v-model="uploadModal")
      Upload(multiple name="files" type="drag" action="http://localhost:1337/upload" :on-success="uploadSuccess")
        div(style="padding: 20px 0")
        Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
        p Click or drag files here to upload
      div(slot="footer")
    div.waterfall-box
      vue-waterfall-easy(:maxCols="10" :imgsArr="images" srcKey="url" @scrollReachBottom="loadImage" @click="clickFn")
</template>

<script>
import axios from "axios";
import store from "../store"

export default {
  data() {
    return {
      search: "",
      files: null,
      uploadModal: false
    };
  },
  watch: {
  },
  async mounted() {
    store.dispatch("GET_IMAGES")
  },
  computed:{
    images(){
      return store.state.images
    }
  },
  methods: {
    async uploadSuccess(){
      store.dispatch("GET_IMAGES")
    },
    async clickFn(event, { index, value }) {
      console.log(index,value)
    },
    async loadImage(state) {
    },
    reload(tags) {
    },
    removeTags(index) {
    }
  }
};
</script>

<style lang="stylus">
.waterfall-box
  height calc(100vh - 120px)
</style>
