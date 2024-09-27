import { defineConfig } from "vuepress/config";
import { mdPlugin } from "./config/index";
// import { MarkdownTransform} from "./plugins/markdown-transform";
import { resolve } from "path";

// import "element-ui/lib/theme-chalk/index.css";
import navbar from "./navbar.js"
import sidebar from "./sidebar.js"
export default defineConfig({
  // base: '/dist/',
  /**
   * Type is `DefaultThemeConfig`
   */
  themeConfig: {
    repo: "vuejs/vuepress",
    editLinks: true,
    docsDir: "packages/docs/docs",
    nav: navbar,
    sidebar: sidebar
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            // Creates `style` nodes from JS strings
            // "style-loader",
            // Translates CSS into CommonJS
            // "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    }
  },
  chainWebpack: (config, isServer) => {
    // 获取已注册的组件
    // const components = config.resolve.alias.get('components');
    // console.log(components);
    // config.module
    //   .rule('scss')
    //   .oneOf('vue')
    //   .use('sass-loader')
    //   .loader('sass-loader')
    // .tap(options => {
    //   // 修改选项，使其支持 SCSS 语法
    //   // options.indentedSyntax = false;
    //   return options;
    // });
  },
  markdown: {
    extendMarkdown: md => mdPlugin(md)
  },
  // @ts-ignore
  // plugins: [ [
  //   '@vuepress/register-components',
  //   {
  //     componentsDir: resolve(__dirname, '../examples')
  //   }
  // ]]
})