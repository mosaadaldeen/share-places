import React, { useRef, useEffect } from "react";
import "./Map.css";

export default function Map(props) {
  const mapRef = useRef();
  const { center, zoom } = props;
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
}

// AIzaSyAFxiDXf1Vehu_K9kHmM9KIGwwFrMKQG5E