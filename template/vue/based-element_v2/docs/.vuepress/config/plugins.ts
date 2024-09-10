import path from 'path'
import fs from 'fs'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import prism from 'prismjs'
// import { docRoot } from '@element-plus/build-utils'
// import externalLinkIcon from '../plugins/external-link-icon'
// import tableWrapper from '../plugins/table-wrapper'
// import tooltip from '../plugins/tooltip'
// import tag from '../plugins/tag'
// import { ApiTableContainer } from '../plugins/api-table'
// import { highlight } from '../utils/highlight'
import type Token from 'markdown-it/lib/token'
import type Renderer from 'markdown-it/lib/renderer'
const docRoot = path.resolve(__dirname, '..', '..', '..', 'docs')
console.log(docRoot)
// const localMd = MarkdownIt().use(tag)

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}
let counter = 0

export const mdPlugin = (md: MarkdownIt) => {
  // md.use(externalLinkIcon)
  // md.use(tableWrapper)
  // md.use(tooltip)
  // md.use(tag)
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(docRoot, 'examples', `${sourceFile}.vue`),
            'utf-8'
          )
        }
        const componentPath = String(sourceFile.replace('\/', '-'))
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        return `<vp-demo component-path="${componentPath}"
                      source="${encodeURIComponent( `<pre v-pre><code>${prism.highlight(source, prism.languages.markup, 'markup')}</code></pre>` )}" 
                      path="${sourceFile}" 
                      raw-source="${encodeURIComponent( source )}"
                       description="${encodeURIComponent(description)}">`
      } else {
        return '</vp-demo>'
      }
    },
  } as ContainerOpts)

  // md.use(ApiTableContainer)
}
