import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material/index.js";
import { LocationCity, AirplaneTicket } from "@mui/icons-material";

function InfoModal(props) {
  const [depth, setDepth] = useState(null);
  const [mag, setMag] = useState(null);
  const [openCities, setOpenCities] = useState(false);
  const [openAirports, setOpenAirports] = useState(false);
  const [closestCities, setClosestCities] = useState(null);
  const [closestAirports, setClosestAirports] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    async function setData() {
      setDepth(props.infoData.depth);
      setMag(props.infoData.mag);
      getClosestCities(props.infoData.location_properties.closestCities);
      getClosestAirports(props.infoData.location_properties.airports);
    }
    setData();
  });

  function getClosestCities(arr) {
    const cities = [];
    arr.map((data) => {
      return cities.push(data.name);
    });
    setClosestCities(cities.join());
  }

  function getClosestAirports(arr) {
    const airports = [];
    arr.map((data) => {
      return airports.push(data.name);
    });
    setClosestAirports(airports.join());
  }

  const handleCities = () => { setOpenCities(!openCities); };

  const handleAirports = () => { setOpenAirports(!openAirports); };

  const handleClose = () => {
    props.closeModal();
    setClosestAirports(null);
    setClosestCities(null);
    setOpenAirports(false);
    setOpenCities(false);
    setDepth(null);
    setMag(null);
  };

  return (
    <div>
      <Modal open={props.showModal} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Detailed Information`}
          </Typography>
          <List>
            <ListItemText primary={`Depth: ${depth}`} />
            <ListItemText primary={`Magnitude: ${mag}`} />
            <ListItem disablePadding>
              <ListItemButton onClick={handleAirports}><ListItemIcon><AirplaneTicket /></ListItemIcon>
                <ListItemText primary="Nearby Airports" />
              </ListItemButton>
            </ListItem>
            <Collapse in={openAirports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding><ListItemText primary={closestAirports} /></List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton onClick={handleCities}><ListItemIcon><LocationCity /></ListItemIcon>
                <ListItemText primary="Nearby Cities" />
              </ListItemButton>
            </ListItem>
            <Collapse in={openCities} timeout="auto" unmountOnExit>
              <List component="div" disablePadding><ListItemText primary={closestCities} /></List>
            </Collapse>
          </List>
        </Box>
      </Modal>
    </div>
  );
}

export default InfoModal;
