import React from "react";
import video from "../../assets/video.mp4";
import "./home.css";
import { Public, FormatListBulleted, Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

function Home() {
  const navigate = useNavigate();

  const P = styled('p')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 box">
          <video controls width="100%" autoPlay>
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <div className="col-6 box">
          <P style={{ fontWeight: 'bold'}}>Select view type</P>
          <div className="row">
            <div className="col-6">
              <IconButton onClick={() => navigate("/map")}>
                <Public color="success" sx={{ fontSize: 80 }} />
              </IconButton>
              <p style={{ fontWeight: 'bold'}}>MAP</p>
            </div>
            <div className="col-6">
              <IconButton onClick={() => navigate("/list")}>
                <FormatListBulleted color="primary" sx={{ fontSize: 80 }} />
              </IconButton>
              <p style={{ fontWeight: 'bold'}}>LIST</p>
            </div>
            <div class="alert alert-warning" role="alert">
              <Info />
              {
                "For the data used in this project, the database prepared by Orhan Aydoğdu, in which the data of the Kandilli Observatory was used, was used. Cannot be used for commercial purposes."
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
