declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  WebKitMutationObserver: MutationObserver
  MozMutationObserver: MutationObserver
}

declare interface HTMLElement {
  [key: string]: any
}

declare namespace JSX {
  interface IntrinsicElements {
    [elem: string]: any
  }
  interface Element extends VNode {}
  interface ElementClass {
    $props: {}
  }
}