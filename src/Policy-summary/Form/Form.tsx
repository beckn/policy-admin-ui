import React from "react";
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
import SwitchBtn from "./SwitchBtn";
import "./Form.css";
import { useState } from "react";
import { Calendar } from "react-date-range";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

type Inputs = {
  example: string;
  exampleRequired: string;
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [inputList, setInputList] = useState([{ add: "", cross: "" }]);

  const [personName, setPersonName] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
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
  const dateHandler = () => {
    setOpen(true);
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
              <FormControlLabel label="" control={<SwitchBtn />} />
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
              <input
                defaultValue="Enter Policy Name"
                {...register("example")}
              />
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
                  multiple
                  displayEmpty
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
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.exampleRequired && <span>This field is required</span>}
            </Box>
            <Box>
              <label>Policy Owner</label>
              <input
                defaultValue="Enter Policy Owner Name"
                {...register("exampleRequired", { required: true })}
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </Box>
          </Box>
          <Box>
            <label>Description</label>
            <textarea
              defaultValue="Add policy description"
              {...register("example")}
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
                defaultValue="Enter country name"
                {...register("example")}
              />
            </Box>
            <Box>
              <label>City</label>
              <input
                defaultValue={"Enter city name"}
                {...register("exampleRequired", { required: true })}
              />

              {errors.exampleRequired && <span>This field is required</span>}
            </Box>
            <Box>
              <label>From</label>
              <input
                onClick={dateHandler}
                defaultValue="Select ‘from’ date "
                {...register("exampleRequired", { required: true })}
              />
              {open ? <Calendar date={new Date()} /> : null}
              {errors.exampleRequired && <span>This field is required</span>}
            </Box>
            <Box>
              <label>To</label>
              <input
                defaultValue="Select ‘from’ date "
                {...register("exampleRequired", { required: true })}
              />
              {errors.exampleRequired && <span>This field is required</span>}
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
                  <div className="box-btn">
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
                multiple
                displayEmpty
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
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </form>
      </Box>
      <Box className={"Geofence"} mt={3.5}>
        <label>Geofence</label>
        <Box className={"Geofence-inrr"}>
          <AddIcon />
          <span>Draw geofence on a map</span>
        </Box>
      </Box>
      <Box className={"Rules"} mt={3.5}>
        <label>Rules</label>
        <textarea></textarea>
      </Box>
      <Box className={"footer-btn"} mt={3.5}>
        <Box className={"back"}>Go back</Box>
        <Box className={"save"}>Save</Box>
      </Box>
    </Box>
  );
};
export default Form;
