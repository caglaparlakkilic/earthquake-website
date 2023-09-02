import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { Box, Button, Paper } from "@mui/material";

export default function Map() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(32.866287);
  const [lat] = useState(39.925533);
  const [zoom] = useState(5);
  const [API_KEY] = useState("kGNHmrutTXlmpU61SppN");
  const currentDate = moment().format("YYYY-MM-DD");
  const [data, setData] = useState([]);
  const options = {
    method: "GET",
    url: "https://api.orhanaydogdu.com.tr/deprem/kandilli/archive",
    params: {
      date: currentDate,
      date_end: currentDate,
      skip: 0,
      limit: 0,
    },
  };

  useEffect(() => {
    fetchData();
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  async function fetchData() {
    const response = await axios.request(options);
    setData(response.data.result.slice(0).reverse());
  }

  useEffect(() => {
    if (data.length > 0) {
      return addMarkerToMap();
    }
  }, [data]);

  function addMarkerToMap() {
    data?.map((item) => {
      const lng = item.geojson.coordinates[0];
      const lat = item.geojson.coordinates[1];
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<div><p>Location:${item.title}</p><p>Magnitude:${item.mag}</p><p>Depth:${item.depth}</p><p>Date:${moment(item.date).format("DD/MM/YYYY HH:mm")}</p></div>`
      );
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");
      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);
    });
  }

  return (
    <div>
      <Box component={Paper}>
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      </Box>
      <div class="alert alert-info" role="alert">
        {
          "Only today's earthquakes are shown. You can go to the listing page for more."
        }
        <Button color="primary" onClick={() => navigate("/")}>Click to go to home page</Button>
      </div>
    </div>
  );
}
