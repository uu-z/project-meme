import _ from "lodash"
import store from "../store"

export default (keys) => _.zipObject(keys, keys.map(key => ({
  get(){
    return _.get(store.state, keys, {})
  },
  set(val){
    store.commit("CUSTOM", state => {
        let target = _.get(store.state, keys, {})
        _.set(store.state, key, {
            ...target,
            ...val
        })
    })
  }
})))
