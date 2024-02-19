import {
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import LoadHelperText from "../components/LoadHelperText/loadhelpertext";
import Errors from "../components/Errors/errors";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";
import fareClassData from "../assets/data/fareClassData";
import IndianAirports from "../assets/data/IndianAirports";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import LuggageRoundedIcon from "@mui/icons-material/LuggageRounded";

const API_KEY = "nzGIduQ8tzs4hvReFI6EmkitUKJAEuhW";

export default function Flights() {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /* -------------------------------------------------------------------------- */
  /*                           UX IMPROVING FUNCTIONS                           */
  /* -------------------------------------------------------------------------- */

  /* --------------------- ADDS COMMA TO THE TICKET PRICE --------------------- */
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /* --------------------- OPENS BOOKING LINK IN NEW TAB ---------------------- */
  function openInNewTab(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  /* -------------------------------------------------------------------------- */
  /*                             USESTATE VARIABLES                             */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ FORM USESTATES ---------------------------- */
  const [buttonLoading, setButtonLoading] = useState(false);
  const [depParam, setDepParam] = useState(null);
  const [arrParam, setArrParam] = useState(null);
  const [params, setParams] = useState({
    date_from: "",
    date_to: "",
  });

  /* ------------------------- ERROR HANDLING USESTATE ------------------------ */
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ----------------------- DATA DISPLAY & API USESTATE ---------------------- */
  const [index, setIndex] = useState([]);

  const [airline, setAirline] = useState([]); // Airline of the flight
  const [flight, setFlight] = useState([]); // Flight number of the airplane

  const [departure, setDeparture] = useState([]); // Departure Location
  const [depTime, setDepTime] = useState([]); // Departure Time
  const [depDate, setDepDate] = useState([]); // Departure Date

  const [duration, setDuration] = useState([]); // Flight Duration
  const [qaulity, setQuality] = useState([]); // Quality Level of flight

  const [arrival, setArrival] = useState([]); // Arrival Location
  const [arrTime, setArrTime] = useState([]); // Arrival Time
  const [arrDate, setArrDate] = useState([]); // Arrival Date

  const [price, setPrice] = useState([]); // Cost of flight ticket
  const [fareClass, setFareClass] = useState([]); // Seat Category (Economy/Business/FirstClass)
  const [bookLink, setBookLink] = useState([]); // Booking link for the flight

  const [cabin, setCabin] = useState([]); // Weight of cabin baggage
  const [luggage, setLuggage] = useState([]); // Weight of check-in baggage

  /* -------------------------------------------------------------------------- */
  /*                              API FETCH RESULTS                             */
  /* -------------------------------------------------------------------------- */

  const fetchData = async (config) => {
    try {
      var response = await axios.request(config);
      var result = await response.data;
      var flight_data = result["data"];
      console.log(result);
      console.log(flight_data);
      var indexArray = [];
      for (let i = 0; i < flight_data.length; i++) {
        indexArray.push(i);
        console.log(indexArray);
      }
      setAirline(flight_data);
      setFlight(flight_data);
      setDeparture(flight_data);
      setArrival(flight_data);
      setPrice(flight_data);
      setDepTime(flight_data);
      setArrTime(flight_data);
      setDuration(flight_data);
      setIndex(indexArray);
      console.log(index);
      setDepDate(flight_data);
      setArrDate(flight_data);
      setBookLink(flight_data);
      setCabin(flight_data);
      setLuggage(flight_data);
      setQuality(flight_data);
      setFareClass(flight_data);
      setButtonLoading(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(true);
      setButtonLoading(false);
      setErrMsg(error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                          API SEARCH PARAM SETTERS                          */
  /* -------------------------------------------------------------------------- */

  /* ------------------ FOR SETTING 'date_from' AND 'date_to' ----------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(params);
  };

  /* ------------------------- FOR SETTING 'fly_from' ------------------------- */
  const handleDepChange = (e, v, r) => {
    if (r === "selectOption") {
      setDepParam(v);
    }
    console.log({ depParam }, { arrParam });
  };

  /* -------------------------- FOR SETTING 'fly_to' -------------------------- */
  const handleArrChange = (e, v, r) => {
    if (r === "selectOption") {
      setArrParam(v);
    }
    console.log({ depParam }, { arrParam });
  };

  /* ------------------------ FOR HANDLING FORM SUBMIT ------------------------ */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(params);
    setLoading(true);
    setButtonLoading(true);
    setErr(false);
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.tequila.kiwi.com/v2/search",
      headers: { apikey: API_KEY },
      params: {
        fly_from: depParam?.IATA,
        fly_to: arrParam?.IATA,
        date_from: params.date_from,
        date_to: params.date_to,
        curr: "INR",
        limit: 20,
        sort: "price",
        max_stopovers: 0,
      },
    };
    fetchData(config);
  };

  /* -------------------------------------------------------------------------- */
  /*                                UI RENDERING                                */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      <section id="search-flights" className="mt-8 flex justify-center">
        <div className="search-container w-full max-w-lg">
          {/* ------------------------------- SEARCH FORM ------------------------------ */}
          <form onSubmit={handleSubmit} className="text-center">
            <div className="mb-4">
              <div className="mb-4">
                <Autocomplete
                  options={IndianAirports}
                  groupBy={(option) => option.state}
                  getOptionLabel={(option) =>
                    `${option.location} (${option.IATA})` || ""
                  }
                  onChange={handleDepChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Departure"
                      className="rounded-lg border-2 border-blue-500 font-bold"
                    />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  options={IndianAirports}
                  groupBy={(option) => option.state}
                  getOptionLabel={(option) =>
                    `${option.location} (${option.IATA})` || ""
                  }
                  onChange={handleArrChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Arrival"
                      className="rounded-lg border-2 border-blue-500 font-bold"
                    />
                  )}
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    label="Search From Date"
                    onChange={(date) =>
                      handleChange({
                        target: {
                          value: date.format("DD/MM/YYYY"),
                          name: "date_from",
                        },
                      })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    label="Search To Date"
                    onChange={(date) =>
                      handleChange({
                        target: {
                          value: date.format("DD/MM/YYYY"),
                          name: "date_to",
                        },
                      })
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div>
              {buttonLoading ? (
                <button
                  disabled
                  className="submit-btnDis bg-gray-400 text-white py-2 px-4 rounded-full"
                  type="button"
                >
                  Searching...
                </button>
              ) : (
                <button
                  type="submit"
                  className="submit-btn bg-[#eb2168] hover:bg-[#d7004b] text-white py-2 px-4 rounded-full"
                >
                  Search Flights
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      {/* ---------------------------- RESULT CONTAINER ---------------------------- */}
      {err ? (
        <section className="loader-container">
          <div className="loader-wrapper">
            <h1 className="text-red-600 font-bold text-2xl">⛔️ ERROR</h1>
            <code className="err-code">{errMsg.message}</code> <br />
            <br />
            <code className="err-code bg-yellow-200">
              <a href="https://restfulapi.net/http-status-codes/">
                Error Code to message
              </a>
            </code>
            <Errors />
          </div>
        </section>
      ) : (
        <section className="result-container p-4 rounded-lg border border-gray-300 mt-5">
          {loading ? (
            <LoadHelperText />
          ) : (
            <div>
              <div className="mb-5">
                <h1 className="font-bold text-2xl">
                  {depParam?.location}&nbsp;
                  <CompareArrowsRoundedIcon />
                  &nbsp;{arrParam?.location}
                </h1>
                <p className="mt-1 text-sm">{`Showing (${airline.length}) results`}</p>
              </div>
              {index?.map((i) => {
                if (airline.length === 0) {
                  return (
                    <h1 key={i} className="text-red-600 font-bold">
                      No Flights found!
                    </h1>
                  );
                } else {
                  var plane = airline[i]["airlines"];
                  var air_logo = `https://pics.avs.io/200/80/${plane}.svg`;
                  var flightNo = flight[i]["route"][0]["flight_no"];

                  var dep_location = departure[i]["cityCodeFrom"];
                  var arr_location = arrival[i]["cityCodeTo"];

                  var loc_dep_time = new Date(depTime[i]["local_departure"]);
                  var dep_time = `${loc_dep_time.getUTCHours()}:${
                    (loc_dep_time.getUTCMinutes() < 10 ? "0" : "") +
                    loc_dep_time.getUTCMinutes()
                  }`;
                  var loc_arr_time = new Date(arrTime[i]["local_arrival"]);
                  var arr_time = `${loc_arr_time.getUTCHours()}:${
                    (loc_arr_time.getUTCMinutes() < 10 ? "0" : "") +
                    loc_arr_time.getUTCMinutes()
                  }`;

                  var dep_date = new Date(depDate[i]["local_departure"]);
                  dep_date = `${dep_date.getUTCDate()}/${
                    dep_date.getUTCMonth() + 1
                  }/${dep_date.getUTCFullYear()}`;
                  var arr_date = new Date(arrDate[i]["local_arrival"]);
                  arr_date = `${arr_date.getUTCDate()}/${
                    arr_date.getUTCMonth() + 1
                  }/${arr_date.getUTCFullYear()}`;

                  var flight_duration = duration[i]["duration"]["total"];
                  var flight_quality = Math.trunc(qaulity[i]["quality"]);
                  var flight_class = fareClass[i]["route"][0]["fare_category"];
                  flight_class = fareClassData[flight_class];

                  var cost = price[i]["conversion"]["INR"];
                  var booking = bookLink[i]["deep_link"];

                  var cabin_luggage = cabin[i]["baglimit"]["hand_weight"];
                  var check_in_luggae = luggage[i]["baglimit"]["hold_weight"];

                  return (
                    <div key={i} className=" border-gray-300 rounded-lg overflow-hidden mb-2 border-2">
                    <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleAccordionChange(`panel${i}`)}>
                      <AccordionSummary
                        expandIcon={<FlightTakeoffRoundedIcon />}
                        aria-controls={`panel${i}bh-content`}
                        id={`panel${i}bh-header`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-4 ">
                            <div className="w-16 h-16">
                              <img
                                src={air_logo}
                                alt="airline logo"
                                className="logo-contain mt-5"
                              />
                            </div>
                            <div className="text-center md:text-left">
                              <Typography>
                                {dep_time} - {arr_time}
                              </Typography>
                              <Typography>
                                {dep_location} <CompareArrowsRoundedIcon />{" "}
                                {arr_location}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex-grow text-center">
                            <Typography variant="h6" className="font-bold">
                              ₹ {numberWithCommas(cost)}
                            </Typography>
                          </div>
                          <div className="flex items-center space-x-6 m-4">
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#eb2168",
                                "&:hover": { backgroundColor: "#d7004b" },
                              }}
                              disableElevation
                              onClick={() => {
                                openInNewTab(booking);
                              }}
                              className="w-24"
                            >
                              Book
                            </Button>
                          </div>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div>
      <Typography>
        <FlightTakeoffRoundedIcon /> Flight No: {flightNo}
      </Typography>
      <Typography>
        <AccessTimeRoundedIcon /> Departure Date: {dep_date}
      </Typography>
      <Typography>
        <FlightLandRoundedIcon /> Arrival Date: {arr_date}
      </Typography>
    </div>
    <div>
      <Typography>
        <TimerRoundedIcon /> Flight Duration: {flight_duration} minutes
      </Typography>
      <Typography>
        <AirplanemodeActiveIcon /> Flight Quality: {flight_quality}
      </Typography>
      <Typography>
        <WorkIcon /> Flight Class: {flight_class}
      </Typography>
    </div>
    <div>
      <Typography>
        <BusinessCenterRoundedIcon /> Cabin Luggage: {cabin_luggage} Kg
      </Typography>
      <Typography>
        <LuggageRoundedIcon /> Check-in Luggage: {check_in_luggae} Kg
      </Typography>
    </div>
  </div>
</AccordionDetails>

                    </Accordion>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </section>
      )}
    </>
  );
}
