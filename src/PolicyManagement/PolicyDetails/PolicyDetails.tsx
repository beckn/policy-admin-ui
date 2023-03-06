import {
  Box,
  NativeSelect,
  OutlinedInput,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./PolicyDetails.css";

function PolicyDetails() {
  return (
    <Box className="policy-details-container">
      <Box className="form-data">
        <Box className="policy-details-header">Policy details</Box>
        <Box display={"flex"} justifyContent={"space-between"} padding="15px">
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Name
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              Quarantine Zone
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Type
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              Geofence
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Owner
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              Ministry of transport
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Status
            </Typography>
            <NativeSelect
              style={{ width: "181px" }}
              input={<OutlinedInput />}
              defaultValue={"Active"}
            >
              <option className="status" value="Active">
                Active
              </option>
              <option className="status" value="Publish">
                Publish
              </option>
              <option className="status" value="Inactive">
                Inactive
              </option>
            </NativeSelect>
          </Box>
        </Box>
        <Box padding="15px">
          <Typography fontWeight={600} fontSize="14px" mb={1}>
            Description
          </Typography>
          <Typography variant="subtitle2" gutterBottom fontSize="14px">
            Lorem ipsum dolor sit amet consectetur. Fames suspendisse parturient
            interdum vitae. Tortor nisl velit et mi eros a nisi nulla. Tortor
            consectetur tristique quisque posuere ornare tristique tortor urna
            ornare. Bibendum cursus sollicitudin non mi morbi magna. Consequat
            ipsum hac nunc turpis ornare varius semper in sagittis.
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"} padding="15px">
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Country
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              India
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              City
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              Gurugram
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              From
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              01/12/2021
            </Typography>
          </Box>
          <Box style={{ width: "181px" }}>
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              To
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              No date selected
            </Typography>
          </Box>
        </Box>
        <Box display={"flex"} padding="15px">
          <Box width={"50%"} className="policy-doc">
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Policy Document
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              fontSize="14px"
              color={"#004E92"}
            >
              https:beckn.in/Gurugram/quarantinezone.pdf 1
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              fontSize="14px"
              color={"#004E92"}
            >
              https:beckn.in/Gurugram/quarantinezone.pdf 1
            </Typography>
          </Box>
          <Box width={"50%"} className="Applicable-to">
            <Typography fontWeight={600} fontSize="14px" mb={1}>
              Applicable to
            </Typography>
            <Typography variant="subtitle2" gutterBottom fontSize="14px">
              BAP; BPP
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="geofence-view" mt="20px">
        <Box padding="15px">
          <Typography fontWeight={600} fontSize="14px" mb={1}>
            Geofence
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            fontSize="14px"
            color={"#004E92"}
          >
            Click to view
          </Typography>
        </Box>
      </Box>
      <Box className="geofence-view" mt="20px">
        <Box padding="15px">
          <Typography fontWeight={600} fontSize="14px" mb={1}>
            Rules
          </Typography>
          <Typography variant="subtitle2" gutterBottom fontSize="14px">
            "id": 11, "title": "perfume Oil", "description": "Mega Discount,
            Impression of A...", "price": 13, "discountPercentage": 8.4,
            "rating": 4.26, "stock": 65, "brand": "Impression of Acqua Di Gio",
            "category": "fragrances", "thumbnail":
            "https://i.dummyjson.com/data/products/11/thumbnail.jpg", "images":
            [ "https://i.dummyjson.com/data/products/11/1.jpg",
            "https://i.dummyjson.com/data/products/11/2.jpg",
            "https://i.dummyjson.com/data/products/11/3.jpg",
            "https://i.dummyjson.com/data/products/11/thumbnail.jpg"]
          </Typography>
        </Box>
      </Box>
      <Box className={"footer-btn"} mt={3.5}>
        <Box className={"back"}>Go back</Box>
        <Box className={"save"}>Update</Box>
      </Box>
    </Box>
  );
}

export default PolicyDetails;
