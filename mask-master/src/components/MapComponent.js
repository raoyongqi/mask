// MapComponent.js
import React, { useEffect, useState } from 'react';
import { initMap } from './mapUtils'; // 引入 initMap 函数
import './MapComponent.css'; // 引入 CSS 文件

const MapComponent = () => {
  const [satelliteVisible, setSatelliteVisible] = useState(true); // 状态控制卫星图层的显示

  useEffect(() => {
    const container = 'mapContainer';
    initMap(container, satelliteVisible); // 初始化地图

    // 更新卫星图层的可见性
    if (satelliteVisible) {
      addSatelliteLayer();
    } else {
      removeSatelliteLayer();
    }
  }, [satelliteVisible]);

  const addSatelliteLayer = () => {
    window._AMapMap?.add(new window.AMap.TileLayer.Satellite());
  };

  const removeSatelliteLayer = () => {

    window._AMapMap?.getLayers().forEach(layer => {
      if (layer instanceof window.AMap.TileLayer.Satellite) {
        window._AMapMap?.remove(layer);
      }
    });
  };

  return (
    <div className="mapContainerWrapper">
      <button className="toggleButton" onClick={() => setSatelliteVisible(!satelliteVisible)}>
        {satelliteVisible ? 'Hide Satellite Layer' : 'Show Satellite Layer'}
      </button>
      <div id="mapContainer" style={{ width: '100%', height: '100vh' }}></div>
      </div>
  );
};

export default MapComponent;
