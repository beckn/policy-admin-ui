import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Polygon,
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";
import "./Geofencing.css";
import { usePolicyForm } from "../../Store/PolicyStore";
import { useNavigate } from "react-router-dom";
interface ViewGeoFenceProps {
  coordinates: string[];
  hideGeofence: (val: boolean) => void;
}
function ViewGeofencing(props: ViewGeoFenceProps) {
  const { coordinates, hideGeofence } = props;
  const [map, setMap] = React.useState(null);
  const [focusedMapPosition, setFocusedMapPosition] = useState({
    lat: 12.903561,
    lng: 77.5939631,
  });
  const [libraries] = useState(["places"]);

  const onLoad = useCallback(function callback(map: any) {
    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const polygonCoords = coordinates.map((location: string) => {
    const [lat, lng] = location.split(",");
    return { lat: parseFloat(lat), lng: parseFloat(lng) };
  });
  useEffect(() => {
    return () => {
      setMap(null);
    };
  });

  return (
    <Box className="geofencing-container">
      <Box
        height={"660px"}
        position="relative"
        width="98%"
        margin={"0 auto"}
        padding="25px 0 20px"
      >
        {/* {isLoaded && ( */}
        <div>
          <LoadScript
            libraries={libraries as any}
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY as string}
          >
            <GoogleMap
              center={focusedMapPosition}
              zoom={10}
              mapContainerStyle={{
                height: "660px",
                width: "100%",
                position: "absolute",
                borderRadius: "10px",
                overflow: "auto",
              }}
              options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker position={focusedMapPosition} />
              <Polygon
                paths={polygonCoords}
                options={{
                  strokeColor: "#000000",
                  fillColor: "#01326A",
                  strokeOpacity: 0.8,
                }}
                editable={true}
              />
            </GoogleMap>
          </LoadScript>
        </div>
        {/* )} */}
      </Box>

      <Box className={"footer-geofencing-btn"} mt={5}>
        <Box
          component={"div"}
          onClick={() => hideGeofence(false)}
          className={"back"}
          mr="unset !important"
        >
          Go back
        </Box>
      </Box>
    </Box>
  );
}

export default ViewGeofencing;
