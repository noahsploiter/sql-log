import { useState, useEffect, forwardRef, useRef } from "react";
import "../resources/css/cashier.css";
import {
  FaCheck,
  FaSignOutAlt,
  FaPrint,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

import ReactToPrint, {
  PrintContextConsumer,
  useReactToPrint,
} from "react-to-print";
import { useBarcode } from "@createnextapp/react-barcode";
const payIcon = require("../resources/img/back.png");

var input_values = [];
var bet_values = [];
var openStatus = "closed";
var next_ticket_number = 0;
var current_game_id = 0;

// const base_url = "https://yordiback2.goldengames35.com/";
const base_url = "http://localhost:3000/";

const Cashier = () => {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentGameLength, setCurrentGameLength] = useState(30000);
  const [currentGameId, setCurrentGameId] = useState("NONE");
  const [isBetOpen, setIsBetOpen] = useState(true);
  const [inputValues, setInputValues] = useState([]);
  const [betValues, setBetValues] = useState([]);
  const [activeDiv, setActiveDiv] = useState(0);
  const [isNeighborClicked, setIsNeighborClicked] = useState(false);
  const [nextTicketNumber, setNextTicketNumber] = useState(0);
  const [printInput, setPrintInput] = useState(0);
  const [isVerifyClicked, setIsVerifyClicked] = useState(false);
  const [verifyTicket, setVerifyTicket] = useState([]);
  const [verifyInput, setVerifyInput] = useState("");
  const [isTmClicked, setIsTmClicked] = useState(false);
  const [tm, setTm] = useState([]);
  const [cancelInput, setCancelInput] = useState("");
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  const [isCancelDone, setIsCancelDone] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [isInternetOn, setIsInternetOn] = useState(true);
  const [isPrintInProcess, setIsPrintInProcess] = useState(false);
  const [isTicketEmpty, setIsTicketEmpty] = useState(false);
  const [isNegativeBet, setIsNegativeBet] = useState(false);

  const ref_print = useRef();

  const on_after_print = () => {
    clear_all();
    setIsPrintInProcess(false);
  };

  const handlePrint = useReactToPrint({
    content: () => ref_print.current,
    onAfterPrint: () => on_after_print(),
  });

  let { inputRef } = useBarcode({
    value: nextTicketNumber,
    options: {
      //  background: '#ffff00',
      background: "#fff",
      fontWeight: "600",
    },
  });

  const sign_out = () => {
    sessionStorage.removeItem("cashier_name");
    sessionStorage.removeItem("shop_number");
    console.log(sessionStorage.getItem("cashier_name"));
    // console.log("signed out");
    window.location.replace("/cashier");
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

  const change_active_input = (num) => {
    setPrintInput(num);
    if (input_values.length > 0) {
      const inputdata = [...input_values];
      inputdata[activeDiv] = num;
      input_values = inputdata;
      setInputValues(inputdata);
    }
  };

  const handle_verify_ticket = () => {
    //  console.log(verifyInput);
    var ticket_num = {
      ticket_number: verifyInput,
    };

    const res = fetch(`${base_url}all_tables/users/getverifyticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket_num),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            // console.log(json);

            //  var array_ticket = [];
            //  for(var i = 0; i < json.length; i++){
            //      array_ticket.push(json[i]);
            //  }
            //       setVerifyTicket(array_ticket);
            setVerifyTicket(json);
            // console.log(json);
          });
        } else {
        }
      })
      .catch((err) => {
        console.log("connection not working");
      });
  };
  const handle_tm = () => {
    var cashier_data = {
      cashier_name: sessionStorage.getItem("cashier_name"),
    };
    setIsTmClicked(true);
    const res = fetch(`${base_url}all_tables/users/gettm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cashier_data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            setTm(json);
            // console.log(json);
          });
        } else {
        }
      })
      .catch((err) => {
        console.log("connection not working");
      });
  };

  const print_ticket = async (print_json) => {
    if (print_json.length > 0) {
      setIsInternetOn(true);
      const res = await fetch(
        `${base_url}all_tables/users/ticketregistration`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(print_json),
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              //console.log(json);
              if (json.registered == "1") {
                console.log(json);
                handlePrint();
              } else {
                console.log("here is the error");
                setIsPrintInProcess(false);
                setIsInternetOn(false);
              }
            });
          } else {
            setIsPrintInProcess(false);
            setIsInternetOn(false);
          }
        })
        .catch((err) => {
          console.log("connection not working");
          setIsPrintInProcess(false);
          setIsInternetOn(false);
        });
    } else {
      setIsPrintInProcess(false);
      setIsTicketEmpty(true);
    }
  };
  const ticket_cancel = async () => {
    var ticket_num = {
      ticket_number: cancelInput,
    };

    const res = await fetch(`${base_url}all_tables/users/ticketcancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket_num),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            //console.log(json);
            if (json.registered == "1") {
              // console.log(json);
              setIsCancelDone(true);
              setIsCancelSuccess(true);
            } else {
              setIsCancelDone(true);
              setIsCancelSuccess(false);
              console.log("here is the error");
            }
          });
        } else {
        }
      })
      .catch((err) => {
        console.log("connection not working");
      });
  };
  const ticket_pay = async (ticket_no) => {
    if (sessionStorage.getItem("cashier_name") != null) {
      var ticket_num = {
        ticket_id: ticket_no,
        ticket_number: verifyInput,
        cashier: sessionStorage.getItem("cashier_name"),
      };

      const res = await fetch(`${base_url}all_tables/users/ticketpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket_num),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              //console.log(json);

              setVerifyTicket(json);
            });
          } else {
          }
        })
        .catch((err) => {
          console.log("connection not working");
        });
    } else {
      window.location.replace("/cashier");
    }
  };
  const bet_rates = [
    { type: "high_low", rate: 2 },
    { type: "even_odd", rate: 2 },
    { type: "colors", rate: 2 },
    { type: "neighbors", rate: 7 },
    { type: "twins", rate: 12 },
    { type: "numbers", rate: 36 },
    { type: "donzens", rate: 3 },
    { type: "high_low_color", rate: 4 },
    { type: "mirrors", rate: 18 },
    { type: "sectors", rate: 6 },
    { type: "finals", rate: 9 },
  ];

  const get_bet_rate = (bet_type) => {
    var rate = 0;
    for (var j = 0; j < bet_rates.length; j++) {
      if (bet_rates[j].type == bet_type) {
        rate = bet_rates[j].rate;
        break;
      }
    }
    return rate;
  };
  const ticket_json = () => {
    // if(sessionStorage.getItem('cashier_name') != null){

    // }
    // else{
    //   window.location.replace("/cashier");
    // }

    var json_inserted = [];
    // var abc = [...json_inserted, ""];
    // json_inserted = abc;
    // setInputValues(abc);
    var negative_bet_count = 0;
    for (var i = 0; i < input_values.length; i++) {
      var win_money_amount = 0;
      var bet_money_amount = 0;
      if (input_values[i] == "") {
        bet_money_amount = 0;
      } else {
        bet_money_amount = input_values[i];
        if (input_values[i] < 0) {
          negative_bet_count++;
        }
      }
      for (var j = 0; j < bet_rates.length; j++) {
        if (bet_rates[j].type == bet_values[i].type) {
          win_money_amount = bet_rates[j].rate * bet_money_amount;
          break;
        }
      }

      var single_bet = {
        ticket_number: next_ticket_number,
        game_number: current_game_id,
        bet_type: bet_values[i].type,
        bet_value: bet_values[i].val,
        bet_money: bet_money_amount,
        win_money: win_money_amount,
        bet_time: Date.now(),
        win_status: "pending",
        cashier_name: sessionStorage.getItem("cashier_name"),
        paid: "no",
        cancelled: "no",
      };

      var abc = [...json_inserted, single_bet];
      json_inserted = abc;
    }
    if (negative_bet_count > 0) {
      console.log(negative_bet_count);
      return "-";
    } else {
      console.log(negative_bet_count);
      return json_inserted;
    }
  };
  const get_next_ticket_number = () => {
    if (sessionStorage.getItem("cashier_name") != null) {
      setIsPrintInProcess(true);
      // var min = 10;
      // var max = 99;
      // var rand =  min + (Math.random() * (max-min));
      // var rand_rounded = Math.round(rand).toString();  // 407 to 443
      // var time_stamp = Date.now().toString();
      // var ticket_num = rand_rounded + time_stamp;
      // next_ticket_number = ticket_num * 1;
      // setNextTicketNumber(ticket_num * 1);
      var ticket_jsn = ticket_json();
      if (ticket_jsn == "-") {
        // there is a negative bet
        setIsPrintInProcess(false);
        setIsNegativeBet(true);
      } else {
        print_ticket(ticket_json());
      }

      // clear_all();
    } else {
      window.location.replace("/cashier");
    }
  };

  const random_bets = [
    { type: "high_low", val: "high" },
    { type: "high_low", val: "low" },
    { type: "even_odd", val: "even" },
    { type: "even_odd", val: "odd" },
    { type: "colors", val: "red" },
    { type: "colors", val: "black" },
    { type: "neighbors", val: "neighbor 0" },
    { type: "neighbors", val: "neighbor 1" },
    { type: "neighbors", val: "neighbor 2" },
    { type: "neighbors", val: "neighbor 3" },
    { type: "neighbors", val: "neighbor 4" },
    { type: "neighbors", val: "neighbor 5" },
    { type: "neighbors", val: "neighbor 6" },
    { type: "neighbors", val: "neighbor 7" },
    { type: "neighbors", val: "neighbor 8" },
    { type: "neighbors", val: "neighbor 9" },
    { type: "neighbors", val: "neighbor 10" },
    { type: "neighbors", val: "neighbor 11" },
    { type: "neighbors", val: "neighbor 12" },
    { type: "neighbors", val: "neighbor 13" },
    { type: "neighbors", val: "neighbor 14" },
    { type: "neighbors", val: "neighbor 15" },
    { type: "neighbors", val: "neighbor 16" },
    { type: "neighbors", val: "neighbor 17" },
    { type: "neighbors", val: "neighbor 18" },
    { type: "neighbors", val: "neighbor 19" },
    { type: "neighbors", val: "neighbor 20" },
    { type: "neighbors", val: "neighbor 21" },
    { type: "neighbors", val: "neighbor 22" },
    { type: "neighbors", val: "neighbor 23" },
    { type: "neighbors", val: "neighbor 24" },
    { type: "neighbors", val: "neighbor 25" },
    { type: "neighbors", val: "neighbor 26" },
    { type: "neighbors", val: "neighbor 27" },
    { type: "neighbors", val: "neighbor 28" },
    { type: "neighbors", val: "neighbor 29" },
    { type: "neighbors", val: "neighbor 30" },
    { type: "neighbors", val: "neighbor 31" },
    { type: "neighbors", val: "neighbor 32" },
    { type: "neighbors", val: "neighbor 33" },
    { type: "neighbors", val: "neighbor 34" },
    { type: "neighbors", val: "neighbor 35" },
    { type: "neighbors", val: "neighbor 36" },
    { type: "twins", val: "twins" },
    { type: "numbers", val: "0" },
    { type: "numbers", val: "1" },
    { type: "numbers", val: "2" },
    { type: "numbers", val: "3" },
    { type: "numbers", val: "4" },
    { type: "numbers", val: "5" },
    { type: "numbers", val: "6" },
    { type: "numbers", val: "7" },
    { type: "numbers", val: "8" },
    { type: "numbers", val: "9" },
    { type: "numbers", val: "10" },
    { type: "numbers", val: "11" },
    { type: "numbers", val: "12" },
    { type: "numbers", val: "13" },
    { type: "numbers", val: "14" },
    { type: "numbers", val: "15" },
    { type: "numbers", val: "16" },
    { type: "numbers", val: "17" },
    { type: "numbers", val: "18" },
    { type: "numbers", val: "19" },
    { type: "numbers", val: "20" },
    { type: "numbers", val: "21" },
    { type: "numbers", val: "22" },
    { type: "numbers", val: "23" },
    { type: "numbers", val: "24" },
    { type: "numbers", val: "25" },
    { type: "numbers", val: "26" },
    { type: "numbers", val: "27" },
    { type: "numbers", val: "28" },
    { type: "numbers", val: "29" },
    { type: "numbers", val: "30" },
    { type: "numbers", val: "31" },
    { type: "numbers", val: "32" },
    { type: "numbers", val: "33" },
    { type: "numbers", val: "34" },
    { type: "numbers", val: "35" },
    { type: "numbers", val: "36" },
    { type: "donzens", val: "1st donzen" },
    { type: "donzens", val: "2nd donzen" },
    { type: "donzens", val: "3rd donzen" },
    { type: "high_low_color", val: "high & red" },
    { type: "high_low_color", val: "high & black" },
    { type: "high_low_color", val: "low & red" },
    { type: "high_low_color", val: "low & black" },
    { type: "mirrors", val: "12/21" },
    { type: "mirrors", val: "13/31" },
    { type: "mirrors", val: "23/32" },
    { type: "sectors", val: "sector A" },
    { type: "sectors", val: "sector B" },
    { type: "sectors", val: "sector C" },
    { type: "sectors", val: "sector D" },
    { type: "sectors", val: "sector E" },
    { type: "sectors", val: "sector F" },
    { type: "finals", val: "final 0" },
    { type: "finals", val: "final 1" },
    { type: "finals", val: "final 2" },
    { type: "finals", val: "final 3" },
    { type: "finals", val: "final 4" },
    { type: "finals", val: "final 5" },
    { type: "finals", val: "final 6" },
  ];

  const handleRandom = () => {
    var min = 0;
    var max = random_bets.length - 1;
    var rand = min + Math.random() * (max - min);
    var rand_rounded = Math.round(rand);
    handleAdd(random_bets[rand_rounded]);
  };

  const handleAdd = async (bet_datas) => {
    if (input_values.length == 0) {
      var min = 10;
      var max = 99;
      var rand = min + Math.random() * (max - min);
      var rand_rounded = Math.round(rand).toString(); // 407 to 443
      var time_stamp = Date.now().toString();
      var ticket_num = rand_rounded + time_stamp;
      next_ticket_number = ticket_num * 1;
      setNextTicketNumber(ticket_num * 1);
    }

    const abc = [...input_values, "0"];
    input_values = abc;
    setInputValues(abc);
    const cde = [...bet_values, bet_datas];
    bet_values = cde;
    setBetValues(cde);

    var count_divs = input_values.length;
    if (count_divs == 0) {
    } else {
      setActiveDiv(count_divs - 1);
    }

    //console.log(val_var);
  };
  const handleAdd2 = async (bet_datas) => {
    if (input_values.length == 0) {
      const url_next_ticket_number = `${base_url}all_tables/users/getnextticketnumber`;
      const res = await fetch(url_next_ticket_number)
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              next_ticket_number = json.next_ticket_number; //because it is before being inserted
              setNextTicketNumber(json.next_ticket_number);
            });
          } else {
            // setModalMessage('10');
          }
        })
        .catch((err) => {
          // console.log("AXIOS ERROR: ", err);
          //   setModalMessage('10');
        });
    }

    const abc = [...input_values, "0"];
    input_values = abc;
    setInputValues(abc);
    const cde = [...bet_values, bet_datas];
    bet_values = cde;
    setBetValues(cde);

    var count_divs = input_values.length;
    if (count_divs == 0) {
    } else {
      setActiveDiv(count_divs - 1);
    }

    //console.log(val_var);
  };

  const make_div_active = (i) => {
    setActiveDiv(i);
    document.getElementById(i.toString()).focus();
  };
  const custom_amount = () => {
    if (activeDiv > input_values.length - 1) {
      setActiveDiv(input_values.length - 1);
      document.getElementById((input_values.length - 1).toString()).focus();
    } else {
      document.getElementById(activeDiv.toString()).focus();
    }
  };

  const handleChange = (onChangeValue, i) => {
    const inputdata = [...input_values];
    inputdata[i] = onChangeValue.target.value;
    input_values = inputdata;
    setInputValues(inputdata);

    // console.log(count_divs);
    //console.log(val_var);
  };
  const apply_all = () => {
    const inputdata = [...input_values];
    for (var i = 0; i < inputdata.length; i++) {
      inputdata[i] = printInput;
    }
    input_values = inputdata;
    setInputValues(inputdata);
  };

  const handleRemove = (onChangeValue, i) => {
    const deleteVal = [...input_values];
    deleteVal.splice(i, 1);
    input_values = deleteVal;
    setInputValues(input_values);
    const deleteBets = [...bet_values];
    deleteBets.splice(i, 1);
    bet_values = deleteBets;
    setBetValues(bet_values);
    // console.log(input_values);
  };
  const clear_all = () => {
    const deleteVal = [...input_values];
    const deleteBets = [...bet_values];
    if (input_values.length > 0) {
      deleteVal.splice(0, input_values.length);
      deleteBets.splice(0, input_values.length);
    }

    input_values = deleteVal;
    setInputValues(input_values);
    bet_values = deleteBets;
    setBetValues(bet_values);
  };
  const barCodeChangeVerify = (val) => {
    let verify_val = val;
    if (val.length > 15) {
      verify_val = val.substring(val.length - 15);
    } else {
      verify_val = val;
    }
    setVerifyInput(verify_val);
  };

  const barCodeChangeCancel = (val) => {
    let cancel_val = val;
    if (val.length > 15) {
      cancel_val = val.substring(val.length - 15);
    } else {
      cancel_val = val;
    }
    setCancelInput(cancel_val);
  };

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
              setTimeRemaining(0);

              openStatus = "closed";
              setIsBetOpen(false);
              //  console.log("to fetch data intro");
              fetch_data_intro();
            } else {
              setTimeRemaining(json.time_remaining);
              //openStatus = "open";
              // setIsBetOpen(true);
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
            // console.log(json);
            if (json.open_status == "closed") {
              setTimeRemaining(0);
              // start spinner

              openStatus = "closed";
              setIsBetOpen(false);
              fetch_data_first();
            } else {
              setTimeRemaining(json.time_remaining);
              if (openStatus != "open") {
                get_current_game_length();
                clear_all();
                setCurrentGameId(json.current_game_id);
                current_game_id = json.current_game_id;
                setIsBetOpen(true);
                openStatus = "open";
              }
              setIsBetOpen(true);
              openStatus = "open";
              fetch_data_first();
            }
            //console.log("to fetch data second");

            // console.log("fetched");
          });
        } else {
          // console.log("not fetched");
          fetch_data_first();
        }
      })
      .catch((err) => {
        // console.log("AXIOS ERROR: ", err);
        //     console.log("not fetched 2");
        fetch_data_first();
      });
    //---------------------------end of fetching open status and time remaining---------------------
  }

  const spin_numbers2 = {
    0: { index: 0, level: 0, deg: "0.00", color: "green" },
    1: { index: 1, level: 14, color: "red", sector: "C" },
    2: { index: 2, level: 31, color: "black", sector: "F" },
    3: { index: 3, level: 2, color: "red", sector: "A" },
    4: { index: 4, level: 33, color: "black", sector: "F" },
    5: { index: 5, level: 18, color: "red", sector: "C" },
    6: { index: 6, level: 27, color: "black", sector: "E" },
    7: { index: 7, level: 6, color: "red", sector: "A" },
    8: { index: 8, level: 21, color: "black", sector: "D" },
    9: { index: 9, level: 10, color: "red", sector: "B" },
    10: { index: 10, level: 19, color: "black", sector: "D" },
    11: { index: 11, level: 23, color: "black", sector: "D" },
    12: { index: 12, level: 4, color: "red", sector: "A" },
    13: { index: 13, level: 25, color: "black", sector: "E" },
    14: { index: 14, level: 12, color: "red", sector: "B" },
    15: { index: 15, level: 35, color: "black", sector: "F" },
    16: { index: 16, level: 16, color: "red", sector: "C" },
    17: { index: 17, level: 29, color: "black", sector: "E" },
    18: { index: 18, level: 8, color: "red", sector: "B" },
    19: { index: 19, level: 34, color: "red", sector: "F" },
    20: { index: 20, level: 13, color: "black", sector: "C" },
    21: { index: 21, level: 32, color: "red", sector: "F" },
    22: { index: 22, level: 9, color: "black", sector: "B" },
    23: { index: 23, level: 20, color: "red", sector: "D" },
    24: { index: 24, level: 17, color: "black", sector: "C" },
    25: { index: 25, level: 30, color: "red", sector: "E" },
    26: { index: 26, level: 1, color: "black", sector: "A" },
    27: { index: 27, level: 26, color: "red", sector: "E" },
    28: { index: 28, level: 5, color: "black", sector: "A" },
    29: { index: 29, level: 7, color: "black", sector: "B" },
    30: { index: 30, level: 22, color: "red", sector: "D" },
    31: { index: 31, level: 11, color: "black", sector: "B" },
    32: { index: 32, level: 36, color: "red", sector: "F" },
    33: { index: 33, level: 15, color: "black", sector: "C" },
    34: { index: 34, level: 28, color: "red", sector: "E" },
    35: { index: 35, level: 3, color: "black", sector: "A" },
    36: { index: 36, level: 24, color: "red", sector: "D" },
  };
  const spin_numbers = {
    0: { index: 0 },
    1: { index: 26 },
    2: { index: 3 },
    3: { index: 35 },
    4: { index: 12 },
    5: { index: 28 },
    6: { index: 7 },
    7: { index: 29 },
    8: { index: 18 },
    9: { index: 22 },
    10: { index: 9 },
    11: { index: 31 },
    12: { index: 14 },
    13: { index: 20 },
    14: { index: 1 },
    15: { index: 33 },
    16: { index: 16 },
    17: { index: 24 },
    18: { index: 5 },
    19: { index: 10 },
    20: { index: 23 },
    21: { index: 8 },
    22: { index: 30 },
    23: { index: 11 },
    24: { index: 36 },
    25: { index: 13 },
    26: { index: 27 },
    27: { index: 6 },
    28: { index: 34 },
    29: { index: 17 },
    30: { index: 25 },
    31: { index: 2 },
    32: { index: 21 },
    33: { index: 4 },
    34: { index: 19 },
    35: { index: 15 },
    36: { index: 32 },
  };

  function find_neighbors(num) {
    var win_level = spin_numbers2[num].level;

    let str_neighbors = "";

    if (win_level == 0) {
      str_neighbors +=
        spin_numbers[35].index +
        "," +
        spin_numbers[36].index +
        "," +
        spin_numbers[0].index +
        "," +
        spin_numbers[1].index +
        "," +
        spin_numbers[2].index;
    }
    if (win_level == 1) {
      str_neighbors +=
        spin_numbers[36].index +
        "," +
        spin_numbers[0].index +
        "," +
        spin_numbers[1].index +
        "," +
        spin_numbers[2].index +
        "," +
        spin_numbers[3].index;
    }
    if (win_level == 36) {
      str_neighbors +=
        spin_numbers[34].index +
        "," +
        spin_numbers[35].index +
        "," +
        spin_numbers[36].index +
        "," +
        spin_numbers[0].index +
        "," +
        spin_numbers[1].index;
    }
    if (win_level == 35) {
      str_neighbors +=
        spin_numbers[33].index +
        "," +
        spin_numbers[34].index +
        "," +
        spin_numbers[35].index +
        "," +
        spin_numbers[36].index +
        "," +
        spin_numbers[0].index;
    }

    if (win_level > 1 && win_level < 35) {
      str_neighbors +=
        spin_numbers[win_level - 2].index +
        "," +
        spin_numbers[win_level - 1].index +
        "," +
        spin_numbers[win_level].index +
        "," +
        spin_numbers[win_level + 1].index +
        "," +
        spin_numbers[win_level + 2].index;
    }

    return str_neighbors;
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

  // Hook
  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
  // const ComponentToPrint = forwardRef((props, ref_print) => {
  //   return <div ref={ref_print}>

  //     </div>;
  // });

  function getNow() {
    //const timeNow = new Date();
    //const today = new Date(timeNow);
    // return today;
    //return timeNow;
    let date = new Date();
    //return now;

    //return date.getHours();
    return date.toString();
  }

  const ref = useRef();
  useOnClickOutside(ref, () => setIsNeighborClicked(false));

  useEffect(() => {
    fetch_data_intro();
    //   console.log(find_neighbors(9));
  }, []);

  return (
    <div className="cashier_main_container">
      <div className="cashier_numbers">
        <div className="cashier_timer_logout_container">
          <div className="cashier_progress_timer_container">
            <div className="cashier_game_number">
              <span>GAME</span>&nbsp; <span>#{currentGameId}</span>
            </div>
            <div className="cashier_progress_container">
              <div className="cashier_progress cashier_progress-bar-horizontal">
                <div
                  className="cashier_progress-bar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  // style={{height: {`timeRemaining ${Math.round(timeRemaining * 100/30000)}%`}}}
                  style={{
                    width: `${
                      100 -
                      Math.round((timeRemaining * 100) / currentGameLength)
                    }%`,
                  }}
                ></div>
              </div>
              {/* <div style = {{color: "#fff"}}>{timeRemaining}</div> */}
            </div>
            <div className="cashier_timer" style={{ color: "#fff" }}>
              {isBetOpen ? (
                <span>
                  {" "}
                  <span>BET CLOSES IN </span>
                  <span> {seconds_to_clock(timeRemaining)} </span>
                </span>
              ) : (
                <span>BET IS CLOSED</span>
              )}
            </div>
            <div className="cashier_verify">
              <span
                className="cashier_spn_verify"
                onClick={() => setIsVerifyClicked(true)}
              >
                Verify
              </span>
            </div>
            <div className="cashier_cancel">
              <span
                className="cashier_spn_cancel"
                onClick={() => setIsCancelClicked(true)}
              >
                Cancel
              </span>
            </div>
            <div className="cashier_tm">
              <span className="cashier_spn_tm" onClick={() => handle_tm()}>
                TM
              </span>
            </div>
          </div>
          <div className="cashier_signout_container">
            {/* <i class="fa fa-sign-out" aria-hidden="true"></i> */}
            <span className="cashier_spn_signout" onClick={() => sign_out()}>
              <FaSignOutAlt /> Sign Out
            </span>
          </div>
        </div>

        <div className="cashier_bet_keys">
          <div className="cashier_high_low">
            <table className="cashier_tbl_high_low">
              <thead></thead>
              <tbody>
                <tr>
                  <td
                    onClick={() => handleAdd({ type: "high_low", val: "high" })}
                  >
                    High
                  </td>
                  <td
                    onClick={() => handleAdd({ type: "high_low", val: "low" })}
                  >
                    Low
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() => handleAdd({ type: "even_odd", val: "even" })}
                  >
                    Even
                  </td>
                  <td
                    onClick={() => handleAdd({ type: "colors", val: "black" })}
                    style={{ background: "#000", color: "#fff" }}
                  >
                    Black
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() => handleAdd({ type: "even_odd", val: "odd" })}
                  >
                    Odd
                  </td>
                  <td
                    onClick={() => handleAdd({ type: "colors", val: "red" })}
                    style={{ background: "red", color: "#fff" }}
                  >
                    Red
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ background: "rgb(155, 60, 91)", color: "#fff" }}
                    colSpan="2"
                    onClick={() => setIsNeighborClicked(true)}
                  >
                    Neighbors
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="cashier_number_keys">
            <div className="cashier_twins_random">
              <table className="cashier_tbl_twins_random">
                <thead></thead>
                <tbody>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "twins", val: "twins" })}
                    >
                      Twins
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "0" })}
                      style={{
                        backgroundImage: "linear-gradient(#0bab64, #3bb78f)",
                      }}
                    >
                      0 Green
                    </td>
                    <td onClick={() => handleRandom()}>Random</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cashier_numbers_only">
              <table className="cashier_tbl_numbers_only">
                <thead></thead>
                <tbody>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "1" })}
                      style={{
                        background: spin_numbers2[1].color == "red" && "red",
                      }}
                    >
                      1
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "7" })}
                      style={{
                        background: spin_numbers2[7].color == "red" && "red",
                      }}
                    >
                      7
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "13" })}
                      style={{
                        background: spin_numbers2[13].color == "red" && "red",
                      }}
                    >
                      13
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "19" })}
                      style={{
                        background: spin_numbers2[19].color == "red" && "red",
                      }}
                    >
                      19
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "25" })}
                      style={{
                        background: spin_numbers2[25].color == "red" && "red",
                      }}
                    >
                      25
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "31" })}
                      style={{
                        background: spin_numbers2[31].color == "red" && "red",
                      }}
                    >
                      31
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "2" })}
                      style={{
                        background: spin_numbers2[2].color == "red" && "red",
                      }}
                    >
                      2
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "8" })}
                      style={{
                        background: spin_numbers2[8].color == "red" && "red",
                      }}
                    >
                      8
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "14" })}
                      style={{
                        background: spin_numbers2[14].color == "red" && "red",
                      }}
                    >
                      14
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "20" })}
                      style={{
                        background: spin_numbers2[20].color == "red" && "red",
                      }}
                    >
                      20
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "26" })}
                      style={{
                        background: spin_numbers2[26].color == "red" && "red",
                      }}
                    >
                      26
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "32" })}
                      style={{
                        background: spin_numbers2[32].color == "red" && "red",
                      }}
                    >
                      32
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "3" })}
                      style={{
                        background: spin_numbers2[3].color == "red" && "red",
                      }}
                    >
                      3
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "9" })}
                      style={{
                        background: spin_numbers2[9].color == "red" && "red",
                      }}
                    >
                      9
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "15" })}
                      style={{
                        background: spin_numbers2[15].color == "red" && "red",
                      }}
                    >
                      15
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "21" })}
                      style={{
                        background: spin_numbers2[21].color == "red" && "red",
                      }}
                    >
                      21
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "27" })}
                      style={{
                        background: spin_numbers2[27].color == "red" && "red",
                      }}
                    >
                      27
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "33" })}
                      style={{
                        background: spin_numbers2[33].color == "red" && "red",
                      }}
                    >
                      33
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "4" })}
                      style={{
                        background: spin_numbers2[4].color == "red" && "red",
                      }}
                    >
                      4
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "10" })}
                      style={{
                        background: spin_numbers2[10].color == "red" && "red",
                      }}
                    >
                      10
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "16" })}
                      style={{
                        background: spin_numbers2[16].color == "red" && "red",
                      }}
                    >
                      16
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "22" })}
                      style={{
                        background: spin_numbers2[22].color == "red" && "red",
                      }}
                    >
                      22
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "28" })}
                      style={{
                        background: spin_numbers2[28].color == "red" && "red",
                      }}
                    >
                      28
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "34" })}
                      style={{
                        background: spin_numbers2[34].color == "red" && "red",
                      }}
                    >
                      34
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "5" })}
                      style={{
                        background: spin_numbers2[5].color == "red" && "red",
                      }}
                    >
                      5
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "11" })}
                      style={{
                        background: spin_numbers2[11].color == "red" && "red",
                      }}
                    >
                      11
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "17" })}
                      style={{
                        background: spin_numbers2[17].color == "red" && "red",
                      }}
                    >
                      17
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "23" })}
                      style={{
                        background: spin_numbers2[23].color == "red" && "red",
                      }}
                    >
                      23
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "29" })}
                      style={{
                        background: spin_numbers2[29].color == "red" && "red",
                      }}
                    >
                      29
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "35" })}
                      style={{
                        background: spin_numbers2[35].color == "red" && "red",
                      }}
                    >
                      35
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "6" })}
                      style={{
                        background: spin_numbers2[6].color == "red" && "red",
                      }}
                    >
                      6
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "12" })}
                      style={{
                        background: spin_numbers2[12].color == "red" && "red",
                      }}
                    >
                      12
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "18" })}
                      style={{
                        background: spin_numbers2[18].color == "red" && "red",
                      }}
                    >
                      18
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "24" })}
                      style={{
                        background: spin_numbers2[24].color == "red" && "red",
                      }}
                    >
                      24
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "30" })}
                      style={{
                        background: spin_numbers2[30].color == "red" && "red",
                      }}
                    >
                      30
                    </td>
                    <td
                      onClick={() => handleAdd({ type: "numbers", val: "36" })}
                      style={{
                        background: spin_numbers2[36].color == "red" && "red",
                      }}
                    >
                      36
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cashier_donzens">
              <table className="cashier_tbl_donzens">
                <thead></thead>
                <tbody>
                  <tr>
                    <td
                      onClick={() =>
                        handleAdd({ type: "donzens", val: "1st donzen" })
                      }
                    >
                      1st Donzen
                    </td>
                    <td
                      onClick={() =>
                        handleAdd({ type: "donzens", val: "2nd donzen" })
                      }
                    >
                      2nd Donzen
                    </td>
                    <td
                      onClick={() =>
                        handleAdd({ type: "donzens", val: "3rd donzen" })
                      }
                    >
                      3rd Donzen
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="cashier_mirrors">
            <div className="cashier_high_color">
              <table className="cashier_tbl_high_color">
                <thead></thead>
                <tbody>
                  <tr>
                    <td
                      onClick={() =>
                        handleAdd({ type: "high_low_color", val: "high & red" })
                      }
                      style={{ background: "red", color: "#fff" }}
                    >
                      High & red
                    </td>
                    <td
                      onClick={() =>
                        handleAdd({ type: "high_low_color", val: "low & red" })
                      }
                      style={{ background: "red", color: "#fff" }}
                    >
                      Low & red
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() =>
                        handleAdd({
                          type: "high_low_color",
                          val: "high & black",
                        })
                      }
                      style={{ background: "#000", color: "#fff" }}
                    >
                      High & black
                    </td>
                    <td
                      onClick={() =>
                        handleAdd({
                          type: "high_low_color",
                          val: "low & black",
                        })
                      }
                      style={{ background: "#000", color: "#fff" }}
                    >
                      Low & Black
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cashier_mirrors_only">
              <table className="cashier_tbl_mirrors">
                <thead></thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td
                      onClick={() =>
                        handleAdd({ type: "mirrors", val: "12/21" })
                      }
                      className="cashier_td_mirrors"
                    >
                      12/21
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() =>
                        handleAdd({ type: "mirrors", val: "13/31" })
                      }
                      className="cashier_td_mirrors"
                    >
                      13/31
                    </td>
                  </tr>
                  <tr>
                    <td
                      onClick={() =>
                        handleAdd({ type: "mirrors", val: "23/32" })
                      }
                      className="cashier_td_mirrors"
                    >
                      23/32
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="cashier_sectors">
          <table className="cashier_tbl_sectors" style={{ color: "#fff" }}>
            <thead></thead>
            <tbody>
              <tr>
                <td
                  onClick={() =>
                    handleAdd({ type: "sectors", val: "sector A" })
                  }
                >
                  Sector A
                </td>
                <td
                  onClick={() =>
                    handleAdd({ type: "sectors", val: "sector B" })
                  }
                >
                  Sector B
                </td>
                <td
                  onClick={() =>
                    handleAdd({ type: "sectors", val: "sector C" })
                  }
                >
                  Sector C
                </td>
              </tr>
              <tr>
                <td
                  onClick={() =>
                    handleAdd({ type: "sectors", val: "sector D" })
                  }
                >
                  Sector D
                </td>
                <td
                  onClick={() =>
                    handleAdd({ type: "sectors", val: "sector E" })
                  }
                >
                  Sector E
                </td>
                <td
                  onClick={() =>
                    handleAdd({ type: "sectors", val: "sector F" })
                  }
                >
                  Sector F
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cashier_finals">
          <table className="cashier_tbl_finals" style={{ color: "#fff" }}>
            <thead></thead>
            <tbody>
              <tr>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 0" })}
                >
                  Final 0
                </td>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 1" })}
                >
                  Final 1
                </td>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 2" })}
                >
                  Final 2
                </td>
              </tr>
              <tr>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 3" })}
                >
                  Final 3
                </td>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 4" })}
                >
                  Final 4
                </td>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 5" })}
                >
                  Final 5
                </td>
              </tr>
              <tr>
                <td
                  onClick={() => handleAdd({ type: "finals", val: "final 6" })}
                >
                  Final 6
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="cashier_neighbor_div"
          style={{ display: isNeighborClicked ? "flex" : "none" }}
          ref={ref}
        >
          <div className="cashier_neighbor_numbers">
            <div
              className="cashier_neighbor_close"
              onClick={() => setIsNeighborClicked(false)}
            >
              Close
            </div>
            <table className="cashier_neighbor_tbl">
              <thead></thead>
              <tbody>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 0" })
                    }
                  >
                    0
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 1" })
                    }
                  >
                    1
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 2" })
                    }
                  >
                    2
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 3" })
                    }
                  >
                    3
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 4" })
                    }
                  >
                    4
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 5" })
                    }
                  >
                    5
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 6" })
                    }
                  >
                    6
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 7" })
                    }
                  >
                    7
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 8" })
                    }
                  >
                    8
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 9" })
                    }
                  >
                    9
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 10" })
                    }
                  >
                    10
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 11" })
                    }
                  >
                    11
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 12" })
                    }
                  >
                    12
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 13" })
                    }
                  >
                    13
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 14" })
                    }
                  >
                    14
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 15" })
                    }
                  >
                    15
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 16" })
                    }
                  >
                    16
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 17" })
                    }
                  >
                    17
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 18" })
                    }
                  >
                    18
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 19" })
                    }
                  >
                    19
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 20" })
                    }
                  >
                    20
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 21" })
                    }
                  >
                    21
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 22" })
                    }
                  >
                    22
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 23" })
                    }
                  >
                    23
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 24" })
                    }
                  >
                    24
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 25" })
                    }
                  >
                    25
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 26" })
                    }
                  >
                    26
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 27" })
                    }
                  >
                    27
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 28" })
                    }
                  >
                    28
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 29" })
                    }
                  >
                    29
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 30" })
                    }
                  >
                    30
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 31" })
                    }
                  >
                    31
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 32" })
                    }
                  >
                    32
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 33" })
                    }
                  >
                    33
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 34" })
                    }
                  >
                    34
                  </td>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 35" })
                    }
                  >
                    35
                  </td>
                </tr>
                <tr>
                  <td
                    onClick={() =>
                      handleAdd({ type: "neighbors", val: "neighbor 36" })
                    }
                  >
                    36
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="cashier_input_fields">
        <div style={{ width: "100%" }}>
          <button className="cashier_btn_clear" onClick={() => clear_all()}>
            Clear All
          </button>
          {/* <button onClick = {() => handleAdd()} >Add</button> */}
          {inputValues.map((data, i) => {
            return (
              <div
                key={i}
                className="cashier_inputs"
                style={{
                  background: i == activeDiv && "rgb(155, 60, 91)",
                  color: i == activeDiv && "#fff",
                }}
                onClick={() => make_div_active(i)}
              >
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: "10px",
                  }}
                >
                  <span>{betValues[i].val}</span>
                </div>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    id={i.toString()}
                    value={data}
                    onChange={(e) => handleChange(e, i)}
                    type="number"
                  />
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: "10px",
                  }}
                >
                  <button
                    className="cashier_btn_remove"
                    onClick={(e) => handleRemove(e, i)}
                  >
                    <FaTimes style={{ fontSize: "20px", color: "#fff" }} />
                  </button>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cashier_keyboard">
        <div className="cashier_custom_amount" style={{ width: "100%" }}>
          <button
            className="cashier_btn_custom_amount"
            onClick={() => apply_all()}
          >
            Apply to All
          </button>
          <button
            className="cashier_btn_custom_amount"
            onClick={() => custom_amount()}
          >
            Custom Amount
          </button>
        </div>

        <div className="cashier_input_print">
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={printInput}
            onChange={(e) => setPrintInput(e.target.value)}
            style={{ padding: "5px 10px" }}
          />
          {/* <button onClick = {() => get_next_ticket_number()}
                        className = "cashier_btn_print">Print<FaPrint style = {{marginLeft: "10px"}} /></button> */}
          {/* <ReactToPrint content={() => ref_print.current}
                                   onBeforeGetContent = { async () => await get_next_ticket_number()}
                                 
                                  >
                                    <PrintContextConsumer>
                                      {({handlePrint}) => (
                                        
                                        <button onClick = { handlePrint}
                                        className = "cashier_btn_print">Print<FaPrint style = {{marginLeft: "10px"}} /></button>
                                      )}
                                    </PrintContextConsumer>

                                  </ReactToPrint> */}
          {/* <ReactToPrint 
                                  trigger={() => {
                                   
                                    return <button className = "cashier_btn_print">Print<FaPrint style = {{marginLeft: "10px"}} /></button>
                                  }} 
                                  onBeforeGetContent = {() => get_next_ticket_number()}
                                  content = {() => ref_print.current} 
                                  
                                  /> */}

          <button
            onClick={get_next_ticket_number}
            className="cashier_btn_print"
          >
            Print
            <FaPrint style={{ marginLeft: "10px" }} />
          </button>
        </div>

        <div className="cashier_keyboard_numbers">
          <table className="cashier_tbl_keyboard_numbers">
            <thead></thead>
            <tbody>
              <tr>
                <td onClick={() => change_active_input(30000)}>30000</td>
                <td onClick={() => change_active_input(25000)}>25000</td>
                <td onClick={() => change_active_input(20000)}>20000</td>
              </tr>
              <tr>
                <td onClick={() => change_active_input(15000)}>15000</td>
                <td onClick={() => change_active_input(10000)}>10000</td>
                <td onClick={() => change_active_input(5000)}>5000</td>
              </tr>
              <tr>
                <td onClick={() => change_active_input(450)}>450</td>
                <td onClick={() => change_active_input(500)}>500</td>
                <td onClick={() => change_active_input(1000)}>1000</td>
              </tr>
              <tr>
                <td onClick={() => change_active_input(300)}>300</td>
                <td onClick={() => change_active_input(350)}>350</td>
                <td onClick={() => change_active_input(400)}>400</td>
              </tr>
              <tr>
                <td onClick={() => change_active_input(150)}>150</td>
                <td onClick={() => change_active_input(200)}>200</td>
                <td onClick={() => change_active_input(250)}>250</td>
              </tr>
              <tr>
                <td onClick={() => change_active_input(30)}>30</td>
                <td onClick={() => change_active_input(50)}>50</td>
                <td onClick={() => change_active_input(100)}>100</td>
              </tr>
              <tr>
                <td onClick={() => change_active_input(10)}>10</td>
                <td onClick={() => change_active_input(20)}>20</td>
                <td
                  style={{ background: "rgb(155, 60, 91)", color: "#fff" }}
                  onClick={() => setPrintInput(0)}
                >
                  Clear
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          display: isVerifyClicked ? "flex" : "none",
          position: "fixed",
          // width: "100%", height : "100%" ,
          zIndex: "20",
          background: "rgba(0,0,0,0.7)",
          alignItems: "center",
          justifyContent: "center",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
        }}
      >
        <div
          className="cashier_verify"
          style={{
            width: "800px",
            height: "600px",
            background: "#fff",
            padding: "10px 5px",
            overflow: "auto",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            {/* <span style = {{background: "red", color: "#fff", width: "40px", height: "40px", borderRadius: "50%"}}> */}
            <FaTimes
              onClick={() => setIsVerifyClicked(false)}
              style={{
                color: "#fff",
                background: "red",
                width: "35px",
                height: "35px",
                padding: "5px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            {/* </span> */}
          </div>
          <h4>Verify</h4>
          <div style={{ textAlign: "left" }}>
            <span style={{ color: "green" }}>
              *Enter ticket number and press enter to verify
            </span>
          </div>
          <input
            type="number"
            style={{ width: "100%", height: "40px" }}
            onKeyDown={(e) => e.key === "Enter" && handle_verify_ticket()}
            onChange={(e) => barCodeChangeVerify(e.target.value)}
            value={verifyInput}
          ></input>
          <table
            className="cashier_tbl_verify"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <thead>
              <tr>
                <th>Game No</th>
                <th>Bet type</th>
                <th>Bet value</th>
                <th>Bet money</th>
                <th>Win money</th>
                <th>Bet time</th>
                <th>Cashier</th>
                <th>Paid by</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {/* {verifyTicket.map((ticket) => {
                              <tr><td>hello</td></tr>
                            })} */}
              {verifyTicket.map((ticket) => {
                return (
                  <tr
                    key={ticket.id}
                    style={{
                      background:
                        ticket.win_status == "winner" ? "green" : "red",
                    }}
                  >
                    <td>{ticket.game_number}</td>
                    <td>{ticket.bet_type}</td>
                    <td>{ticket.bet_value}</td>
                    <td>{ticket.bet_money}</td>
                    <td>{ticket.win_money}</td>
                    <td>
                      {ticket.bet_time.split("T")[0] +
                        " " +
                        ticket.bet_time.split("T")[1].split(".")[0]}
                    </td>
                    <td>{ticket.cashier_name}</td>
                    <td>{ticket.paid_by}</td>
                    {ticket.paid == "no" ? (
                      <td
                        style={{
                          background:
                            ticket.win_status == "winner" && "#dedede",
                        }}
                      >
                        {ticket.win_status == "winner" && (
                          <span onClick={() => ticket_pay(ticket.id)}>
                            <img
                              src={payIcon}
                              style={{ width: "30px", height: "30px" }}
                            />
                          </span>
                        )}
                      </td>
                    ) : (
                      <td>paid</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          display: isCancelClicked ? "flex" : "none",
          position: "fixed",
          // width: "100%", height : "100%" ,
          zIndex: "20",
          background: "rgba(0,0,0,0.7)",
          alignItems: "center",
          justifyContent: "center",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
        }}
      >
        <div
          className="cashier_verify"
          style={{
            width: "800px",
            height: "600px",
            background: "#fff",
            padding: "10px 5px",
            overflow: "auto",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            {/* <span style = {{background: "red", color: "#fff", width: "40px", height: "40px", borderRadius: "50%"}}> */}
            <FaTimes
              onClick={() =>
                setIsCancelClicked(() => {
                  setIsCancelDone(false);
                  setIsCancelSuccess(false);
                  return false;
                })
              }
              style={{
                color: "#fff",
                background: "red",
                width: "35px",
                height: "35px",
                padding: "5px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            {/* </span> */}
          </div>
          <h4>Cancel</h4>
          <div style={{ textAlign: "left" }}>
            <span style={{ color: "red" }}>
              *Enter ticket number and press enter to cancel
            </span>
          </div>
          <input
            type="number"
            style={{ width: "100%", height: "40px" }}
            placeholder="enter ticket number and press enter"
            onKeyDown={(e) => e.key === "Enter" && ticket_cancel()}
            onChange={(e) => barCodeChangeCancel(e.target.value)}
            value={cancelInput}
          ></input>
          <div style={{ color: "green", marginTop: "30px" }}>
            {isCancelDone ? (
              isCancelSuccess ? (
                <span>
                  <FaCheck style={{ marginRight: "10px" }} />
                  ticket Successfully cancelled
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  <FaExclamationTriangle
                    style={{ marginRight: "10px", marginBottom: "3px" }}
                  />
                  Permission denied
                </span>
              )
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: isTmClicked ? "flex" : "none",
          position: "fixed",
          // width: "100%", height : "100%" ,
          zIndex: "20",
          background: "rgba(0,0,0,0.7)",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="cashier_tm"
          style={{
            width: "400px",
            height: "400px",
            background: "#fff",
            padding: "10px 5px",
            overflow: "auto",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            {/* <span style = {{background: "red", color: "#fff", width: "40px", height: "40px", borderRadius: "50%"}}> */}
            <FaTimes
              onClick={() => setIsTmClicked(false)}
              style={{
                color: "#fff",
                background: "red",
                width: "35px",
                height: "35px",
                padding: "5px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
            {/* </span> */}
          </div>
          <div>
            <table className="cashier_tbl_tm">
              <thead></thead>
              <tbody>
                <tr>
                  <th className="th_left">Total received money :</th>
                  <th className="th_right">{tm.total_received_money}</th>
                </tr>
                <tr>
                  <th className="th_left">Total paid money :</th>
                  <th className="th_right">{tm.total_paid_money}</th>
                </tr>
                <tr>
                  <th className="th_left">Total Profit :</th>
                  <th className="th_right">{tm.difference}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ display: "none", width: "200px" }}>
        {/* <ComponentToPrint ref={ref_print} /> */}
        <div className="ticket" ref={ref_print}>
          {/* <img src="./logo.png" alt="Logo" /> */}
          <p
            className="centered"
            style={{ fontWeight: "800", fontSize: "18px" }}
          ></p>
          <table style={{ fontWeight: "600" }}>
            <thead>
              {/* <tr>
                        <th class="quantity">Q.</th>
                        <th class="description">Description</th>
                        <th class="price">$$</th>
                    </tr> */}
            </thead>
            <tbody>
              <tr>
                <td colSpan="3">Time : {getNow()}</td>
              </tr>
              <tr>
                <td colSpan="3">No: {nextTicketNumber} </td>
              </tr>
              <tr>
                <td colSpan="3">Spin & win: {currentGameId}</td>
              </tr>
              <tr>
                <td colSpan="3">Who will be the winner?</td>
              </tr>
              {inputValues.map((bet, i) => {
                if (betValues[i].type == "neighbors") {
                  return (
                    <tr>
                      <td colSpan="3">
                        Bet:{" "}
                        {betValues[i].val.replace("_", " ") +
                          " winners:" +
                          find_neighbors(
                            betValues[i].val.replace("_", " ").split(" ")[1]
                          ) +
                          " | "}
                        money : {" " + bet + " | "}
                        {bet.toString() +
                          " * " +
                          get_bet_rate(betValues[i].type).toString() +
                          " = "}
                        {bet * get_bet_rate(betValues[i].type)}
                        {" Birr"}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr>
                      <td colSpan="3">
                        Bet: {betValues[i].val.replace("_", " ") + " | "}money :{" "}
                        {" " + bet + " | "}
                        {bet.toString() +
                          " * " +
                          get_bet_rate(betValues[i].type).toString() +
                          " = "}
                        {bet * get_bet_rate(betValues[i].type)}
                        {" Birr"}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <div
            style={{ marginTop: "30px", marginBottom: "20px", width: "160px" }}
          >
            <div>
              <img ref={inputRef} style={{ width: "160px" }} />
            </div>
          </div>
          <p className="centered" style={{ fontWeight: "600" }}>
            Thank You!
          </p>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          display: isBetOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",

          background: "rgba(0,0,0,0.8)",
          zIndex: "200",
        }}
      >
        <h2 style={{ color: "#fff" }}>BET IS CLOSED</h2>
      </div>
      <div
        style={{
          position: "fixed",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          display: isInternetOn ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",

          background: "rgba(0,0,0,0.8)",
          zIndex: "500",
        }}
      >
        {/* <h2 style = {{color: "#fff"}}>BET IS CLOSED</h2> */}
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "5px" }}
        >
          <span>Sorry! Internet connection lost! </span>
          <br></br>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              onClick={() => setIsInternetOn(true)}
              className="admin_btn_status_change"
              style={{ marginLeft: "5px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          display: isTicketEmpty ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",

          background: "rgba(0,0,0,0.8)",
          zIndex: "500",
        }}
      >
        {/* <h2 style = {{color: "#fff"}}>BET IS CLOSED</h2> */}
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "5px" }}
        >
          <span>Ticket is empty! </span>
          <br></br>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              onClick={() => setIsTicketEmpty(false)}
              className="admin_btn_status_change"
              style={{ marginLeft: "5px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          display: isNegativeBet ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",

          background: "rgba(0,0,0,0.8)",
          zIndex: "500",
        }}
      >
        {/* <h2 style = {{color: "#fff"}}>BET IS CLOSED</h2> */}
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "5px" }}
        >
          <span>Ticket cannot have negative bet! </span>
          <br></br>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              onClick={() => setIsNegativeBet(false)}
              className="admin_btn_status_change"
              style={{ marginLeft: "5px" }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          top: "0px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          display: isPrintInProcess ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",

          background: "rgba(0,0,0,0.8)",
          zIndex: "500",
        }}
      >
        {/* <h2 style = {{color: "#fff"}}>BET IS CLOSED</h2> */}
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "5px" }}
        >
          <span>Print is in progress please wait ... </span>
          <br></br>
        </div>
      </div>
    </div>
  );
};
export default Cashier;
