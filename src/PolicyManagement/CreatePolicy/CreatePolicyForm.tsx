import React, { useCallback, useEffect } from "react";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import SwitchBtn from "../../Components/Switch/SwitchBtn";
import "./CreatePolicyForm.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
//TODO check if this is required
// import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { convertUtcToYYMMDD } from "../../Common/Common.utils";
import { usePolicyForm } from "../../Store/PolicyStore";
import {
  anotherNames,
  IFormInput,
  policyTypes,
} from "./CreatePolicyForm.utils";
import axios from "axios";
import PolicyModal from "../../Components/Policy-modal/PolicyModal";
import { GeoLocations } from "../../Common/GeoLocation";
import { Dayjs } from "dayjs";
const apiUrl = process.env.REACT_APP_API_KEY as string;
const getSavedDate = () => {
  const date = localStorage.getItem("date");
  return date ? JSON.parse(date) : {};
};
const CreatePolicyForm = () => {
  const { start = null, end = null } = getSavedDate();

  const [inputList, setInputList] = useState([{ add: "", cross: "" }]);
  const [personName, setPersonName] = useState<string[]>([]);
  const [applicableToValues, setApplicableToValues] = useState([]);
  const [policyType, setPolicyType] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [city, setCity] = useState<string>("Banglore");
  const [isPolicyActivated, setIsPolicyActivated] = useState(true);
  const [startDateValue, setStartDateValue] = useState<any>(null);
  const [endDateValue, setEndDateValue] = useState<any>(null);
  const [rulesJson, setRulesJson] = useState<any>(null);
  const [geofence, setGeoFence] = useState<any>(false);
  const [isPolicyCreationSuccessful, setIsPolicyCreationSuccessful] =
    useState<boolean>(false);

  const policyFormDataAndActions = usePolicyForm();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: policyFormDataAndActions.policyName,
      owner: policyFormDataAndActions.policyOwner,
      description: policyFormDataAndActions.description,
      policyDocument: policyFormDataAndActions.policyDocument,
      rules: policyFormDataAndActions.rules,
      country: policyFormDataAndActions.country,
      city: policyFormDataAndActions.city,
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data["startDate"] = convertUtcToYYMMDD(`${startDateValue}`);
    data["endDate"] = convertUtcToYYMMDD(`${endDateValue}`);
    data["type"] = policyType;
    data["applicableTo"] = personName;
    data["polygon"] = policyFormDataAndActions.polygon;
    data["domain"] = "mobility";
    data["status"] = isPolicyActivated ? "active" : "inactive";
    data["createdBy"] = "ujjwal";
    data["contactEmail"] = "test.user1@gmail.com";
    data["country"] = country;
    data["city"] = city;

    const createPolicyPayload = {
      policy: data,
    };

    axios
      .post(`${apiUrl}/v1/policy`, createPolicyPayload)
      .then((res) => {
        if (res.status === 200) {
          setIsPolicyCreationSuccessful(true);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (policyFormDataAndActions.policyType !== "") {
      setPolicyType(policyFormDataAndActions.policyType);
    }
    if (policyFormDataAndActions.applicableTo) {
      setPersonName(policyFormDataAndActions.applicableTo as string[]);
    }

    if (policyFormDataAndActions.country !== "") {
      setCountry(policyFormDataAndActions.country);
    }

    if (policyFormDataAndActions.city !== "") {
      setCity(policyFormDataAndActions.city);
    }

    if (policyFormDataAndActions.startDate !== null) {
      setStartDateValue(policyFormDataAndActions.startDate);
    }

    if (policyFormDataAndActions.endDate !== null) {
      setEndDateValue(policyFormDataAndActions.endDate);
    }
  }, []);

  useEffect(() => {
    return () => {
      const existingFormData = getValues();

      policyFormDataAndActions.updatePolicyName(existingFormData.name);
      // policyFormDataAndActions.updatePolicyType(policyType);
      policyFormDataAndActions.updatePolicyOwner(existingFormData.owner);
      policyFormDataAndActions.updateDescription(existingFormData.description);
      policyFormDataAndActions.updatePolicyDocument(
        existingFormData.policyDocument
      );
      // policyFormDataAndActions.updateApplicableTo(personName);
      policyFormDataAndActions.updateRules(existingFormData.rules);
      policyFormDataAndActions.updateStartDate(startDateValue);
      policyFormDataAndActions.updateEndDate(endDateValue);
    };
  }, [startDateValue, endDateValue]);

  const handleModalClose = () => {
    setIsPolicyCreationSuccessful(false);
    navigate("/");
  };

  const handleActivateSwitch = () => {
    setIsPolicyActivated((prevValue) => !prevValue);
  };

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;

      setApplicableToValues(value as any);
      setPersonName(typeof value === "string" ? value.split(",") : value);
      policyFormDataAndActions.updateApplicableTo(
        typeof value === "string" ? value.split(",") : value
      );
      const presentExistingFormData = getValues();

      setRulesJson({
        context: {
          action: "policy",
          domain: "mobility",
          location: {
            country: "IND",
            city: "080",
          },
          version: "1.0.0",
        },
        message: {
          policy: {
            id: "1",
            owner: {
              descriptor: {
                name: presentExistingFormData.owner,
                contact: {
                  email: "support@moh.gov.in",
                },
              },
            },
            descriptor: {
              name: presentExistingFormData.name,
              short_desc: presentExistingFormData.description,
              "	media": [
                {
                  mimetype: "application/pdf",
                  url: presentExistingFormData.policyDocument,
                },
              ],
            },
            type: policyType,
            coverage: [
              {
                spatial: [
                  {
                    country: "IND",
                    city: "std:080",
                  },
                ],
                temporal: [
                  {
                    range: {
                      start: convertUtcToYYMMDD(startDateValue),
                      end: convertUtcToYYMMDD(endDateValue),
                    },
                  },
                ],
                subscribers: [
                  {
                    type: "bap",
                  },
                  {
                    type: "bpp",
                  },
                ],
              },
            ],
            geofences: [
              {
                polygon: policyFormDataAndActions.polygon,
              },
            ],
          },
        },
      });
    },
    []
  );

  const handlePolicyChange = useCallback((event: any) => {
    setPolicyType(event.target.value);
    policyFormDataAndActions.updatePolicyType(event.target.value);
  }, []);

  const handleInputChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { add: "", cross: "" }]);
  };

  const selectedCountry = country;

  const selectedCountryObj = GeoLocations.filter(
    (location) => location.country.countryNmae === selectedCountry
  )[0];

  const handleCountryChange = useCallback((event: any) => {
    setCountry(event.target.value);
    policyFormDataAndActions.updateCountry(event.target.value);
    setCity("");
  }, []);
  const handleCityChange = useCallback((event: any) => {
    setCity(event.target.value);
    policyFormDataAndActions.updateCity(event.target.value);
  }, []);

  useEffect(() => {
    saveGeoFence();
  }, [country]);

  const saveGeoFence = useCallback(() => {
    policyFormDataAndActions.polygon.map((item, i) => {
      if (item !== "") {
        setGeoFence(true);
      }
    });
  }, []);

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDateValue(newValue);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDateValue(newValue);
  };

  return (
    <Box width={"100%"}>
      <PolicyModal
        handleClose={handleModalClose}
        open={isPolicyCreationSuccessful}
        policyTitle="Policy has been created!"
        policySubTitle="Policy activation was a success. Your policy will take effect once it has been ‘Published’. "
        modalIcon="/assets/activePolicy.svg"
        policyButtonText="Okay"
      />
      <Box className={"form-container"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          className={"addPolicy-container"}
        >
          <Typography width={"50%"}>Add policy details</Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography pr={3}>Activate</Typography>
            <FormGroup>
              <FormControlLabel
                label=""
                control={
                  <SwitchBtn
                    onChange={handleActivateSwitch}
                    checked={isPolicyActivated}
                  />
                }
              />
            </FormGroup>
          </Box>
        </Box>
        <Divider className="devider" />
        <form onSubmit={handleSubmit(onSubmit)} className="policy-form">
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            className={"row-form"}
          >
            <Box>
              <label>Policy Name</label>
              <input placeholder="Enter Policy Name" {...register("name")} />
            </Box>
            <Box>
              <label>Policy Type</label>
              {/* <input {...register("exampleRequired", { required: true })} /> */}
              <FormControl
                sx={{ m: 1, width: 300, mt: 3 }}
                className="select-policy-container"
              >
                <Select
                  className="select-policy"
                  displayEmpty
                  value={policyType}
                  onChange={handlePolicyChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>Select</span>;
                    }

                    return selected;
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <span>Select</span>
                  </MenuItem>
                  {policyTypes.map((policyType, i) => (
                    <MenuItem key={i} value={policyType}>
                      {policyType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.type && <span>This field is required</span>}
            </Box>
            <Box>
              <label>Policy Owner</label>
              <input
                placeholder="Enter Policy Owner Name"
                {...register("owner", { required: true })}
              />
              {errors.owner && <span>This field is required</span>}
            </Box>
          </Box>
          <Box>
            <label>Description</label>
            <textarea
              placeholder="Add policy description"
              {...register("description")}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            className={"country-row"}
          >
            <Box>
              <label>Country</label>
              {/* <input
                placeholder="Enter country name"
                {...register("country")}
              /> */}
              <FormControl
                sx={{ m: 1, width: 300, mt: 3 }}
                className="select-policy-container"
              >
                <Select
                  className="select-policy"
                  displayEmpty
                  value={country}
                  onChange={handleCountryChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>select</span>;
                    }

                    return selected;
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <span>select</span>
                  </MenuItem>
                  {GeoLocations.map((GeoLocation, i) => (
                    <MenuItem key={i} value={GeoLocation.country.countryNmae}>
                      {GeoLocation.country.countryNmae}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label>City</label>
              {/* <input
                placeholder="Enter city name"
                {...register("city", { required: true })}
              /> */}
              <FormControl
                sx={{ m: 1, width: 300, mt: 3 }}
                className="select-policy-container"
              >
                <Select
                  className="select-policy"
                  displayEmpty
                  value={city}
                  onChange={handleCityChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>select</span>;
                    }

                    return selected;
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <span>select</span>
                  </MenuItem>
                  {selectedCountryObj.country.cities.map((city, i) => (
                    <MenuItem key={i} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {errors.city && <span>This field is required</span>}
            </Box>
            <Box>
              <label>From</label>
              {/* <input
                onClick={dateHandler}
                placeholder="Select ‘from’ date "
                {...register("startDate", { required: true })}
              />
              {open ? <Calendar date={new Date()} /> : null}
              {errors.startDate && <span>This field is required</span>} */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="date-start"
                    value={startDateValue}
                    onChange={handleStartDateChange}
                    label="Select ‘from’ date "
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label>To</label>
              {/* <input
                placeholder="Select ‘to’ date "
                {...register("endDate", { required: true })}
              />
              {errors.endDate && <span>This field is required</span>} */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="date-start"
                    onChange={handleEndDateChange}
                    label="Select ‘to’ date"
                    value={endDateValue}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            className={"policy-doc"}
            width="70.5%"
          >
            <Box>
              <label>Policy Document</label>
              {/* <input
              defaultValue="Enter policy document URL"
              {...register("exampleRequired", { required: true })}
            /> */}

              <div className="box-btn">
                <input
                  placeholder="Enter policy document URL"
                  {...register("policyDocument", { required: true })}
                  // onChange={(e) => handleInputChange(e)}
                />
                {/* TODO if the commented code is required */}

                {/* {inputList.length - 1 === i && (
                      <Box
                        className={"addicon addiconn"}
                        onClick={handleAddClick}
                      >
                        <AddIcon />
                      </Box>
                    )}
                    {inputList.length !== 1 && (
                      <Box
                        className={"clearIcon clearIconF"}
                        onClick={() => handleRemoveClick(i)}
                      >
                        <ClearIcon />
                      </Box>
                    )} */}
              </div>
            </Box>
            <Box className={"applicable-tab"}>
              <label>Applicable to</label>
              <Select
                className="applicable-policy"
                displayEmpty
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span>Select</span>;
                  }

                  return selected.join(", ");
                }}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <span>Select</span>
                </MenuItem>
                {anotherNames.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          {policyType === "Geofence" && (
            <Box className={"Geofence"} mt={3.5}>
              <label>Geofence</label>
              {geofence ? (
                <Box className={"Geofence-inrr"}>
                  <Link style={{ textDecoration: "none" }} to="/createGeoFence">
                    <span>View geo fence</span>
                  </Link>
                </Box>
              ) : (
                <Box className={"Geofence-inrr"}>
                  <AddIcon />
                  <Link style={{ textDecoration: "none" }} to="/createGeoFence">
                    <span>Draw geofence on a map</span>
                  </Link>
                </Box>
              )}
            </Box>
          )}
          <Box className={"Rules"} mt={3.5}>
            <label>Rules</label>
            <textarea
              value={
                rulesJson !== null
                  ? JSON.stringify(rulesJson, undefined, 2)
                  : ""
              }
              {...register("rules", { required: true })}
            ></textarea>
          </Box>
          <Box className={"footer-btn"} mt={3.5}>
            <Box
              onClick={() => navigate("/")}
              component={"button"}
              className={"back"}
            >
              Go back
            </Box>
            <Box component={"button"} type="submit" className={"save"}>
              Save
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default CreatePolicyForm;
