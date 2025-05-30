import type { App } from 'vue'
import { defaults } from 'lodash-es'
import Viewer from 'viewerjs-vue'
import api from './api'
import directive from './directive'
import component from './component.vue'

export interface InstallationOptions {
  name?: string
  debug?: boolean
  defaultOptions?: Viewer.Options
}

export {
  Viewer,
  api,
  directive,
  component,
}

export default {
  install(app: App, { name = 'viewer-picture', debug = false, defaultOptions }: InstallationOptions = {}) {
    if (defaultOptions) {
      Viewer.setDefaults(defaultOptions)
    }

    app.config.globalProperties[`$${name}Api`] = api
    app.component(name, defaults(component, { name }))
    app.directive(name, directive({ name, debug }))
  },
  setDefaults(defaultOptions: Viewer.Options) {
    Viewer.setDefaults(defaultOptions)
  },
}
