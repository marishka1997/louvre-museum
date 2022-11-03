const markers = [
   [2.3364, 48.86091],
   [2.3333, 48.8602],
   [2.3397, 48.8607],
   [2.333, 48.8619],
   [2.3365, 48.8625],
 ];

mapboxgl.accessToken = TOKEN;

const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/light-v10',
  center: markers[0], 
  zoom: 16,
});


const nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showYoom: true,
});

map.addControl(nav, 'top-right');


markers.forEach((markerPosition, index) => {
  const markerColor = index === 0 ? '#030303' : '#666666';

  new mapboxgl.Marker({
    color: markerColor,
  })
    .setLngLat(markerPosition)
    .addTo(map);
});
