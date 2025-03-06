import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { handleLogout } from "../helpers/utils";
import { useNavigate } from "react-router-dom";
import { config } from "../config";

interface AdvisoryFormData {
  summary: string;
  advisory_id: string;
  advisory_type: string;
  exploits_source: string;
  exploits_title: string;
  detection_id: string;
  detection_title: string;
  limit_count: number;
  start_date: string;
  end_date: string;
}

const AdvisoryForm: React.FC = () => {
    const navigate = useNavigate();

  const { control, register, handleSubmit } = useForm<AdvisoryFormData>({
    defaultValues: {
      summary: "",
      advisory_id: "",
      advisory_type: "",
      exploits_source: "",
      exploits_title: "",
      detection_id: "",
      detection_title: "",
      limit_count: 100,
    //   start_date: null,
    //   end_date: null,
    },
  });

  const token = window.localStorage.getItem("token");
  const apiUrl =  config.vfeedApiUrl + "/vuln";
  const apiCallFunction = (payload:any)=>{
    axios
    .request({
      method: "POST",
      url: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        ...payload
      },
    })
  .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          handleLogout();
        } else if (err.response?.status === 429) {
          navigate("/error");
        }
      })
      .finally(() => {
        // setLoading(false);
      });
  }

  const onSubmit = (data: AdvisoryFormData) => {
    apiCallFunction(data)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Text Fields */}
         <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", width: "100%",marginBottom: "10px" ,paddingInline: "10px"}}>
         {[
            "summary",
            "advisory_id",
            "advisory_type",
            "exploits_source",
          ].map((field) => (
            <Grid item key={field} style={{width: "24%", minWidth:"120px"}}>
              <TextField label={field.replace("_", " ")} fullWidth {...register(field as keyof AdvisoryFormData)} />
            </Grid>
          ))}
         </div>

         <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", width: "100%", marginBottom: "10px",paddingInline: "10px"}}>
            {[
            "exploits_title",
            "detection_title",
            "detection_id",
          ].map((field) => (
            <Grid item style={{width:'24%', minWidth:"120px"}} key={field}>
              <TextField label={field.replace("_", " ")} fullWidth {...register(field as keyof AdvisoryFormData)} />
            </Grid>
          ))}

           {/* Limit Count */}
           <Grid item style={{width:'24%', minWidth:"120px"}}>
            <TextField
              label="Limit Count"
              type="number"
              fullWidth
              {...register("limit_count")}
            />
          </Grid>
         </div>

         

          {/* Date Pickers */}
          <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px", width: "100%", marginBottom: "10px",paddingInline: "10px"}}>
          {["start_date", "end_date"].map((field) => (
            <Grid item style={{width:"49%", minWidth:"120px"}} key={field}>
              <Controller
                name={field as keyof AdvisoryFormData}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={field.name.replace("_", " ").replace("date", "Date")}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : null)}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
            </Grid>
          ))}
          </div>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default AdvisoryForm;
