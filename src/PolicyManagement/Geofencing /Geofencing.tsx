import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import "./Geofencing.css";
import { usePolicyForm } from "../../Store/PolicyStore";
import { useNavigate } from "react-router-dom";

function Geofencing() {
  const [map, setMap] = React.useState(null);
  const [coordinates, setCoordinates] = useState<{ lat: any; lng: any }[]>([]);
  const [coordinatesForForm, setCoordinatesForForm] = useState<string[]>([]);
  const navigate = useNavigate();
  const policyFormDataAndActions = usePolicyForm();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDj_jBuujsEk8mkIva0xG6_H73oJEytXEA",
  });

  const handleClearPolygon = () => {
    setCoordinates([]);
    setCoordinatesForForm([]);
  };

  const handleMapClick = (event: any) => {
    const coordinate = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCoordinates([...coordinates, coordinate]);
    setCoordinatesForForm([
      ...coordinatesForForm,
      `${event.latLng.lat()}`,
      `${event.latLng.lng()}`,
    ]);
  };

  const onLoad = useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const handleSaveCoordinates = () => {
    policyFormDataAndActions.updatePolygon(coordinatesForForm);
    navigate("/createPolicy");
  };

  const position = {
    lat: 12.903561,
    lng: 77.5939631,
  };

  return (
    <Box className="geofencing-container">
      <Typography>* Please click on points to create polygon</Typography>
      <Box height={"700px"}>
        {isLoaded && (
          <div>
            <button onClick={handleClearPolygon}>Clear Polygon</button>
            <GoogleMap
              center={position}
              zoom={8}
              mapContainerStyle={{
                height: "400px",
                width: "100%",
                position: "absolute",
                borderRadius: "10px",
              }}
              options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={handleMapClick}
            >
              <Marker position={position} />
              <Polygon
                paths={coordinates}
                options={{
                  strokeColor: "#000000",
                  fillColor: "#01326A",
                  strokeOpacity: 0.8,
                }}
                editable={true}
              />
            </GoogleMap>
          </div>
        )}
      </Box>
      <Box className={"footer-geofencing-btn"} mt={3.5}>
        <Box className={"back"}>Go back</Box>
        <Box
          component={"div"}
          onClick={handleSaveCoordinates}
          className={"save"}
        >
          Save
        </Box>
      </Box>
    </Box>
  );
}

export default Geofencing;
