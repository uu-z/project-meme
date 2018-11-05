<template lang="pug">
  div
    BackTop()
    Modal(v-model="uploadModal" :footer-hide="true")
      //- Upload(multiple name="files" type="drag" :action="uploadUrl")
      //-   div(style="padding: 50px 0")
      //-     Icon(type="ios-cloud-upload" size="52" style="color: #3399ff")
      //-     p Click or drag files here to upload
      uploader.uploader-example(:options="uploadOptions" :style="{width: '100%'}")
        uploader-unsupport
        uploader-drop
          p Drop files here to upload
          uploader-btn(:attrs="attrs") select images
        uploader-list
      div(slot="footer")
    Modal(v-model="editModal" @on-ok="onSubmitEdit")
      Tag.img-tag(v-for="item in currentSelectImage.tags", :key="item", :name="item", closable, @on-close="handleCloseTag(item)") {{item}}
      Button(v-if="!currentSelectImage.isAddTag" icon="ios-add" type="dashed" size="small" @click="$set(currentSelectImage, 'isAddTag', true)") 添加标签
      Input(v-if="currentSelectImage.isAddTag" size="small" autofocus style="width: 60px" @on-change="e => {currentSelectImage.addTagText = e.target.value}" @on-enter="handleInputTag" @on-blur="handleInputTag")
    .toolbox(v-if="this.$refs.waterfall" :style="{color: 'red', width: waterfallWidth + 'px'}")
      Affix(:offset-top="0" )
        Card
          div(slot="title" :style="{display: 'flex', alignItems:'center'}")
            p 二次元表情包
            Input(v-model="search" clearable  @on-enter="handleSearch" @on-blur="handleSearch")
            Button(icon="md-search" @click="handleSearch" )
            Button(icon="md-add" @click="uploadModal = true")
    div.waterfall-box
      vue-waterfall-easy(:maxCols="5" :scrollStyle="{'padding-top': '100px'}" ref="waterfall" :imgsArr="images.list" srcKey="url" @scrollReachBottom="getImages" @click="clickFn")
        div.img-info(slot-scope="props") 
          p {{ props.value.tags? props.value.tags.join(",") : ""}}
          //- div(:style="{display: 'flex', alignItems: 'center'}")
          //-   Icon(type="ios-heart-outline" :size="20")
          //-   span(:style="{'line-height': 1.5, 'margin-left': 5+'px',}") 0
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
      },
      uploadOptions: {
          target: `${store.state.apiRoot}/upload`,
          fileParameterName: "files",
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
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
      return this.$refs.waterfall.waterfallWidth
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
.toolbox {
  margin: 0 auto;
  // max-width: 1350px
}
.search {
  display: flex;
}
.waterfall-box {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: -1
  .vue-waterfall-easy-scroll {
    padding-top: 100px
  }
}

.img-text {
  word-wrap: break-word;
}

.img-info {
  padding: 10px;
  font-size: 12px

}

.uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
