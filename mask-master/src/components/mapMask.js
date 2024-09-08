// mapMask.js
export const mapMask = (AMap, map,selectedCity) => {
  new AMap.DistrictSearch({
    extensions: "all",
    subdistrict: 0,
  }).search(selectedCity.name, function (status, result) {
    if (status === 'complete' && result.districtList.length > 0) {
      const outer = [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true),
      ];

      const boundaries = result.districtList[0].boundaries;
      const pathArray = [outer];

      if (boundaries && Array.isArray(boundaries)) {
        boundaries.forEach(boundary => {
          if (Array.isArray(boundary)) {
            const hole = boundary.map(coord => {
              if (coord instanceof AMap.LngLat) {
                return coord;
              } else {
                console.warn('无效的坐标格式:', coord);
                return null;
              }
            }).filter(latlng => latlng !== null);

            if (hole.length > 0) {
              pathArray.push(hole);
            }
          } else {
            console.warn('无效的边界:', boundary);
          }
        });
      } else {
        console.error('边界数据格式错误:', boundaries);
      }

      const polygon = new AMap.Polygon({
        path: pathArray,
        strokeColor: "#99ffff",
        strokeWeight: 4,
        strokeOpacity: 1,
        fillColor: "#fff",
        fillOpacity: 1,
      });

      map.add(polygon);
    } else {
      console.error('无法获取城市信息或结果为空');
    }
  });
};
