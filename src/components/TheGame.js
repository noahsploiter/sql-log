import { useState, useEffect, useRef } from "react";
import "../resources/css/the_game.css";
import videoBg from "../resources/img/transparent_vd.mp4";
import Carousel from "react-bootstrap/Carousel";

const arrow_img = require("../resources/img/arrow.png");
const site_logo = require("../resources/img/site_logo.png");

var initial_position = "0.00";

var openStatus = "closed";
const onePart = 360 / 37;

var one_twenty_array = [];

const TheGame = () => {
  const spinRef = useRef(null);
  const audioRef = useRef(null);

  const base_url = "http://localhost:3000/";
  // const base_url = "https://yordiback2.goldengames35.com/";
  const [blankCenterNumber, setBlankCenterNumber] = useState(true);

  const [rotateTransform, setRotateTransform] = useState("none");
  const [rotateTransition, setRotateTransition] = useState("none");
  const [initialPosition, setInitialPosition] = useState("0.00");
  const [initialSectorLevel, setInitialSectorLevel] = useState(0);
  const [centerNumber, setCenterNumber] = useState("");
  const [centerBigNumber, setCenterBigNumber] = useState(false);
  const [centerColor, setCenterColor] = useState("black");
  const [timeRemaining, setTimeRemaining] = useState("BET IS CLOSED");
  const [currentGameLength, setCurrentGameLength] = useState(30000);
  const [currentGameId, setCurrentGameId] = useState("NONE");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [oneTwentyArray, setOneTwentyArray] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [oneTwentyColors, setOneTwentyColors] = useState([]);
  const [oneTwentyEvenOdd, setOneTwentyEvenOdd] = useState([]);
  const [oneTwentyTwins, setOneTwentyTwins] = useState([]);
  const [oneTwentySectors, setOneTwentySectors] = useState([]);
  const [oneTwentyMirrors, setOneTwentyMirrors] = useState([]);
  const [oneTwentyHighLow, setOneTwentyHighLow] = useState([]);
  const [oneTwentyHighLowColor, setOneTwentyHighLowColor] = useState([]);
  const [oneTwentyHotColdNums, setOneTwentyHotColdNums] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [lastTenNumbers, setLastTenNumbers] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  //var db_random_number = 1;
  //var db_winner_number = 1;
  const roundNumber = (numb) => {
    var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
    return rounded;
  };
  //----------------------------------------------------new functions from backend------------------------------------------------------
  //----------------------------------------------------new functions from backend------------------------------------------------------
  //----------------------------------------------------new functions from backend------------------------------------------------------
  //----------------------------------------------------new functions from backend------------------------------------------------------
  const spin_numbers2 = {
    0: { index: 0, level: 0, deg: "0.00", color: "green", sector: "none" },
    1: {
      index: 1,
      level: 14,
      deg: roundNumber(onePart * 14).toString(),
      color: "red",
      sector: "D",
    },
    2: {
      index: 2,
      level: 31,
      deg: roundNumber(onePart * 31).toString(),
      color: "black",
      sector: "A",
    },
    3: {
      index: 3,
      level: 2,
      deg: roundNumber(onePart * 2).toString(),
      color: "red",
      sector: "F",
    },
    4: {
      index: 4,
      level: 33,
      deg: roundNumber(onePart * 33).toString(),
      color: "black",
      sector: "A",
    },
    5: {
      index: 5,
      level: 18,
      deg: roundNumber(onePart * 18).toString(),
      color: "red",
      sector: "D",
    },
    6: {
      index: 6,
      level: 27,
      deg: roundNumber(onePart * 27).toString(),
      color: "black",
      sector: "B",
    },
    7: {
      index: 7,
      level: 6,
      deg: roundNumber(onePart * 6).toString(),
      color: "red",
      sector: "F",
    },
    8: {
      index: 8,
      level: 21,
      deg: roundNumber(onePart * 21).toString(),
      color: "black",
      sector: "C",
    },
    9: {
      index: 9,
      level: 10,
      deg: roundNumber(onePart * 10).toString(),
      color: "red",
      sector: "E",
    },
    10: {
      index: 10,
      level: 19,
      deg: roundNumber(onePart * 19).toString(),
      color: "black",
      sector: "C",
    },
    11: {
      index: 11,
      level: 23,
      deg: roundNumber(onePart * 23).toString(),
      color: "black",
      sector: "C",
    },
    12: {
      index: 12,
      level: 4,
      deg: roundNumber(onePart * 4).toString(),
      color: "red",
      sector: "F",
    },
    13: {
      index: 13,
      level: 25,
      deg: roundNumber(onePart * 25).toString(),
      color: "black",
      sector: "B",
    },
    14: {
      index: 14,
      level: 12,
      deg: roundNumber(onePart * 12).toString(),
      color: "red",
      sector: "E",
    },
    15: {
      index: 15,
      level: 35,
      deg: roundNumber(onePart * 35).toString(),
      color: "black",
      sector: "A",
    },
    16: {
      index: 16,
      level: 16,
      deg: roundNumber(onePart * 16).toString(),
      color: "red",
      sector: "D",
    },
    17: {
      index: 17,
      level: 29,
      deg: roundNumber(onePart * 29).toString(),
      color: "black",
      sector: "B",
    },
    18: {
      index: 18,
      level: 8,
      deg: roundNumber(onePart * 8).toString(),
      color: "red",
      sector: "E",
    },
    19: {
      index: 19,
      level: 34,
      deg: roundNumber(onePart * 34).toString(),
      color: "red",
      sector: "A",
    },
    20: {
      index: 20,
      level: 13,
      deg: roundNumber(onePart * 13).toString(),
      color: "black",
      sector: "D",
    },
    21: {
      index: 21,
      level: 32,
      deg: roundNumber(onePart * 32).toString(),
      color: "red",
      sector: "A",
    },
    22: {
      index: 22,
      level: 9,
      deg: roundNumber(onePart * 9).toString(),
      color: "black",
      sector: "E",
    },
    23: {
      index: 23,
      level: 20,
      deg: roundNumber(onePart * 20).toString(),
      color: "red",
      sector: "C",
    },
    24: {
      index: 24,
      level: 17,
      deg: roundNumber(onePart * 17).toString(),
      color: "black",
      sector: "D",
    },
    25: {
      index: 25,
      level: 30,
      deg: roundNumber(onePart * 30).toString(),
      color: "red",
      sector: "B",
    },
    26: {
      index: 26,
      level: 1,
      deg: roundNumber(onePart * 1).toString(),
      color: "black",
      sector: "F",
    },
    27: {
      index: 27,
      level: 26,
      deg: roundNumber(onePart * 26).toString(),
      color: "red",
      sector: "B",
    },
    28: {
      index: 28,
      level: 5,
      deg: roundNumber(onePart * 5).toString(),
      color: "black",
      sector: "F",
    },
    29: {
      index: 29,
      level: 7,
      deg: roundNumber(onePart * 7).toString(),
      color: "black",
      sector: "E",
    },
    30: {
      index: 30,
      level: 22,
      deg: roundNumber(onePart * 22).toString(),
      color: "red",
      sector: "C",
    },
    31: {
      index: 31,
      level: 11,
      deg: roundNumber(onePart * 11).toString(),
      color: "black",
      sector: "E",
    },
    32: {
      index: 32,
      level: 36,
      deg: roundNumber(onePart * 36).toString(),
      color: "red",
      sector: "A",
    },
    33: {
      index: 33,
      level: 15,
      deg: roundNumber(onePart * 15).toString(),
      color: "black",
      sector: "D",
    },
    34: {
      index: 34,
      level: 28,
      deg: roundNumber(onePart * 28).toString(),
      color: "red",
      sector: "B",
    },
    35: {
      index: 35,
      level: 3,
      deg: roundNumber(onePart * 3).toString(),
      color: "black",
      sector: "F",
    },
    36: {
      index: 36,
      level: 24,
      deg: roundNumber(onePart * 24).toString(),
      color: "red",
      sector: "C",
    },
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //-----------------------------------------------------end of new functions from backend-----------------------------------------------
  //-----------------------------------------------------end of new functions from backend-----------------------------------------------
  //-----------------------------------------------------end of new functions from backend-----------------------------------------------
  //-----------------------------------------------------end of new functions from backend-----------------------------------------------

  const onTransitionEnd = () => {
    setRotateTransform(`rotate(${initialPosition}deg)`);
    setRotateTransition("none");
    setCenterBigNumber(true);
    fetch_one_twenty_rows();
    last_ten_rows();
    one_twenty_hot_cold();

    play();
  };

  const spin_numbers = {
    0: { index: 0, level: 0, deg: "0.00", color: "green" },
    1: {
      index: 26,
      level: 1,
      deg: roundNumber(onePart * 1).toString(),
      color: "black",
      sector: "F",
    },
    2: {
      index: 3,
      level: 2,
      deg: roundNumber(onePart * 2).toString(),
      color: "red",
      sector: "F",
    },
    3: {
      index: 35,
      level: 3,
      deg: roundNumber(onePart * 3).toString(),
      color: "black",
      sector: "F",
    },
    4: {
      index: 12,
      level: 4,
      deg: roundNumber(onePart * 4).toString(),
      color: "red",
      sector: "F",
    },
    5: {
      index: 28,
      level: 5,
      deg: roundNumber(onePart * 5).toString(),
      color: "black",
      sector: "F",
    },
    6: {
      index: 7,
      level: 6,
      deg: roundNumber(onePart * 6).toString(),
      color: "red",
      sector: "F",
    },
    7: {
      index: 29,
      level: 7,
      deg: roundNumber(onePart * 7).toString(),
      color: "black",
      sector: "E",
    },
    8: {
      index: 18,
      level: 8,
      deg: roundNumber(onePart * 8).toString(),
      color: "red",
      sector: "E",
    },
    9: {
      index: 22,
      level: 9,
      deg: roundNumber(onePart * 9).toString(),
      color: "black",
      sector: "E",
    },
    10: {
      index: 9,
      level: 10,
      deg: roundNumber(onePart * 10).toString(),
      color: "red",
      sector: "E",
    },
    11: {
      index: 31,
      level: 11,
      deg: roundNumber(onePart * 11).toString(),
      color: "black",
      sector: "E",
    },
    12: {
      index: 14,
      level: 12,
      deg: roundNumber(onePart * 12).toString(),
      color: "red",
      sector: "E",
    },
    13: {
      index: 20,
      level: 13,
      deg: roundNumber(onePart * 13).toString(),
      color: "black",
      sector: "D",
    },
    14: {
      index: 1,
      level: 14,
      deg: roundNumber(onePart * 14).toString(),
      color: "red",
      sector: "D",
    },
    15: {
      index: 33,
      level: 15,
      deg: roundNumber(onePart * 15).toString(),
      color: "black",
      sector: "D",
    },
    16: {
      index: 16,
      level: 16,
      deg: roundNumber(onePart * 16).toString(),
      color: "red",
      sector: "D",
    },
    17: {
      index: 24,
      level: 17,
      deg: roundNumber(onePart * 17).toString(),
      color: "black",
      sector: "D",
    },
    18: {
      index: 5,
      level: 18,
      deg: roundNumber(onePart * 18).toString(),
      color: "red",
      sector: "D",
    },
    19: {
      index: 10,
      level: 19,
      deg: roundNumber(onePart * 19).toString(),
      color: "black",
      sector: "C",
    },
    20: {
      index: 23,
      level: 20,
      deg: roundNumber(onePart * 20).toString(),
      color: "red",
      sector: "C",
    },
    21: {
      index: 8,
      level: 21,
      deg: roundNumber(onePart * 21).toString(),
      color: "black",
      sector: "C",
    },
    22: {
      index: 30,
      level: 22,
      deg: roundNumber(onePart * 22).toString(),
      color: "red",
      sector: "C",
    },
    23: {
      index: 11,
      level: 23,
      deg: roundNumber(onePart * 23).toString(),
      color: "black",
      sector: "C",
    },
    24: {
      index: 36,
      level: 24,
      deg: roundNumber(onePart * 24).toString(),
      color: "red",
      sector: "C",
    },
    25: {
      index: 13,
      level: 25,
      deg: roundNumber(onePart * 25).toString(),
      color: "black",
      sector: "B",
    },
    26: {
      index: 27,
      level: 26,
      deg: roundNumber(onePart * 26).toString(),
      color: "red",
      sector: "B",
    },
    27: {
      index: 6,
      level: 27,
      deg: roundNumber(onePart * 27).toString(),
      color: "black",
      sector: "B",
    },
    28: {
      index: 34,
      level: 28,
      deg: roundNumber(onePart * 28).toString(),
      color: "red",
      sector: "B",
    },
    29: {
      index: 17,
      level: 29,
      deg: roundNumber(onePart * 29).toString(),
      color: "black",
      sector: "B",
    },
    30: {
      index: 25,
      level: 30,
      deg: roundNumber(onePart * 30).toString(),
      color: "red",
      sector: "B",
    },
    31: {
      index: 2,
      level: 31,
      deg: roundNumber(onePart * 31).toString(),
      color: "black",
      sector: "A",
    },
    32: {
      index: 21,
      level: 32,
      deg: roundNumber(onePart * 32).toString(),
      color: "red",
      sector: "A",
    },
    33: {
      index: 4,
      level: 33,
      deg: roundNumber(onePart * 33).toString(),
      color: "black",
      sector: "A",
    },
    34: {
      index: 19,
      level: 34,
      deg: roundNumber(onePart * 34).toString(),
      color: "red",
      sector: "A",
    },
    35: {
      index: 15,
      level: 35,
      deg: roundNumber(onePart * 35).toString(),
      color: "black",
      sector: "A",
    },
    36: {
      index: 32,
      level: 36,
      deg: roundNumber(onePart * 36).toString(),
      color: "red",
      sector: "A",
    },
  };

  function get_current_game_length() {
    const url = `${base_url}getgamelength`;
    const res = fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            //  console.log(json);
            setCurrentGameLength(json.game_length);
            //  setFetchedData(json);
          });
        } else {
          // console.log("not fetched");
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        //     console.log("not fetched 2");
      });
  }

  const startSpin = (winner_number, random_number) => {
    setBlankCenterNumber(false);
    setRotateTransform(`rotate(${roundNumber(random_number * onePart)}deg)`);

    setRotateTransition("transform 30s ease 0s");

    const originalLevel = Math.round(
      (random_number * onePart - 3960) / onePart
    );
    // console.log(originalLevel);
    // console.log(spin_numbers[originalLevel].index);
    setInitialPosition(spin_numbers[originalLevel].deg);
    //initial_position = spin_numbers[originalLevel].deg;
    setInitialSectorLevel(spin_numbers[originalLevel].level);
    setCurrentNumber(winner_number);
    //fetch_data_first();
    //console.log("in startSpin " + winner_number);
    //update_winner_and_tickets(winner_number, random_number, game_id);
  };

  //    const startSpin = () => {

  //     const url_winner_number = `${base_url}all_tables/users/getwinnernumber`;

  //       const res = fetch(url_winner_number)
  //       .then(response => {
  //         if (response.ok) {
  //           response.json().then(json => {
  // //console.log(json);

  // setRotateTransform(`rotate(${roundNumber((json[0].random_number*onePart))}deg)`);

  //  setRotateTransition("transform 30s ease 0s");

  //  const originalLevel = Math.round(((json[0].random_number*onePart) - 3960)/onePart);
  // // console.log(originalLevel);
  // // console.log(spin_numbers[originalLevel].index);
  // setInitialPosition(spin_numbers[originalLevel].deg);
  // //initial_position = spin_numbers[originalLevel].deg;
  // setInitialSectorLevel(spin_numbers[originalLevel].level);
  // setCurrentNumber(json[0].winner_number);
  // fetch_data_first();

  // });

  // } else {
  //  // console.log("not fetched");
  //  //startSpin();

  // }
  // }).catch((err) => {
  // // console.log("AXIOS ERROR: ", err);
  //  //     console.log("not fetched 2");
  //  // startSpin();

  // });

  // }

  function getRotationAngle(target) {
    const obj = window.getComputedStyle(target, null);
    const matrix =
      obj.getPropertyValue("-webkit-transform") ||
      obj.getPropertyValue("-moz-transform") ||
      obj.getPropertyValue("-ms-transform") ||
      obj.getPropertyValue("-o-transform") ||
      obj.getPropertyValue("transform");

    let angle = 0;

    if (matrix !== "none") {
      const values = matrix.split("(")[1].split(")")[0].split(",");
      const a = values[0];
      const b = values[1];
      angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    return angle < 0 ? (angle += 360) : angle;
  }

  //the timer to first load

  //end of the timer to first load
  function fetch_data_intro() {
    //----------------------------fetching open status and time remaining---------------------------
    // const url_open_status = `${base_url}all_tables/users/getopenstatus`;
    const url_open_status = `${base_url}getopenstatus`;

    const res = fetch(url_open_status)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            // console.log(json);
            if (json.open_status == "closed") {
              setTimeRemaining("BET IS CLOSED");
              // start spinner
              setCenterBigNumber(false);

              //end of start spinner
              openStatus = "closed";

              //  console.log("to fetch data intro");
              fetch_data_intro();
            } else {
              //means open

              setTimeRemaining(json.time_remaining);
              //openStatus = "open";
              setCenterBigNumber(false);
              // console.log("to fetch data first");
              fetch_data_first();
            }

            // console.log("fetched");
          });
        } else {
          // console.log("not fetched");
          fetch_data_intro();
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        //     console.log("not fetched 2");
        fetch_data_intro();
      });
    //---------------------------end of fetching open status and time remaining---------------------
  }

  //the timer to fetch data one
  function fetch_data_first() {
    //----------------------------fetching open status and time remaining---------------------------
    // const url_open_status = `${base_url}all_tables/users/getopenstatus`;
    const url_open_status = `${base_url}getopenstatus`;

    const res = fetch(url_open_status)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
            if (json.open_status == "closed") {
              setTimeRemaining("BET IS CLOSED");
              // start spinner
              if (openStatus != "closed") {
                console.log("closed changed");
                //setCurrentNumber(json.winner_number);
                openStatus = "closed";
                startSpin(json.winner_number, json.random_number);
                //  fetch_data_first();
              } else {
                openStatus = "closed";
                // fetch_data_first();
              }

              fetch_data_first();

              //end of start spinner
            } else {
              //means it is open
              setTimeRemaining(json.time_remaining);
              if (openStatus == "closed") {
                console.log("open changed");
                get_current_game_length();
                // db_random_number = json.random_number;
                // db_winner_number = json.winner_number;
                openStatus = "open";
                setCurrentGameId(json.current_game_id);

                setCenterBigNumber(false);
              }
              // setCenterBigNumber(false);

              openStatus = "open";
              setCenterBigNumber(false);
              fetch_data_first();
            }
            //console.log("to fetch data second");

            // console.log("fetched");
          });
        } else {
          // console.log("not fetched");
          console.log("error 1");
          fetch_data_first();
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        //     console.log("not fetched 2");
        console.log("error 2");
        fetch_data_first();
      });
    //---------------------------end of fetching open status and time remaining---------------------
  }

  function seconds_to_clock(duration) {
    if (duration < 0) {
      duration = 0;
    }
    var time = duration / 1000;
    // var hours = Math.floor(time / 3600);
    // time -= hours * 3600;

    var minutes = Math.floor(time / 60);
    time -= minutes * 60;

    var seconds = parseInt(time % 60, 10);

    //console.log(hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  }

  function play() {
    // try{
    // var audio = document.getElementById("audio");
    var audio = audioRef.current;
    audio.play();
    //  }
    //  catch(err){
    //    console.log("audio play error");
    //  }
  }

  // spinRef.current.addEventListener("transitionend", function(e){
  //   onTransitionEnd();
  // });

  function last_ten_rows() {
    const last_ten = [];
    const url_one_twenty = `${base_url}all_tables/users/lasttenrows`;

    const res = fetch(url_one_twenty)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            // console.log(json);
            if (json.length >= 10) {
              for (var j = 0; j < json.length; j++) {
                last_ten.push(json[j].winner_number);
              }
            } else {
              for (var j = 0; j < 10; j++) {
                last_ten.push(0);
              }
            }

            setLastTenNumbers(last_ten);
            //  console.log(last_ten);
            // console.log(one_twenty_array);
            //console.log('fetched');
          });
        } else {
          console.log("not fetched");
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        console.log("not fetched 2");
      });
  }
  function fetch_one_twenty_rows() {
    //var one_twenty_arr = [];
    const url_one_twenty = `${base_url}all_tables/users/onetwentyrows`;

    const res = fetch(url_one_twenty)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            one_twenty_array = [];
            //  console.log(json);
            for (var i = 0; i < 37; i++) {
              var count = 0;
              var count_amount = 0;
              for (var j = 0; j < json.length; j++) {
                if (json[j].winner_number * 1 == i) {
                  one_twenty_array.push(json[j].count_amount);

                  count = 1;
                }
              }

              if (count == 0) {
                one_twenty_array.push(0);
              }
            }
            // console.log(one_twenty_arr);
            //console.log('fetched');
            // return one_twenty_arr;
            //console.log(get_colors(one_twenty_array));
            // console.log(one_twenty_array);

            setOneTwentyArray(one_twenty_array);
            get_colors(one_twenty_array);
            get_one_twenty_even_odd(one_twenty_array);
            get_one_twenty_twins(one_twenty_array);
            get_one_twenty_sectors(one_twenty_array);
            get_one_twenty_mirrors(one_twenty_array);
            one_twenty_high_low(one_twenty_array);
            one_twenty_high_low_color(one_twenty_array);
          });
        } else {
          //return one_twenty_arr;
          console.log("not fetched");
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        //return one_twenty_arr;
        console.log("not fetched 2");
      });
    //---------------------------end of fetching open status and time remaining---------------------
  }

  //--------------------------------get colors--------------------------------------------
  function get_colors(one_twenty_array) {
    var one_twenty_colors = [];
    var red = 0;
    var black = 0;
    var green = 0;
    for (let i = 0; i < 37; i++) {
      if (spin_numbers2[i].color == "red") {
        red += one_twenty_array[i];
      } else if (spin_numbers2[i].color == "black") {
        black += one_twenty_array[i];
      } else if (spin_numbers2[i].color == "green") {
        green += one_twenty_array[i];
      }
    }

    one_twenty_colors.push(red);
    one_twenty_colors.push(black);
    one_twenty_colors.push(green);
    setOneTwentyColors(one_twenty_colors);
    return one_twenty_colors;
  }
  //------------------------------end of get colors--------------------------------------
  //----------------------------get even odd--------------------------------------------
  function get_one_twenty_even_odd(one_twenty_array) {
    var even_odd = [];
    var even_num = 0;
    var odd_num = 0;

    for (var i = 1; i < 37; i++) {
      if (i % 2 == 0) {
        even_num += one_twenty_array[i];
      } else {
        odd_num += one_twenty_array[i];
      }
    }

    even_odd.push(even_num);
    even_odd.push(odd_num);
    setOneTwentyEvenOdd(even_odd);
    return even_odd;
  }
  //-----------------------------end of get even odd---------------------------------------
  //----------------------------get one twenty twins---------------------------------------
  function get_one_twenty_twins(one_twenty_array) {
    var twins = [];
    var twins_count = 0;
    for (var i = 0; i < 37; i++) {
      if (i == 11 || i == 22 || i == 33) {
        twins_count += one_twenty_array[i];
      }
    }
    twins.push(twins_count);
    setOneTwentyTwins(twins);
    return twins;
  }
  //--------------------------end of get one twenty twins--------------------------------------
  //---------------------------get one twenty sectors count------------------------------------
  function get_one_twenty_sectors(one_twenty_array) {
    var one_twenty_sectors = [];
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    for (var i = 0; i < 37; i++) {
      if (spin_numbers2[i].sector == "A") {
        a += one_twenty_array[i];
      } else if (spin_numbers2[i].sector == "B") {
        b += one_twenty_array[i];
      } else if (spin_numbers2[i].sector == "C") {
        c += one_twenty_array[i];
      } else if (spin_numbers2[i].sector == "D") {
        d += one_twenty_array[i];
      } else if (spin_numbers2[i].sector == "E") {
        e += one_twenty_array[i];
      } else if (spin_numbers2[i].sector == "F") {
        f += one_twenty_array[i];
      }
    }

    one_twenty_sectors.push(a);
    one_twenty_sectors.push(b);
    one_twenty_sectors.push(c);
    one_twenty_sectors.push(d);
    one_twenty_sectors.push(e);
    one_twenty_sectors.push(f);
    setOneTwentySectors(one_twenty_sectors);
    return one_twenty_sectors;
  }

  //------------------------------end of one twenty sectors-----------------------------------
  //--------------------------------get one twenty mirror----------------------------------------
  function get_one_twenty_mirrors(one_twenty_array) {
    var one_twenty_mirrors = [];
    var one_two = 0;
    var one_three = 0;
    var two_three = 0;
    for (var i = 0; i < 37; i++) {
      if (i == 12 || i == 21) {
        one_two += one_twenty_array[i];
      } else if (i == 13 || i == 31) {
        one_three += one_twenty_array[i];
      } else if (i == 23 || i == 32) {
        two_three += one_twenty_array[i];
      }
    }

    one_twenty_mirrors.push(one_two);
    one_twenty_mirrors.push(one_three);
    one_twenty_mirrors.push(two_three);
    setOneTwentyMirrors(one_twenty_mirrors);
    return one_twenty_mirrors;
  }
  //---------------------------end of get one twenty mirror ---------------------------------------
  //-------------------------------one twenty high low--------------------------------------------
  function one_twenty_high_low(one_twenty_array) {
    var high_low = [];
    var high_num = 0;
    var low_num = 0;

    for (var i = 1; i < 37; i++) {
      if (i > 18) {
        high_num += one_twenty_array[i];
      } else {
        low_num += one_twenty_array[i];
      }
    }

    high_low.push(high_num);
    high_low.push(low_num);
    setOneTwentyHighLow(high_low);
    return high_low;
  }
  //----------------------------------end of twenty high low--------------------------------------
  //---------------------------------one twenty high low color-------------------------------------
  function one_twenty_high_low_color(one_twenty_array) {
    var high_low_color = [];
    var high_num_red = 0;
    var high_num_black = 0;
    var low_num_red = 0;
    var low_num_black = 0;

    for (var i = 1; i < 37; i++) {
      if (i > 18) {
        if (spin_numbers2[i].color == "red") {
          high_num_red += one_twenty_array[i];
        } else {
          high_num_black += one_twenty_array[i];
        }
      } else {
        if (spin_numbers2[i].color == "red") {
          low_num_red += one_twenty_array[i];
        } else {
          low_num_black += one_twenty_array[i];
        }
      }
    }

    high_low_color.push(high_num_red);
    high_low_color.push(low_num_red);
    high_low_color.push(high_num_black);
    high_low_color.push(low_num_black);

    setOneTwentyHighLowColor(high_low_color);
    return high_low_color;
  }
  //---------------------------------end of one twenty high low color----------------------------------
  //----------------------------------hot cold --------------------------------------------------------
  function one_twenty_hot_cold() {
    var hot_cold_nums = [];
    var sorted_array = [];
    var hot_nums = [];
    var cold_nums = [];

    const url_one_twenty = `${base_url}all_tables/users/hotcold`;

    const res = fetch(url_one_twenty)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            // console.log(json);

            for (var i = 0; i < 37; i++) {
              var count = 0;

              for (var j = 0; j < json.length; j++) {
                if (i == json[j].winner_number) {
                  count = 1;
                }
              }

              if (count == 0) {
                sorted_array.push(i);
              }
            }

            for (var j = 0; j < json.length; j++) {
              sorted_array.push(json[j].winner_number);
            }

            for (var x = 0; x < sorted_array.length; x++) {
              if (x < 6) {
                cold_nums.push(sorted_array[x]);
              }
              if (x > 30) {
                hot_nums.push(sorted_array[x]);
              }
            }

            hot_cold_nums.push(hot_nums);
            hot_cold_nums.push(cold_nums);

            // setOneTwentyHotColdNums(hot_cold_nums);
            setOneTwentyHotColdNums(sorted_array);
            // console.log(one_twenty_array);
            //console.log('fetched');
          });
        } else {
          console.log("not fetched");
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        console.log("not fetched 2");
      });
  }
  //-----------------------------------end of hot cold---------------------------------------------------

  // function start_up() {
  //   fetch_one_twenty_rows();
  //   last_ten_rows();
  //   one_twenty_hot_cold();
  //   fetch_data_intro();
  //   const centerInterval = setInterval(function() {

  //     var current_degree = getRotationAngle(document.getElementById('dv_spin'));

  //       if(current_degree >= (360 - (onePart/2)) || current_degree <= (onePart/2)){
  //         setCenterNumber("0");
  //         setCenterColor("green");

  //       }

  //       else{
  //         for(var i = 1; i < 37; i++){

  //           if((parseFloat(spin_numbers[i].deg) - (onePart/2)) <= current_degree && (parseFloat(spin_numbers[i].deg) + (onePart/2)) >= current_degree)
  //         {
  //           setCenterNumber(spin_numbers[i].index);
  //           setCenterColor(spin_numbers[i].color);

  //         }

  //       }
  //       }

  //   }, 40);
  // }

  //start_up();

  useEffect(() => {
    console.log("use effect effected");

    fetch_one_twenty_rows();
    last_ten_rows();
    one_twenty_hot_cold();

    fetch_data_intro();

    const centerInterval = setInterval(function () {
      var current_degree = getRotationAngle(document.getElementById("dv_spin"));

      if (
        current_degree >= 360 - onePart / 2 ||
        current_degree <= onePart / 2
      ) {
        setCenterNumber("0");
        setCenterColor("green");
      } else {
        for (var i = 1; i < 37; i++) {
          if (
            parseFloat(spin_numbers[i].deg) - onePart / 2 <= current_degree &&
            parseFloat(spin_numbers[i].deg) + onePart / 2 >= current_degree
          ) {
            setCenterNumber(spin_numbers[i].index);
            setCenterColor(spin_numbers[i].color);
          }
        }
      }
    }, 40);
  }, []);

  return (
    <div className="dv_main_container">
      <div className="dv_internal_container">
        <div className="dv_spinner_logo" style={{ marginRight: "100px" }}>
          {/* <img src={site_logo} className = "img_site_logo" style = {{marginLeft: "20px", width: "200px"}} /> */}

          <div className="dv_last_ten" style={{}}>
            {/* <div style = {{marginLeft: "20px", textAlign: "center", fontSize: "18px", marginTop: "10px", marginBottom: "20px"}}>Last Ten Draws</div> */}
            <header>
              <div
                className="header__center"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                LAST TEN DRAWS
              </div>
            </header>
            {/* {spin_numbers2[lastTenNumbers[0]].color} */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <table className="tbl_last_ten" style={{ width: "100px" }}>
                <tbody>
                  <tr>
                    {spin_numbers2[lastTenNumbers[0]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[0]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[0]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[0]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[0]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[0]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                  <tr>
                    {spin_numbers2[lastTenNumbers[1]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[1]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[1]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[1]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[1]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[1]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                  <tr>
                    {spin_numbers2[lastTenNumbers[2]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[2]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[2]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[2]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[2]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[2]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                  <tr>
                    {spin_numbers2[lastTenNumbers[3]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[3]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[3]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[3]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[3]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[3]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>

                  <tr>
                    {spin_numbers2[lastTenNumbers[4]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[4]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[4]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[4]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[4]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[4]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                  <tr>
                    {spin_numbers2[lastTenNumbers[5]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[5]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[5]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[5]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[5]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[5]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>

                  <tr>
                    {spin_numbers2[lastTenNumbers[6]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[6]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[6]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[6]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[6]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[6]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                  <tr>
                    {spin_numbers2[lastTenNumbers[7]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[7]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[7]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[7]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[7]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[7]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>

                  <tr>
                    {spin_numbers2[lastTenNumbers[8]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[8]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[8]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[8]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[8]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[8]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>

                  <tr>
                    {spin_numbers2[lastTenNumbers[9]].color == "green" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "green" }}
                      >
                        {lastTenNumbers[9]}
                      </td>
                    ) : spin_numbers2[lastTenNumbers[9]].color == "red" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "red" }}
                      >
                        {lastTenNumbers[9]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    {spin_numbers2[lastTenNumbers[9]].color == "black" ? (
                      <td
                        className="last_ten_has_num"
                        style={{ color: "#fff", backgroundColor: "black" }}
                      >
                        {lastTenNumbers[9]}
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="dv_spinner_wheel">
          <div className="dv_spinner_and_progress">
            <div className="dv_spinner_big_container">
              <div className="dv_spin_container">
                <div className="dv_spin_arrow">
                  <img src={arrow_img} />
                </div>
                <div
                  className="dv_spin"
                  id="dv_spin"
                  ref={spinRef}
                  onTransitionEnd={onTransitionEnd}
                  style={{
                    transform: rotateTransform,
                    transition: rotateTransition,
                  }}
                ></div>
                <div className="dv_spin_center"></div>
                {blankCenterNumber ? (
                  <div
                    className="dv_spin_number"
                    style={{ background: "black" }}
                  ></div>
                ) : (
                  <div
                    //  className = "dv_spin_number"
                    //   className = {centerBigNumber ? "dv_spin_number" : "dv_spin_number"}
                    className={`${
                      centerBigNumber ? "dv_spin_number_big" : "dv_spin_number"
                    }`}
                    //   className = {centerBigNumber ? "dv_spin_number" : "dv_spin_number_big"}
                    style={{
                      backgroundImage:
                        centerNumber != ""
                          ? centerColor == "green"
                            ? "linear-gradient(45deg, green, grey)"
                            : centerColor == "red"
                            ? "linear-gradient(45deg, grey, red)"
                            : "linear-gradient(45deg, grey, black)"
                          : " ",
                    }}
                  >
                    <span style={{ marginTop: "0px!important" }}>
                      {" "}
                      {centerNumber != "" ? centerNumber : ""}{" "}
                    </span>
                  </div>
                )}
              </div>
              {/* <div><button onClick = {() => startSpin()}>SPIN</button></div>  */}
            </div>
          </div>
          <div className="dv_number_and_timer">
            <div className="dv_game_number">
              <span className="spn_time">CURRENT GAME</span>{" "}
              <span className="spn_time_main">#{currentGameId}</span>
            </div>
            <div className="dv_timer">
              <span className="spn_time">BET CLOSES IN </span>
              <span className="spn_time_main">
                {" "}
                {timeRemaining == "BET IS CLOSED"
                  ? timeRemaining
                  : seconds_to_clock(timeRemaining)}{" "}
              </span>
            </div>
            {/* <audio
              id="audio"
              ref={audioRef}
              src={require(`../resources/audio_numbers/${currentNumber}.wav`)}
            ></audio>
            <audio id="audio" src={require(`../resources/audio_numbers/0.wav`)}></audio>  */}
          </div>
        </div>
        <div className="dv_progress_bar">
          {/* progress bar */}
          <div className="progress progress-bar-vertical">
            <div
              className="progress-bar progress-striped"
              aria-valuemin="0"
              aria-valuemax="100"
              // style={{height: {`timeRemaining ${Math.round(timeRemaining * 100/30000)}%`}}}
              style={{
                height:
                  timeRemaining == "BET IS CLOSED"
                    ? "0%"
                    : `${Math.round(
                        (timeRemaining * 100) / currentGameLength
                      )}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="dv_stats">
          {/* Statistics */}
          <Carousel>
            <Carousel.Item>
              {/* <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption> */}
              <div className="dv_carousel">
                {/* <div><hr style = {{display: "inline-block", height: "3px", width: "20px"}}/><span>PAY TABLE</span><hr style = {{display: "inline-block", height: "3px", width: "20px"}}/></div>  */}
                <header>
                  <div className="header__center">PAY TABLE</div>
                </header>
                <div className="dv_pay_table_container">
                  <div>
                    <table className="tbl_pay_table">
                      <tbody>
                        <tr>
                          <td>NUMBER</td>
                          <td className="right_td">X36</td>
                        </tr>
                        <tr>
                          <td rowSpan="3">COLOUR</td>
                          <td className="right_td red_color">X2</td>
                        </tr>
                        <tr>
                          <td className="right_td black_color">X2</td>
                        </tr>
                        <tr>
                          <td className="right_td green_color">X36</td>
                        </tr>
                        <tr>
                          <td>MIRRORS</td>
                          <td className="right_td">X18</td>
                        </tr>
                        <tr>
                          <td>TWINS</td>
                          <td className="right_td">X12</td>
                        </tr>
                        <tr>
                          <td>FINALS</td>
                          <td className="right_td">X9</td>
                        </tr>
                        <tr>
                          <td>SECTORS</td>
                          <td className="right_td">X6</td>
                        </tr>
                        <tr>
                          <td>LOW/HIGH & COLOUR</td>
                          <td className="right_td">X4</td>
                        </tr>
                        <tr>
                          <td>DOZENS</td>
                          <td className="right_td">X3</td>
                        </tr>
                        <tr>
                          <td>EVEN/ODD</td>
                          <td className="right_td">X2</td>
                        </tr>
                        <tr>
                          <td>LOW/HIGH</td>
                          <td className="right_td">X2</td>
                        </tr>
                        <tr>
                          <td>NEIGHBOURS</td>
                          <td className="right_td">X7</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="dv_carousel">
                {/* <div><hr style = {{display: "inline-block", height: "3px", width: "20px"}}/><span>PAY TABLE</span><hr style = {{display: "inline-block", height: "3px", width: "20px"}}/></div>  */}
                <header>
                  <div className="header__center">NUMBER (LAST 120 DRAWS)</div>
                </header>
                <div className="dv_individual_numbers">
                  <table className="tbl_individual_numbers">
                    <tbody>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[1].color == "red" ? "red" : "black",
                          }}
                        >
                          1
                        </td>
                        <td>{oneTwentyArray[1]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[13].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          13
                        </td>
                        <td>{oneTwentyArray[13]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[25].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          25
                        </td>
                        <td>{oneTwentyArray[25]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[2].color == "red" ? "red" : "black",
                          }}
                        >
                          2
                        </td>
                        <td>{oneTwentyArray[2]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[14].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          14
                        </td>
                        <td>{oneTwentyArray[14]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[26].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          26
                        </td>
                        <td>{oneTwentyArray[26]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[3].color == "red" ? "red" : "black",
                          }}
                        >
                          3
                        </td>
                        <td>{oneTwentyArray[3]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[15].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          15
                        </td>
                        <td>{oneTwentyArray[15]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[27].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          27
                        </td>
                        <td>{oneTwentyArray[27]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[4].color == "red" ? "red" : "black",
                          }}
                        >
                          4
                        </td>
                        <td>{oneTwentyArray[4]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[16].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          16
                        </td>
                        <td>{oneTwentyArray[16]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[28].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          28
                        </td>
                        <td>{oneTwentyArray[28]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[5].color == "red" ? "red" : "black",
                          }}
                        >
                          5
                        </td>
                        <td>{oneTwentyArray[5]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[17].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          17
                        </td>
                        <td>{oneTwentyArray[17]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[29].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          29
                        </td>
                        <td>{oneTwentyArray[29]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[6].color == "red" ? "red" : "black",
                          }}
                        >
                          6
                        </td>
                        <td>{oneTwentyArray[6]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[18].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          18
                        </td>
                        <td>{oneTwentyArray[18]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[30].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          30
                        </td>
                        <td>{oneTwentyArray[30]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[7].color == "red" ? "red" : "black",
                          }}
                        >
                          7
                        </td>
                        <td>{oneTwentyArray[7]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[19].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          19
                        </td>
                        <td>{oneTwentyArray[19]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[31].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          31
                        </td>
                        <td>{oneTwentyArray[31]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[8].color == "red" ? "red" : "black",
                          }}
                        >
                          8
                        </td>
                        <td>{oneTwentyArray[8]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[20].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          20
                        </td>
                        <td>{oneTwentyArray[20]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[32].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          32
                        </td>
                        <td>{oneTwentyArray[32]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[9].color == "red" ? "red" : "black",
                          }}
                        >
                          9
                        </td>
                        <td>{oneTwentyArray[9]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[21].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          21
                        </td>
                        <td>{oneTwentyArray[21]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[33].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          33
                        </td>
                        <td>{oneTwentyArray[33]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[10].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          10
                        </td>
                        <td>{oneTwentyArray[10]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[22].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          22
                        </td>
                        <td>{oneTwentyArray[22]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[34].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          34
                        </td>
                        <td>{oneTwentyArray[34]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[11].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          11
                        </td>
                        <td>{oneTwentyArray[11]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[23].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          23
                        </td>
                        <td>{oneTwentyArray[23]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[35].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          35
                        </td>
                        <td>{oneTwentyArray[35]}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            background:
                              spin_numbers2[12].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          12
                        </td>
                        <td>{oneTwentyArray[12]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[24].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          24
                        </td>
                        <td>{oneTwentyArray[24]}</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[36].color == "red"
                                ? "red"
                                : "black",
                          }}
                        >
                          36
                        </td>
                        <td>{oneTwentyArray[36]}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" style={{ background: "green" }}>
                          0
                        </td>
                        <td colSpan="3">{oneTwentyArray[0]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">COLOURS (LAST 120 DRAWS)</div>
                </header>
                <div className="dv_colours">
                  <table className="tbl_colours">
                    <tbody>
                      <tr>
                        <td style={{ background: "red" }}>
                          {oneTwentyColors[0]}
                        </td>
                        <td style={{ background: "black" }}>
                          {oneTwentyColors[1]}
                        </td>
                        <td style={{ background: "green" }}>
                          {oneTwentyColors[2]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">
                    EVEN/ODD (LAST 120 DRAWS)
                  </div>
                </header>
                <div className="dv_even_odd">
                  <table className="tbl_even_odd">
                    <tbody>
                      <tr>
                        <td className="td_mirrors">EVEN</td>
                        <td>{oneTwentyEvenOdd[0]}</td>
                        <td className="td_mirrors">ODD</td>
                        <td>{oneTwentyEvenOdd[1]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="dv_carousel">
                {/* <div><hr style = {{display: "inline-block", height: "3px", width: "20px"}}/><span>PAY TABLE</span><hr style = {{display: "inline-block", height: "3px", width: "20px"}}/></div>  */}
                <header>
                  <div className="header__center">
                    LOW/HIGH (LAST 120 DRAWS)
                  </div>
                </header>
                <div className="dv_high_low">
                  <table className="tbl_high_low">
                    <tbody>
                      <tr>
                        <td className="td_mirrors">HIGH</td>
                        <td>{oneTwentyHighLow[0]}</td>
                        <td className="td_mirrors">LOW</td>
                        <td>{oneTwentyHighLow[1]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">
                    LOW/HIGH COLOUR (LAST 120 DRAWS)
                  </div>
                </header>
                <div className="dv_high_color">
                  <table className="tbl_high_color">
                    <tbody>
                      <tr className="td_mirrors">
                        <td>L&RED</td>
                        <td>H&RED</td>
                        <td>L&BLACK</td>
                        <td>H&RED</td>
                      </tr>
                      <tr>
                        <td>{oneTwentyHighLowColor[0]}</td>
                        <td>{oneTwentyHighLowColor[1]}</td>
                        <td>{oneTwentyHighLowColor[2]}</td>
                        <td>{oneTwentyHighLowColor[3]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">MIRROR (LAST 120 DRAWS)</div>
                </header>
                <div className="dv_mirrors">
                  <table className="tbl_mirrors">
                    <tbody>
                      <tr>
                        <td className="td_mirrors">12,21</td>
                        <td>{oneTwentyMirrors[0]}</td>
                        <td className="td_mirrors">13,31</td>
                        <td>{oneTwentyMirrors[1]}</td>
                        <td className="td_mirrors">23,32</td>
                        <td>{oneTwentyMirrors[2]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">
                    HOT/COLD NUMBERS (LAST 120 DRAWS)
                  </div>
                </header>
                <div className="dv_hot_cold">
                  <table className="tbl_hot_cold">
                    <tbody>
                      <tr>
                        <td colSpan="2">HOT</td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[36]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[36]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[36]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[35]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[35]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[35]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[34]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[34]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[34]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[33]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[33]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[33]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[32]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[32]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[32]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[31]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[31]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[31]}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="td_mirrors">
                          COLD
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[5]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[5]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[5]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[4]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[4]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[4]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[3]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[3]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[3]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[2]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[2]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[2]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[1]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[1]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[1]}
                        </td>
                        <td
                          style={{
                            background:
                              spin_numbers2[oneTwentyHotColdNums[0]].color ==
                              "red"
                                ? "red"
                                : spin_numbers2[oneTwentyHotColdNums[0]]
                                    .color == "green"
                                ? "green"
                                : "black",
                          }}
                        >
                          {oneTwentyHotColdNums[0]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">TWINS (LAST 120 DRAWS)</div>
                </header>
                <div className="dv_twins">
                  <table className="tbl_twins">
                    <tbody>
                      <tr>
                        <td className="td_mirrors">11,22,33</td>
                        <td>{oneTwentyTwins[0]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <header>
                  <div className="header__center">TWINS (LAST 120 DRAWS)</div>
                </header>
                <div className="dv_sectors">
                  <table className="tbl_sectors">
                    <tbody>
                      <tr className="td_mirrors">
                        <td>A</td>
                        <td>B</td>
                        <td>C</td>
                        <td>D</td>
                        <td>E</td>
                        <td>F</td>
                      </tr>
                      <tr>
                        <td>{oneTwentySectors[0]}</td>
                        <td>{oneTwentySectors[1]}</td>
                        <td>{oneTwentySectors[2]}</td>
                        <td>{oneTwentySectors[3]}</td>
                        <td>{oneTwentySectors[4]}</td>
                        <td>{oneTwentySectors[5]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      {/* <video id="background-video" autoplay loop poster="https://assets.codepen.io/6093409/river.jpg">
              <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
            </video> */}
      <video
        src={videoBg}
        autoPlay
        loop
        muted
        style={{ opacity: centerBigNumber ? "0.4" : "0" }}
        id="vid_bg"
      />
    </div>
  );
};

export default TheGame;
