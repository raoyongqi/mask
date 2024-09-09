// mapUtils.js
import AMapLoader from '@amap/amap-jsapi-loader';
import { mapMask } from './mapMask'; // 引入 mapMask 函数
export const initMap = (container, satelliteLayerVisible,selectedCity) => {
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
      center: selectedCity.center,
    });

    if (satelliteLayerVisible) {
      const satelliteLayer = new AMap.TileLayer.Satellite();
      map.add(satelliteLayer); // 添加卫星图层
    }

    if (map && AMap) { 
      mapMask(AMap, map,selectedCity);
      const citys = [
        { lnglat: [116.258446, 37.686622], name: '景县', style: 2 },
        { lnglat: [113.559954, 22.124049], name: '圣方济各堂区', style: 2 },
        // 添加更多数据
      ];

      // 自定义图标样式
      const style = {
        url: './logo192.png',
        size: new AMap.Size(30, 30),
        anchor: new AMap.Pixel(15, 15),
      };

      // 创建海量点图层
      const massMarks = new AMap.MassMarks(citys, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: style,
      });

      // 将海量点图层添加到地图
      massMarks.setMap(map);
     } // 调用 mapMask
  })
  .catch(e => {
    console.trace(e);
  });
};
