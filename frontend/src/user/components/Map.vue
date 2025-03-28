<template>
  <LMap style="height: 500px; width: 100%;" :zoom="13" :center="[10.7769, 106.7009]">
    <LTileLayer :url="tileLayerUrl" />
    <LMarker :lat-lng="[10.7769, 106.7009]" />
  </LMap>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue3-leaflet"
import "leaflet/dist/leaflet.css"

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      tileLayerUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }
  }
}
</script>

<style scoped>
/* Bạn có thể thêm style tùy chỉnh cho bản đồ ở đây */
</style>
