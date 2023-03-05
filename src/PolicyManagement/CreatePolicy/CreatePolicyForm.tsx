import React, { useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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
import { useForm, SubmitHandler } from "react-hook-form";
import SwitchBtn from "../../Components/Switch/SwitchBtn";
import "./CreatePolicyForm.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
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

const apiUrl = process.env.REACT_APP_API_KEY as string;

const CreatePolicyForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>();

  const [inputList, setInputList] = useState([{ add: "", cross: "" }]);
  const [personName, setPersonName] = useState<string[]>([]);
  const [applicableToValues, setApplicableToValues] = useState([]);
  const [policyType, setPolicyType] = useState<string>("");
  const [isPolicyActivated, setIsPolicyActivated] = useState(true);
  const [startDateValue, setStartDateValue] = useState<any>(null);
  const [endDateValue, setEndDateValue] = useState<any>(null);
  const policyFormDataAndActions = usePolicyForm();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data["startDate"] = convertUtcToYYMMDD(`${startDateValue}`);
    data["endDate"] = convertUtcToYYMMDD(`${endDateValue}`);
    data["type"] = policyType;
    data["applicableTo"] = applicableToValues;
    data["polygon"] = [
      "22.435334,77.8793843",
      "22.435334,77.8793843",
      "22.435334,77.8793843",
      "22.435334,77.8793843",
      "22.435334,77.8793843",
      "22.435334,77.8793843",
      "22.435334,77.8793843",
      "22.435334,77.8793843",
    ];
    data["domain"] = "mobility";
    data["status"] = isPolicyActivated ? "active" : "inactive";
    data["createdBy"] = "ujjwal";
    data["contactEmail"] = "test.user1@gmail.com";

    const createPolicyPayload = {
      policy: data,
    };

    axios
      .post(`${apiUrl}/v1/policy`, createPolicyPayload)
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    return () => {
      const existingFormData = getValues();

      policyFormDataAndActions.updatePolicyName(existingFormData.name);
      policyFormDataAndActions.updatePolicyType(policyType);
      policyFormDataAndActions.updatePolicyOwner(existingFormData.owner);
      policyFormDataAndActions.updateDescription(existingFormData.description);
      policyFormDataAndActions.updateCountry(existingFormData.country);
      policyFormDataAndActions.updateCity(existingFormData.city);
      policyFormDataAndActions.updatePolicyDocument(
        existingFormData.policyDocument
      );
      policyFormDataAndActions.updateApplicableTo(
        existingFormData.applicableTo
      );
      policyFormDataAndActions.updateRules(existingFormData.rules);
      policyFormDataAndActions.updateStartDate(existingFormData.startDate);
      policyFormDataAndActions.updateEndDate(existingFormData.endDate);
    };
  }, [policyType]);

  const handleActivateSwitch = () => {
    setIsPolicyActivated((prevValue) => !prevValue);
  };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    setApplicableToValues(value as any);
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handlePolicyChange = (event: any) => {
    setPolicyType(event.target.value);
  };

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

  return (
    <Box width={"100%"}>
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
            className={"country-row"}
          >
            <Box>
              <label>Country</label>
              <input
                placeholder="Enter country name"
                {...register("country")}
              />
            </Box>
            <Box>
              <label>City</label>
              <input
                placeholder="Enter city name"
                {...register("city", { required: true })}
              />

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
                    onChange={(newValue) => setStartDateValue(newValue)}
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
                    onChange={(newValue) => setEndDateValue(newValue)}
                    label="Select ‘to’ date"
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
              {inputList.map((x, i) => {
                return (
                  <div key={i} className="box-btn">
                    <input
                      name="EnterPolicyDocumentURL"
                      placeholder="Enter policy document URL"
                      value={x.add}
                      onChange={(e) => handleInputChange(e, i)}
                    />

                    {inputList.length - 1 === i && (
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
                    )}
                  </div>
                );
              })}
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
              <Box className={"Geofence-inrr"}>
                <AddIcon />
                <Link style={{ textDecoration: "none" }} to="/createGeoFence">
                  <span>Draw geofence on a map</span>
                </Link>
              </Box>
            </Box>
          )}
          <Box className={"Rules"} mt={3.5}>
            <label>Rules</label>
            <textarea {...register("rules", { required: true })}></textarea>
          </Box>
          <Box className={"footer-btn"} mt={3.5}>
            <Box component={"button"} className={"back"}>
              Go back
            </Box>
            <Box component={"button"} type="submit">
              Save
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default CreatePolicyForm;
