import React, { useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from "@mui/material";

function Filter(props) {
  const [cities, setCities] = useState([]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#ba000d",
        contrastText: "#fff",
      },
    },
  });

  const setMinMag = (event) => {
    props.setMagnitude(event.target.value);
  };

  const setSelectedCity = (event) => {
    props.setCity(event.target.value);
  };

  async function getCities() {
    const response = await axios.get(
      "https://turkiyeapi.cyclic.app/api/v1/provinces"
    );
    setCities(response.data.data);
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: "25px", marginBottom: "10px" }}>
        <FormControl sx={{ minWidth: 220, marginRight: '10px' }} size="small">
          <InputLabel id="demo-select-small-label">Location</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Location"
            placeholder="Location"
            onOpen={getCities}
            onChange={setSelectedCity}
          >
            {cities?.map((data) => {
              return <MenuItem value={data.id}>{data.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 0, max: 10 } }}
          size="small"
          style={{width: '220px', marginRight: "10px"}}
          id="outlined-basic"
          label="Minimum Magnitude"
          variant="outlined"
          onChange={setMinMag}
        />
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={props.submitFilter}
          style={{marginRight: "10px"}}
        >
          Submit filters
        </Fab>
        <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          onClick={props.resetFilter}
        >
          Reset filters
        </Fab>
      </div>
    </ThemeProvider>
  );
}

export default Filter;
