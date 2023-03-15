// @ts-nocheck
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
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ResponsiveAppBar from "../../Layouts/Header/Header";
import { cityCoordinates } from "../../Common/GeoLocation";

function Geofencing() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "Bangalore";
  const cityLatLng = cityCoordinates[city] || {
    lat: 12.903561,
    lng: 77.5939631,
  };

  const [map, setMap] = React.useState(null);
  const [focusedMapPosition, setFocusedMapPosition] = useState(cityLatLng);
  const [coordinates, setCoordinates] = useState<{ lat: any; lng: any }[]>([]);
  const [coordinatesForForm, setCoordinatesForForm] = useState<string[]>([]);
  const navigate = useNavigate();
  const policyFormDataAndActions = usePolicyForm();
  const [autocomplete, setAutocomplete] = React.useState(null);
  const [libraries] = useState(["places"]);

  const handleClearPolygon = () => {
    setCoordinates([]);
    setCoordinatesForForm([]);
    policyFormDataAndActions.updatePolygon([]);
  };

  const handleMapClick = (event: any) => {
    const coordinate = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCoordinates([...coordinates, coordinate]);
    setCoordinatesForForm([
      ...coordinatesForForm,
      `${event.latLng.lat()},${event.latLng.lng()}`,
    ]);
  };

  useEffect(() => {
    const coordinatesData = policyFormDataAndActions.polygon;
    const CordinateResult = coordinatesData.map((location) => {
      const [lat, lng] = location.split(",");
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    });
    if (policyFormDataAndActions.polygon.length !== 0) {
      setCoordinates(CordinateResult);
    }
  }, []);

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

  const onAutoCompleteLoad = (autocomplete: any) => [
    setAutocomplete(autocomplete),
  ];

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = (autocomplete as any).getPlace();
      setFocusedMapPosition(place.geometry.location.toJSON());
    } else {
      alert("Autocomplete is not loaded yet!");
    }
  };

  const autoCompleteInputStyle: React.CSSProperties = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    left: "50%",
    marginTop: "12px",
    marginLeft: "-120px",
  };

  return (
    <>
      <ResponsiveAppBar HeaderText={"Draw Geofencing "} />
      <Box className="policy-wrapper policy-geo" padding={"0 0 0"}>
        <Box className="geofencing-container">
          <Box
            display={"flex"}
            justifyContent="space-between"
            padding={"20px 25px"}
          >
            <Typography fontSize={"14px"}>
              * Please draw a polygon to create a Geofence
            </Typography>
            <Box>
              <Box className={"clear-geo"} onClick={handleClearPolygon}>
                Clear Geofence
              </Box>
            </Box>
          </Box>
          <Box height={"660px"} position="relative" width="100%">
            {/* {isLoaded && ( */}
            <div>
              <LoadScript
                libraries={libraries as any}
                googleMapsApiKey={
                  process.env.REACT_APP_GOOGLE_MAP_KEY as string
                }
              >
                <GoogleMap
                  center={focusedMapPosition}
                  zoom={10}
                  mapContainerStyle={{
                    height: "660px",
                    width: "100%",
                    position: "absolute",
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
                  onClick={handleMapClick}
                >
                  <Marker position={focusedMapPosition} />
                  <Polygon
                    paths={coordinates}
                    options={{
                      strokeColor: "#000000",
                      fillColor: "#01326A",
                      strokeOpacity: 0.8,
                    }}
                    editable={true}
                  />
                  <Autocomplete
                    onLoad={onAutoCompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Enter a location"
                      style={autoCompleteInputStyle}
                    />
                  </Autocomplete>
                </GoogleMap>
              </LoadScript>
            </div>
            {/* )} */}
          </Box>

          <Box className={"footer-geofencing-btn"} mt={4}>
            <Box
              component={"div"}
              onClick={() => navigate("/createPolicy")}
              className={"back"}
            >
              Go back
            </Box>
            <Box
              component={"div"}
              onClick={handleSaveCoordinates}
              className={"save"}
            >
              Save
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Geofencing;
