
const files = require.context('.', false, /\.vue$/)
const components = {}

files.keys().forEach(key => {
  components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})

export default components
