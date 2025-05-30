# v-viewer-picture

Image viewer component for vue, supports rotation, scale, zoom and so on, based on [viewer.js](https://github.com/fengyuanchen/viewerjs)

[![npm version](https://img.shields.io/npm/v/v-viewer.svg)](https://www.npmjs.com/package/v-viewer)
[![language](https://img.shields.io/badge/language-Vue3-brightgreen.svg)](https://www.npmjs.com/package/v-viewer)

[![npm version](https://img.shields.io/npm/v/v-viewer/legacy.svg)](https://www.npmjs.com/package/v-viewer)
[![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-viewer)

[![npm download](https://img.shields.io/npm/dw/v-viewer.svg)](https://www.npmjs.com/package/v-viewer)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) 

## [v-viewer for vue2](https://github.com/mirari/v-viewer/tree/v2)

## [Live demo](https://mirari.github.io/vue3-viewer/)

## Quick Example

- [directive](https://codepen.io/mirari/pen/yLMPPWy)
- [component](https://codepen.io/mirari/pen/ZEeaaWZ)
- [api](https://codepen.io/mirari/pen/qBrVpNV)
- [thumbnail & source](https://codepen.io/mirari/pen/Vwpryax)
- [viewer callback](https://codepen.io/mirari/pen/eYveypz)
- [custom toolbar](https://codepen.io/mirari/pen/ZEXqyPq)
- [filter images](https://codepen.io/mirari/pen/mdWqpwa)
- [change images](https://codepen.io/mirari/pen/ExWbovw)

## [中文文档](https://mirari.cc/posts/vue3-viewer)

## Installation

Install from NPM

```bash
npm install v-viewer-picture
```

## Usage

To use `v-viewer-picture`, simply import it and the `css` file, and call `app.use()` to install.

The component, directive and api will be installed together in the global.

Two different API styles are both supported: **Options API** and **Composition API**.

```ts
import { createApp } from 'vue'
import App from './App.vue'
import 'viewerjs-vue/dist/viewer-vue.css'
import VueViewer from 'v-viewer-picture'
const app = createApp(App)
app.use(VueViewer)
app.mount('#app')
```

```vue
<template>
  <div>
    <!-- directive -->
    <div class="images" v-viewer-picture>
      <img v-for="src in images" :key="src" :src="src">
    </div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src">
    </viewer>
    <!-- api -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      }
    },
    methods: {
      show() {
        this.$viewerApi({
          images: this.images
        })
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
  import { api as viewerApi } from 'v-viewer-picture'
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  const show = () => {
    viewerApi({
      images
    })
  }
</script> -->
```

### Support UMD

#### Browser

```html
<link href="//unpkg.com/viewerjs-vue/dist/viewer-vue.css" rel="stylesheet">
<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/viewerjs-vue/dist/viewer-vue.js"></script>
<script src="//unpkg.com/v-viewer-picture/dist/index.umd.js"></script>
<script>
  app.use(VueViewer.default)
</script>
```

#### CommonJS

```javascript
var VueViewer = require('VueViewer')
```

#### AMD

```javascript
require(['VueViewer'], function (VueViewer) {});
```

### Usage of directive

Just add the directive `v-viewer` to any element, then all `img` elements in it will be handled by `viewer`.

You can set the options like this: `v-viewer="{inline: true}"`

Get the element by selector and then use `el.$viewer` to get the `viewer` instance if you need.

```vue
<template>
  <div>
    <div class="images" v-viewer-picture="{movable: false}">
      <img v-for="src in images" :src="src" :key="src">
    </div>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import 'viewerjs-vue/dist/viewer-vue.css'
  import { directive as viewer } from "v-viewer-picture"
  export default defineComponent({
    directives: {
      viewer: viewer({
        debug: true
      })
    },
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      }
    },
    methods: {
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
  import 'viewerjs-vue/dist/viewer-vue.css'
  import { directive as viewer } from "v-viewer-picture"
  const vViewer = viewer({
    debug: true
  })
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  const show = () => {
    const viewer = document.querySelector('.images').$viewer
    viewer.show()
  }
</script> -->
```

#### Directive modifiers

##### static

The `viewer` instance will be created only once after the directive binded.

If you're sure the images inside this element won't change again, use it to avoid unnecessary re-render.

```vue
<div class="images" v-viewer-picture.static="{inline: true}">
  <img v-for="src in images" :src="src" :key="src">
</div>
```

##### rebuild

The `viewer` instance will be updated by `update` method when the source images changed (added, removed or sorted) by default.

If you encounter any display problems, try rebuilding instead of updating.

```vue
<div class="images" v-viewer-picture.rebuild="{inline: true}">
  <img v-for="src in images" :src="src" :key="src">
</div>
```

### Usage of component

You can simply import the component and register it locally too.

```vue
<template>
  <div>
    <viewer :images="images"
            @inited="inited"
            class="viewer"
            ref="viewer"
            >
      <template #default="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
        {{scope.options}}
      </template>
    </viewer>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import 'viewerjs-vue/dist/viewer-vue.css'
  import { component as Viewer } from "v-viewer-picture"
  export default defineComponent({
    components: {
      Viewer,
    },
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      }
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
  import 'viewerjs-vue/dist/viewer-vue.css'
  import { component as Viewer } from "v-viewer-picture"
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  let $viewer:any = null
  const inited = (viewer) => {
    $viewer = viewer
  }
  const show = () => {
    $viewer.show()
  }
</script> -->
```

#### Component props

##### images

- Type: `Array`

##### trigger

- Type: `Object`

You can replace `images` with `trigger`, to accept any type of prop.
when the `trigger` changes, the component will re-render the viewer.

```vue
<viewer :trigger="externallyGeneratedHtmlWithImages">
  <div v-html="externallyGeneratedHtmlWithImages"/>
</viewer>
```

##### rebuild

- Type: `Boolean`
- Default: `false`

The viewer instance will be updated by `update` method when the source images changed (added, removed or sorted) by default.

If you encounter any display problems, try rebuilding instead of updating.

```vue
<viewer
  ref="viewer"
  :options="options"
  :images="images"
  rebuild
  class="viewer"
  @inited="inited"
>
  <template #default="scope">
    <img v-for="src in scope.images" :src="src" :key="src">
    {{scope.options}}
  </template>
</viewer>
```

#### Component events

##### inited

- viewer: `Viewer`

Listen for the `inited` event to get the `viewer` instance, or use `this.refs.xxx.$viewer`.

### Usage of api

> Only available in modal mode.

You can call the function: `this.$viewerApi({options: {}, images: []})` to show gallery without rendering the `img` elements yourself.

The function returns the current viewer instance.

```vue
<template>
  <div>
    <button type="button" class="button" @click="previewURL">URL Array</button>
    <button type="button" class="button" @click="previewImgObject">Img-Object Array</button>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  import 'viewerjs-vue/dist/viewer-vue.css'
  import { api as viewerApi } from "v-viewer-picture"
  export default defineComponent({
    data() {
      return {
        sourceImageURLs: [
          'https://picsum.photos/200/200?random=1',
          'https://picsum.photos/200/200?random=2'
        ],
        sourceImageObjects: [
          {
            'src': 'https://picsum.photos/200/200?random=3',
            'data-source': 'https://picsum.photos/800/800?random=3'
          },
          {
            'src': 'https://picsum.photos/200/200?random=4',
            'data-source': 'https://picsum.photos/800/800?random=4'
          }
        ]
      }
    },
    methods: {
      previewURL () {
        // If you use the `app.use` full installation, you can use `this.$viewerApi` directly like this
        const $viewer = this.$viewerApi({
          images: this.sourceImageURLs
        })
      },
      previewImgObject () {
        // Or you can just import the api method and call it.
        const $viewer = viewerApi({
          options: {
            toolbar: true,
            url: 'data-source',
            initialViewIndex: 1
          },
          images: this.sourceImageObjects
        })
      }
    }
  })
</script>
<!-- Composition API -->
<!-- <script lang="ts" setup>
import 'viewerjs-vue/dist/viewer-vue.css'
import { api as viewerApi } from 'v-viewer-picture'
const sourceImageURLs = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2'
]
const sourceImageObjects = [
  {
    src: 'https://picsum.photos/200/200?random=3',
    'data-source': 'https://picsum.photos/800/800?random=3'
  },
  {
    src: 'https://picsum.photos/200/200?random=4',
    'data-source': 'https://picsum.photos/800/800?random=4'
  }
]
const previewURL = () => {
  // If you use the `app.use` full installation, you can use `this.$viewerApi` directly like this
  const $viewer = this.$viewerApi({
    images: sourceImageURLs
  })
}
const previewImgObject = () => {
  // Or you can just import the api method and call it.
  const $viewer = viewerApi({
    options: {
      toolbar: true,
      url: 'data-source',
      initialViewIndex: 1
    },
    images: sourceImageObjects
  })
}
</script> -->
```

## Options & Methods of Viewer

Refer to [viewer.js](https://github.com/fengyuanchen/viewerjs).

## Plugin options

### name

- Type: `String`
- Default: `viewer`

If you need to avoid name conflict, you can import it like this:
```ts
import { createApp } from 'vue'
import 'viewerjs-vue/dist/viewer-vue.css'
import VueViewer from 'v-viewer-picture'
import App from './App.vue'

export const app = createApp(App)
app.use(VueViewer, {
  name: 'vuer',
  debug: true,
})
app.mount('#app')

```

```vue
<template>
<div>
  <!-- directive name -->
  <div class="images" v-vuer="{movable: false}">
    <img v-for="src in images" :src="src" :key="src">
  </div>
  <button type="button" @click="show">Show</button>
  <!-- component name -->
  <vuer :images="images">
    <img v-for="src in images" :src="src" :key="src">
  </vuer>
  </div>
</template>
<!-- Options API -->
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      };
    },
    methods: {
      show () {
        // viewerjs instance name
        const vuer = this.$el.querySelector('.images').$vuer
        vuer.show()
        // api name
        this.$vuerApi({
          images: this.images
        })
      }
    }
  })
</script>
<!-- Composition API -->
<script lang="ts" setup>
  import { api as vuerApi } from 'v-viewer'
  const images = [
    "https://picsum.photos/200/200",
    "https://picsum.photos/300/200",
    "https://picsum.photos/250/200"
  ]
  const show = () => {
    // viewerjs instance name
    const vuer = document.querySelector('.images').$vuer
    vuer.show()
    // api name
    vuerApi({
      images
    })
  }
</script>
```

### defaultOptions

- Type: `Object`
- Default: `undefined`

If you need to set the viewer default options, you can import it like this:

```ts
import { createApp } from 'vue'
import 'viewerjs-vue/dist/viewer-vue.css'
import VueViewer from 'v-viewer-picture'
import App from './App.vue'

export const app = createApp(App)
app.use(VueViewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
app.mount('#app')
```

And you can reset the default options at any other time:

```javascript
import VueViewer from 'v-viewer-picture'

VueViewer.setDefaults({
  zIndexInline: 2021,
})
```
