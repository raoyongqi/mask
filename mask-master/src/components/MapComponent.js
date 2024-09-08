// MapComponent.js
import React, { useEffect, useState } from 'react';
import { initMap } from './mapUtils'; // 引入 initMap 函数
import './MapComponent.css'; // 引入 CSS 文件
import cities from '../data/province.json';

const MapComponent = () => {
  const [satelliteVisible, setSatelliteVisible] = useState(true); // 状态控制卫星图层的显示
  const [selectedCity, setSelectedCity] = useState(cities[0]);  
  useEffect(() => {
    
    const container = 'mapContainer';
    initMap(container, satelliteVisible,selectedCity); // 初始化地图
    // 更新卫星图层的可见性
    if (satelliteVisible) {
      addSatelliteLayer();
    } else {
      removeSatelliteLayer();
    }
  }, [satelliteVisible,selectedCity]);

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
  
  const handleCityChange = (e) => {
    const adcode = e.target.value;
    const city = cities.find(city => city.adcode === adcode);
    if (city) {
      setSelectedCity(city);
    }
  };
  
  return (
    
    <div className="mapContainerWrapper">
            <select onChange={handleCityChange} value={selectedCity.adcode}>
        {cities.map(city => (
          <option key={city.adcode} value={city.adcode}>
            {city.name}
          </option>
        ))}
      </select>
      <button className="toggleButton" onClick={() => setSatelliteVisible(!satelliteVisible)}>
        {satelliteVisible ? 'Hide Satellite Layer' : 'Show Satellite Layer'}
      </button>
      <div id="mapContainer" style={{ width: '100%', height: '100vh' }}></div>
      </div>
  );
};

export default MapComponent;
