/* HOOKS */
import { useParams } from "react-router-dom";
import { useEffect, useState,useContext } from "react";

/* OTHERS */
import axios from "axios";
import { AuthContext } from "../shared/context/auth-context";
import MeetNotFound from "./components/MeetNotFound";
import Loading from "./components/Loading";
import MeetLayout from "./components/MeetLayout";

const Meet = () => {
  const { mid } = useParams();
  const auth = useContext(AuthContext);
  

  /* CHECK IF MEETING EXISTS */
  const [meetData, setMeetData] = useState(null);
  const [loadingMeetExists, setLoadingMeetExists] = useState(true);

  useEffect(() => {
    //when page is refreshed

    let config = {
      headers: {
        Authorization: "Token " + auth.token,
      },
    };

    axios
      .get(`http://localhost:8000/backend/access_meet/${mid}`,config)
      .then((response) => {
        setMeetData(response.data.meeting);
        setLoadingMeetExists(false);
        
      })
      .catch((err) => {
        setLoadingMeetExists(false);
        setMeetData(null);
      });
  }, []);



  if (loadingMeetExists) {
    return <Loading />;
  } else {
    if (!!meetData) { //meet exists
      return <MeetLayout meet={meetData}/>;
    } else {
      return <MeetNotFound />;
      
    }
  }
};

export default Meet;
