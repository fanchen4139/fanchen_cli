<template>
  <div>
    <ul>
      <li v-for="item in 50000">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
let timing = window.performance.timing
let start = timing.navigationStart
let dnsTime = 0
let tcpTime = 0
let firstPaintTime = 0
let domRenderTime = 0
let loadTime = 0

dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
tcpTime = timing.connectEnd - timing.connectStart;
firstPaintTime = timing.responseStart - start;
domRenderTime = timing.domContentLoadedEventEnd - start;
loadTime = timing.loadEventEnd - start;

console.log('DNS解析时间:', dnsTime, '\nTCP建立时间:', tcpTime, '\n首屏时间:', firstPaintTime,
  '\ndom渲染完成时间:', domRenderTime, '\n页面onload时间:', loadTime);
</script>

<style lang="less" scoped>

</style>