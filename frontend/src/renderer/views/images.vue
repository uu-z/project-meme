<template lang="pug">
  div
    Input(v-model="search")
      Button(slot="append" icon="md-search")
      Button(slot="append" icon="md-add" @click="uploadModal = true")
    Modal(v-model="uploadModal")
      Upload(multiple name="files" type="drag" action="http://localhost:1337/upload" @on-success="uploadSuccess")
        div(style="padding: 20px 0")
        Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
        p Click or drag files here to upload
      div(slot="footer")
    Modal(v-model="editModal" @on-ok="onSubmitEdit")
      Tag.img-tag(v-for="item in currentSelectImage.tags", :key="item", :name="item", closable, @on-close="handleCloseTag(item)") {{item}}
      Button(v-if="!currentSelectImage.isAddTag" icon="ios-add" type="dashed" size="small" @click="$set(currentSelectImage, 'isAddTag', true)") 添加标签
      Input(v-if="currentSelectImage.isAddTag" size="small" autofocus style="width: 60px" @on-change="e => {currentSelectImage.addTagText = e.target.value}" @on-enter="handleInputTag" @on-blur="handleInputTag")
    div.waterfall-box
      vue-waterfall-easy(:maxCols="5" :imgsArr="images.list" srcKey="url" @scrollReachBottom="loadImage" @click="clickFn")

         
</template>

<script>
import axios from "axios";
import store from "../store"
import {nativeImage} from "electron"

export default {
  data() {
    return {
      search: "",
      files: null,
      uploadModal: false,
      editModal: false,
      currentSelectImage: {
        tags:[],
        addTagText: "",
        isAddTag: false
      },
    };
  },
  watch: {
  },
  async mounted() {
    // store.dispatch("GET_IMAGES")
    this.loadImage()
  },
  computed:{
    images(){
      return store.state.lists.images
    }
  },
  methods: {
    async onSubmitEdit(){
      const data = _.pick(this.currentSelectImage, ["tags"])
      await store.dispatch("EDIT_IMAGE", {
        id: this.currentSelectImage.id,
        data
      })
    },
    handleCloseTag(tag){
      this.currentSelectImage.tags = [..._.pull(this.currentSelectImage.tags,tag)]
    },
    handleInputTag(){
      if(!this.currentSelectImage.addTagText) return
      this.currentSelectImage.isAddTag = false
      this.currentSelectImage.tags = _.uniq([...this.currentSelectImage.tags || [], this.currentSelectImage.addTagText])
    },
    async uploadSuccess(){
    },
    async clickFn(event, { index, value }) {
      this.currentSelectImage = {...this.images.list[index]}
      global._E = event
      this.editModal = true
    },
    async loadImage(state) {
      await store.dispatch("GET_IMAGES")
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
