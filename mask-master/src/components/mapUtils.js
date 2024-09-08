// mapUtils.js
import AMapLoader from '@amap/amap-jsapi-loader';
import { mapMask } from './mapMask'; // 引入 mapMask 函数

export const initMap = (container, satelliteLayerVisible) => {
  window._AMapSecurityConfig = {
    securityJsCode: "16f81296c450f8bb5149a86056dae9c8",
  };

  if (!container) return;

  AMapLoader.load({
    key: "514c99148afec38a187b745ddbd1e517",
    version: "2.0",
    plugins: [
      "Map3D",
      "AMap.Scale",
      "AMap.ToolBar",
      "AMap.MouseTool",
      "AMap.PolyEditor",
      "AMap.PlaceSearch",
      "AMap.Autocomplete",
      "AMap.DistrictSearch",
      "AMap.MarkerClusterer",
    ],
    Loca: { "version": '2.0.0' },
    AMapUI: {
      version: "1.1",
      plugins: ["overlay/SimpleMarker"],
    },
  })
  .then(AMap => {
    const map = new AMap.Map(container, {
      zoom: 7,
      zooms: [5, 18],
      resizeEnable: true,
      showLabel: true,
      center: [116.40, 39.90],
    });

    if (satelliteLayerVisible) {
      const satelliteLayer = new AMap.TileLayer.Satellite();
      map.add(satelliteLayer); // 添加卫星图层
    }

    if (map && AMap) { mapMask(AMap, map); } // 调用 mapMask
  })
  .catch(e => {
    console.trace(e);
  });
};
