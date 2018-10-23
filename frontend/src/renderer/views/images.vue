<template lang="pug">
  div
    Input(v-="search" @on-enter="")
      Button(slot="append" icon="md-search" @click="")
      Button(slot="append" icon="md-add" @click="uploadModal = true")
    Modal(v-="uploadModal")
      Upload(multiple name="files" type="drag" action="http://localhost:1337/upload" :on-success="uploadSuccess")
        div(style="padding: 20px 0")
        Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
        p Click or drag files here to upload
      div(slot="footer")
    //- Modal(v-model="editModal")
    //-   Form(:="currentSelectImage")
    //-     FormItem(label="标签")
    //-       Tag(v-for="item in currentSelectImage.tags", :key="item", :name="item", closeable @on-close="handleTagClose") {{item}}
    div.waterfall-box
      vue-waterfall-easy(:maxCols="5" :imgsArr="images" srcKey="url" @scrollReachBottom="loadImage" @click="clickFn")
        .img-info(slot-scope="props")
          //- p.img-text {{props.value.name}}
          Tag.img-tag(v-for="item in props.value.tags", :key="item", :name="item", closable, @on-close="handleTagClose") {{item}}
          Button(icon="ios-add" type="dashed" size="small" @click="handleAdd") 添加标签
</template>

<script>
import axios from "axios";
import store from "../store"

export default {
  data() {
    return {
      search: "",
      files: null,
      uploadModal: false,
      editModal: false,
      currentSelectImage: {}
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
    },
  },
  methods: {
    handleTagClose(e, name){

    },
    async uploadSuccess(){
      store.dispatch("GET_IMAGES")
    },
    async clickFn(event, { index, value }) {
      this.currentSelectImage = {...this.images[index]}
      this.editModal = true
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
.img-text
  word-wrap break-word
.img-info
  padding 10px
</style>
