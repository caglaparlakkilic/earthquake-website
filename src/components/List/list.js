import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import InfoModal from "./infoModal.js";
import Filter from "./filter.js";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();
  const currentDate = moment().format("YYYY-MM-DD");
  const startingDate = moment().add(-3, "days").format("YYYY-MM-DD");
  const [infoData, setInfoData] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / 30);
  const start = (currentPage - 1) * 30;
  const end = start + 30;
  const currentItems = data.slice(start, end);
  const options = {
    method: "GET",
    url: "https://api.orhanaydogdu.com.tr/deprem/kandilli/archive",
    params: {
      date: startingDate,
      date_end: currentDate,
      skip: 0,
      limit: 0,
    },
  };

  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(null);
  const [magnitude, setMagnitude] = useState(null);

  const handleOpen = (data) => {
    setInfoData(data);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.request(options);
    setData(response.data.result.slice(0).reverse());
  }

  const getFilteredData = (filters) => {
    if (filters) {
      let filteredData = [];
      if (filters.city) {
        filteredData = data?.filter(
          (item) => item.location_properties.epiCenter.cityCode === filters.city
        );
      }
      if (filters.magnitude) {
        filteredData =
          filteredData.length > 0
            ? filteredData.filter(
                (item) => item.mag >= parseInt(filters.magnitude)
              )
            : data?.filter((item) => item.mag >= parseInt(filters.magnitude));
      }
      setData(filteredData);
    }
  };

  const resetFilter = () => {
    setCity(null);
    setMagnitude(null);
    fetchData();
  };

  useEffect(() => {
    console.log(city);
  }, [city]);

  const submitFilter = () => {
    getFilteredData({ city: city, magnitude: magnitude });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Filter
          submitFilter={submitFilter}
          resetFilter={resetFilter}
          setCity={setCity}
          setMagnitude={setMagnitude}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Magnitude</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems?.map((item) => {
              return (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {moment(item.date).format("DD MMMM, YYYY HH:mm")}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.mag}</TableCell>
                  <TableCell>
                    <i
                      style={{ cursor: "pointer" }}
                      class="fas fa-info-circle cursor-pointer"
                      onClick={() => handleOpen(item)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <InfoModal showModal={open} closeModal={closeModal} infoData={infoData} />
      <div>
        <Pagination
          count={totalPages}
          shape="rounded"
          onChange={handlePageChange}
        />
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Click to go to home page
        </Button>
      </div>
    </div>
  );
}

export default List;
