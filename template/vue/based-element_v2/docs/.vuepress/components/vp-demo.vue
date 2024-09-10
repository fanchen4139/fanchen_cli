<template>
  <ClientOnly>
    <div>
      <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
      <p text="sm" v-html="decodedDescription"/>
      <div class="example">
        <VpExample :file="path" :demo="componentPath"/>

        <ElDivider class="m-0"/>

        <div class="op-btns">
          <ElTooltip
            placement="top"
            content="复制"
            :show-arrow="false"
            :trigger="['hover', 'focus']"
            :trigger-keys="[]"
          >
            <i class="el-icon-document-copy cursor" @click="copyCode"></i>
<!--            <ElIcon-->
<!--              :size="16"-->
<!--              aria-label="复制"-->
<!--              class="op-btn"-->
<!--              tabindex="0"-->
<!--              role="button"-->
<!--              @click="copyCode"-->
<!--              @keydown.prevent.enter="copyCode"-->
<!--              @keydown.prevent.space="copyCode"-->
<!--            >-->
<!--&lt;!&ndash;              复制&ndash;&gt;-->
<!--                          <i-ri-file-copy-line/>-->
<!--            </ElIcon>-->
          </ElTooltip>
          <ElTooltip
            placement="top"
            :content="!sourceVisible ? '显示源码' : '隐藏源码'"
            :show-arrow="false"
            :trigger="['hover', 'focus']"
            :trigger-keys="[]"
          >
            <i v-if="!sourceVisible" class="el-icon-plus cursor" @click="toggleSourceVisible(true)"></i>
            <i v-else class="el-icon-minus cursor" @click="toggleSourceVisible(false)"></i>

<!--            <button-->
<!--              ref="sourceCodeRef"-->
<!--              class="reset-btn el-icon op-btn"-->
<!--              @click="toggleSourceVisible()"-->
<!--            >-->
<!--              {{ sourceVisible ? '隐藏源码' : '显示源码' }}-->
<!--&lt;!&ndash;              <ElIcon :size="16">&ndash;&gt;-->
<!--                &lt;!&ndash;              <i-ri-code-line/>&ndash;&gt;-->
<!--&lt;!&ndash;              </ElIcon>&ndash;&gt;-->
<!--            </button>-->
          </ElTooltip>
        </div>

        <Transition name="el-fade-in-linear">
          <VpSourceCode v-show="sourceVisible" :source="source"/>
        </Transition>

<!--        <Transition name="el-fade-in-linear">-->
<!--          <div-->
<!--            v-show="sourceVisible"-->
<!--            class="example-float-control"-->
<!--            tabindex="0"-->
<!--            role="button"-->
<!--            @click="toggleSourceVisible(false)"-->
<!--            @keydown="onSourceVisibleKeydown"-->
<!--          >-->
<!--            <ElIcon :size="16">-->
<!--                          <CaretTop/>-->
<!--            </ElIcon>-->
<!--            &lt;!&ndash;            <span>{{ locale['hide-source'] }}</span>&ndash;&gt;-->
<!--            <span>隐藏源码</span>-->
<!--          </div>-->
<!--        </Transition>-->
      </div>
    </div>
  </ClientOnly>
</template>

<script>

import VpSourceCode from "./demo/vp-source-code.vue";
import VpExample from "./demo/vp-example.vue";
import {Message} from "element-ui";

export default {
  name: 'VPDemo',
  props: {
    componentPath: {
      type: String
    },
    // demos: {
    //   type: Object
    // },
    source: {
      type: String
    },
    path: {
      type: String
    },
    rawSource: {
      type: String
    },
    description: {
      type: String
    },
  },
  components: {
    VpSourceCode,
    VpExample,
  },
  computed: {
    decodedDescription() {
      return decodeURIComponent(this.description)
    },
    // formatPathDemos() {
    //   const demos = {}
    //
    //   Object.keys(this.demos).forEach((key) => {
    //     demos[key.replace('../../examples/', '').replace('.vue', '')] =
    //       this.demos[key].default
    //   })
    //
    //   return demos
    // }
  },
  data() {
    return {
      sourceVisible: false
    }
  },
  methods: {
    toggleSourceVisible(flag) {
      this.sourceVisible = flag
    },
    onSourceVisibleKeydown(e) {
      if (['Enter', 'Space'].includes(e.code)) {
        e.preventDefault()
        this.toggleSourceVisible(false)
      }
    },
    copyCode() {
      const codeBlock = this.$el.getElementsByClassName("example-source")[0];
      const codeText = codeBlock.innerText || codeBlock.textContent;

      const textarea = document.createElement("textarea");
      textarea.value = codeText;
      document.body.appendChild(textarea);

      textarea.select();
      document.execCommand("copy");

      document.body.removeChild(textarea);
      Message.success('复制成功')
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.example {
  background-color: #fafafa;
  border: 1px solid #DCDFE6;
  border-radius: 3px;
  .cursor {
    cursor: pointer;
  }
  .el-divider--horizontal {
    margin: .5em 0;
  }
  .op-btns {
    padding: 0.5rem 1em;
    display: flex;
    align-items: center;
    column-gap: 1em;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>