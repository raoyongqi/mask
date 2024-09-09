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
      const styles = [
        {
          url: './logo192.png',
          size: new AMap.Size(30, 30),
          anchor: new AMap.Pixel(15, 15),
        },
        {
          url: './logo.png',
          size: new AMap.Size(20, 20),
          anchor: new AMap.Pixel(10, 10),
        },
        {
          url: './logo.png',
          size: new AMap.Size(40, 40),
          anchor: new AMap.Pixel(20, 20),
        }
      ];
      
      // 城市数据，每个城市指定样式的索引
      const citys = [
        { lnglat: [116.397428, 39.90923], style: 0 }, // 使用第一个样式
        { lnglat: [117.200983, 39.084158], style: 1 }, // 使用第二个样式
        { lnglat: [121.473701, 31.230416], style: 2 }  // 使用第三个样式
      ];
      
      // 创建海量点图层
      const massMarks = new AMap.MassMarks(citys, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: styles, // 传入样式数组
      });

      // 将海量点图层添加到地图
      massMarks.setMap(map);
     } // 调用 mapMask
  })
  .catch(e => {
    console.trace(e);
  });
};
