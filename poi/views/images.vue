<template lang="pug">
  div
    BackTop()
    Modal(v-model="uploadModal" :footer-hide="true")
      Upload(multiple name="files" type="drag" :action="uploadUrl")
        div(style="padding: 50px 0")
          Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
          p Click or drag files here to upload
      div(slot="footer")
    Modal(v-model="editModal" @on-ok="onSubmitEdit")
      Tag.img-tag(v-for="item in currentSelectImage.tags", :key="item", :name="item", closable, @on-close="handleCloseTag(item)") {{item}}
      Button(v-if="!currentSelectImage.isAddTag" icon="ios-add" type="dashed" size="small" @click="$set(currentSelectImage, 'isAddTag', true)") 添加标签
      Input(v-if="currentSelectImage.isAddTag" size="small" autofocus style="width: 60px" @on-change="e => {currentSelectImage.addTagText = e.target.value}" @on-enter="handleInputTag" @on-blur="handleInputTag")
    div.waterfall-box
      vue-waterfall-easy(:maxCols="5" ref="waterfall" :imgsArr="images.list" srcKey="url" @scrollReachBottom="getImages" @click="clickFn")
        div.img-info(slot-scope="props") 
          p {{ props.value.tags? props.value.tags.join(",") : ""}}
          //- div(:style="{display: 'flex', alignItems: 'center'}")
          //-   Icon(type="ios-heart-outline" :size="20")
          //-   span(:style="{'line-height': 1.5, 'margin-left': 5+'px',}") 0
        Affix(slot="waterfall-head" :offset-top="0")
          Card
            div(slot="title" :style="{display: 'flex', alignItems:'center'}")
              p 二次元表情包
              Input(v-model="search" clearable  @on-enter="handleSearch" @on-blur="handleSearch")
              Button(icon="md-search" @click="handleSearch" )
              Button(icon="md-add" @click="uploadModal = true")
</template>

<script>
import axios from "axios";
import store from "../store";
import { mapObjs } from "../utils";

export default {
  data() {
    return {
      search: null,
      files: null,
      uploadModal: false,
      editModal: false,
      currentSelectImage: {
        tags: [],
        addTagText: "",
        isAddTag: false
      }
    };
  },
  watch: {},
  async mounted() {
    this.getImages();
  },
  computed: {
    uploadUrl(){
      return `${store.state.apiRoot}/upload`
    },
    ...mapObjs(["images"]),
    waterfallWidth(){
      const {colWidth, cols} = this.$refs.waterfall
      return colWidth*cols
    }
  },
  methods: {
    async handleSearch() {
      const { search } = this;
      let query = {};
      if (search) {
        query.tags_contains = search;
      }
      this.$router.replace({ path: "images", query });
    },
    async onSubmitEdit() {
      const data = _.pick(this.currentSelectImage, ["tags"]);
      await store.dispatch("EDIT_IMAGE", {
        id: this.currentSelectImage.id,
        data
      });
    },
    handleCloseTag(tag) {
      this.currentSelectImage.tags = [
        ..._.pull(this.currentSelectImage.tags, tag)
      ];
    },
    handleInputTag() {
      if (!this.currentSelectImage.addTagText) return;
      this.currentSelectImage.isAddTag = false;
      this.currentSelectImage.tags = _.uniq([
        ...(this.currentSelectImage.tags || []),
        this.currentSelectImage.addTagText
      ]);
    },
    async clickFn(event, { index, value }) {
      this.currentSelectImage = { ...this.images.list[index] };
      global._E = event;
      this.editModal = true;
    },
    async getImages(state) {
      await store.dispatch("GET_IMAGES");
    },
    reload(tags) {},
    removeTags(index) {}
  },
  watch: {
    "$route.query"(newval, oldval) {
      this.images = {
        list: [],
        _query: newval
      };
      this.getImages();
      this.$refs.waterfall.reset()
    }
  }
};
</script>

<style lang="stylus">
.search {
  display: flex;
}
.waterfall-box {
  position: absolute;
  top: 15px;
  bottom: 0;
  width: 100%;
}

.img-text {
  word-wrap: break-word;
}

.img-info {
  padding: 10px;
  font-size: 12px

}
</style>
