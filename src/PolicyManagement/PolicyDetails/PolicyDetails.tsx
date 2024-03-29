import { PublishedWithChanges } from "@mui/icons-material";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { convertUtcToDDMMYY } from "../../Common/Common.utils";
import PolicyModal from "../../Components/Policy-modal/PolicyModal";
import "./PolicyDetails.css";
import {
  getStatusDrodpwnItems,
  payloadForBrodcast,
  payloadForBrodcastUpdate,
} from "./PolicyDetails.utils";
import ViewGeofencing from "../Geofencing /ViewGeofencing";
import ResponsiveAppBar from "../../Layouts/Header/Header";

const apiUrl = process.env.REACT_APP_API_KEY as string;

function PolicyDetails() {
  const [policyDetails, setPolicyDetails] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusDetailArray, setStatusDetailArray] = useState<string[]>([
    policyDetails !== null
      ? policyDetails.status.charAt(0).toUpperCase() +
        policyDetails.status.slice(1)
      : "",
  ]);
  const [statusDetails, setStatusDetails] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    policyTitle: "",
    policySubTitle: "",
    modalIcon: "",
  });
  const [showGeoFence, setShowGeoFence] = useState(false);
  const firstRender = useRef(true);

  const handlePolicyChange = (event: any, val: any) => {
    setStatusDetails(event.target.value);
  };

  const parsedId = (id as string).substring(1);

  useEffect(() => {
    if (policyDetails !== null) {
      if (policyDetails.status === "published") {
        return setStatusDetails("Publish");
      }
      return setStatusDetails(
        policyDetails.status.charAt(0).toUpperCase() +
          policyDetails.status.slice(1)
      );
    }
  }, [policyDetails]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/v1/policy/${parsedId}`)
      .then((res) => setPolicyDetails(res.data.policy))
      .catch((e) => console.error(e));
  }, []);

  const handleStatus = useCallback(() => {
    // if (statusDetails !== "") {
    //   if (firstRender.current) {
    //     firstRender.current = false;
    //     return;
    //   }
    axios
      .patch(`${apiUrl}/v1/policy`, {
        policy: {
          id: parsedId,
          status:
            statusDetails === "Publish"
              ? "published"
              : statusDetails.toLowerCase(),
          modifiedBy: "Policy Admin",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.policy.status === "inactive") {
            setModalDetails({
              modalIcon: "/assets/inActivePolicy.svg",
              policySubTitle:
                "Policy has been deactivated. The policy is no longer in force.",
              policyTitle: "Policy has been deactivated!",
            });
            setIsModalOpen(true);
            axios
              .post(
                "https://api.mobility-bap-policy-demo.becknprotocol.io/v1/policy/broadcast/update",
                payloadForBrodcastUpdate(policyDetails, "inactive")
              )
              .then((res) => console.log("brodcast res", res))
              .catch((e) => console.error(e));
          }
          if (res.data.policy.status === "active") {
            setModalDetails({
              modalIcon: "/assets/activePolicy.svg",
              policySubTitle:
                "Policy activation was a success. Your policy will take effect once it has been ‘Published’. ",
              policyTitle: "Policy is now active!",
            });
            setIsModalOpen(true);
          }

          if (res.data.policy.status === "published") {
            setModalDetails({
              modalIcon: "/assets/publishedPolicy.svg",
              policySubTitle:
                "All BAP applications can now access this policy.",
              policyTitle: "Policy published successfully!",
            });
            setIsModalOpen(true);

            axios
              .post(
                "https://api.mobility-bap-policy-demo.becknprotocol.io/v1/policy/broadcast",
                payloadForBrodcast(policyDetails, "new")
              )
              .then((res) => console.log("brodcast res", res))
              .catch((e) => console.error(e));
          }
        }
      })

      .catch((e) => console.error(e));
    // }
  }, [statusDetails]);

  useEffect(() => {
    getStatusDrodpwnItems(statusDetails, setStatusDetailArray);
  }, [statusDetails]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
    window.location.reload();
  };

  if (policyDetails === null) {
    return <></>;
  }

  const getRules = (rule: "string" | "object") => {
    if (typeof rule === "string") return rule;
    return JSON.stringify(rule);
  };

  if (showGeoFence) {
    return (
      <ViewGeofencing
        coordinates={policyDetails.polygon}
        hideGeofence={setShowGeoFence}
      />
    );
  }
  return (
    <>
      {isModalOpen && (
        <PolicyModal
          handleClose={handleModalClose}
          open={isModalOpen}
          policyTitle={modalDetails.policyTitle}
          policySubTitle={modalDetails.policySubTitle}
          modalIcon={modalDetails.modalIcon}
          policyButtonText="Okay"
        />
      )}
      <ResponsiveAppBar HeaderText={"Information Details"} />
      <Box className="policy-wrapper">
        <Box className="policy-details-container">
          <Box className="form-data">
            <Box
              className="policy-details-header"
              fontWeight={"600"}
              fontSize="18px"
            >
              Information Update Metadata
            </Box>
            <Box display={"flex"} padding="20px 20px 0">
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Title
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {policyDetails.name}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Information Category
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {policyDetails.type}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Information Source Owner
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {policyDetails.owner}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Status
                </Typography>
                <FormControl className="select-policy-details">
                  <Select
                    className="select-policy details"
                    displayEmpty
                    value={statusDetails}
                    onChange={handlePolicyChange}
                    input={<OutlinedInput />}
                    inputProps={{ "aria-label": `${statusDetails}` }}
                  >
                    {statusDetailArray.map((status, i) => (
                      <MenuItem className="status" key={i} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box padding="20px" width={"100%"}>
              <Typography fontWeight={600} fontSize="14px" mb={1}>
                Description
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={"400"}
                gutterBottom
                fontSize="14px"
              >
                {policyDetails.description}
              </Typography>
            </Box>
            <Box display={"flex"} padding="20px">
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Country
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {policyDetails.country}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  City
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {policyDetails.city}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  From
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {convertUtcToDDMMYY(policyDetails.startDate)}
                </Typography>
              </Box>
              <Box width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  To
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {convertUtcToDDMMYY(policyDetails.endDate)}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"} padding="20px">
              <Box width={"50%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Sources
                </Typography>

                <a target="_blank" href={`${policyDetails.policyDocuments}`}>
                  {policyDetails.policyDocuments}{" "}
                </a>
              </Box>
              <Box className="Applicable-to" width={"25%"}>
                <Typography fontWeight={600} fontSize="14px" mb={1}>
                  Applicable to
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={"400"}
                  gutterBottom
                  fontSize="14px"
                >
                  {policyDetails.applicableTo.join(",")}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="geofence-view" mt="20px">
            <Box padding="20px">
              <Typography fontWeight={600} fontSize="14px" mb={1}>
                Geofence
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={"400"}
                gutterBottom
                className="button"
                fontSize="14px"
                color={"#004E92"}
                onClick={() => setShowGeoFence(!showGeoFence)}
              >
                Click to view
              </Typography>
            </Box>
          </Box>
          <Box className="geofence-view" mt="20px">
            <Box padding="20px">
              <Typography fontWeight={600} fontSize="14px" mb={1}>
                Rules
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={"400"}
                gutterBottom
                fontSize="14px"
              >
                {/* "id": 11, "title": "perfume Oil", "description": "Mega Discount,
              Impression of A...", "price": 13, "discountPercentage": 8.4,
              "rating": 4.26, "stock": 65, "brand": "Impression of Acqua Di
              Gio", "category": "fragrances", "thumbnail":
              "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
              "images": [ "https://i.dummyjson.com/data/products/11/1.jpg",
              "https://i.dummyjson.com/data/products/11/2.jpg",
              "https://i.dummyjson.com/data/products/11/3.jpg",
              "https://i.dummyjson.com/data/products/11/thumbnail.jpg"] */}
                {getRules(policyDetails.rules)}
              </Typography>
            </Box>
          </Box>
          <Box className={"footer-btn"} mt={3.5}>
            <Box
              component={"div"}
              onClick={() => navigate("/")}
              className={"back"}
            >
              Go back
            </Box>
            <Box className={"save"} onClick={handleStatus}>
              Update
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PolicyDetails;
