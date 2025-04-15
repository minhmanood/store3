import React, { useEffect, useRef } from 'react';

const OrderTrackingMap = ({ orderStatus, deliveryAddress }) => {
  const mapRef = useRef(null);
  const shopLocation = [10.821752458312544, 106.62884711012778]; // [lat, lng]

  useEffect(() => {
    const loadMap = async () => {
      if (!mapRef.current || !deliveryAddress) return;

      // Load Leaflet CSS
      if (!document.querySelector('#leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        await new Promise((resolve) => {
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }

      // Initialize map
      const map = window.L.map(mapRef.current).setView(shopLocation, 13);
      
      // Add OpenStreetMap tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ' OpenStreetMap contributors'
      }).addTo(map);

      // Add shop marker
      const shopIcon = window.L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      
      window.L.marker(shopLocation, { icon: shopIcon })
        .bindPopup('Vị trí Shop<br>52 Tống Văn Hên, P.15, Tân Bình')
        .addTo(map);

      try {
        // Get delivery location coordinates using Nominatim (OpenStreetMap's geocoding service)
        const address = `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.country}`;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();

        if (data && data[0]) {
          const deliveryLocation = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          
          // Add delivery location marker
          const deliveryIcon = window.L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          });

          window.L.marker(deliveryLocation, { icon: deliveryIcon })
            .bindPopup('Địa chỉ giao hàng')
            .addTo(map);

          // Draw route line
          const points = [shopLocation, deliveryLocation];
          
          if (orderStatus === 'Đang giao') {
            // Calculate midpoint
            const midPoint = [
              (shopLocation[0] + deliveryLocation[0]) / 2,
              (shopLocation[1] + deliveryLocation[1]) / 2
            ];

            // Draw completed path (green)
            window.L.polyline([shopLocation, midPoint], {
              color: '#4CAF50',
              weight: 3
            }).addTo(map);

            // Draw remaining path (gray)
            window.L.polyline([midPoint, deliveryLocation], {
              color: '#9E9E9E',
              weight: 3,
              opacity: 0.5
            }).addTo(map);

            // Add delivery vehicle marker at midpoint
            const vehicleIcon = window.L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            });

            window.L.marker(midPoint, { icon: vehicleIcon })
              .bindPopup('Vị trí người giao hàng')
              .addTo(map);
          } else {
            // Draw full path in gray
            window.L.polyline(points, {
              color: '#9E9E9E',
              weight: 3,
              opacity: 0.5
            }).addTo(map);
          }

          // Fit map bounds to show all markers
          map.fitBounds(window.L.latLngBounds(points).pad(0.1));
        }
      } catch (error) {
        console.error('Error getting delivery coordinates:', error);
      }

      return () => {
        map.remove();
      };
    };

    loadMap();
  }, [orderStatus, deliveryAddress]);

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="bg-white p-4 mb-4 rounded-lg shadow">
        <h3 className="font-medium text-lg mb-2">Trạng thái đơn hàng: {orderStatus}</h3>
        <p className="text-gray-600">
          Địa chỉ shop: 52 Tống Văn Hên, Phường 15, Tân Bình, TP Hồ Chí Minh
        </p>
        {orderStatus === 'Đang giao' && (
          <p className="text-green-600 mt-2">
            Đơn hàng đã đi được nửa chặng đường!
          </p>
        )}
      </div>
      <div className="h-[450px]">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default OrderTrackingMap;
