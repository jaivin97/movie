import axios from "axios";

const APIKEY = process.env.REACT_APP_TOKEN;

const authFetch = axios.create({
    baseURL: "https://api.themoviedb.org",
    headers:{
        Authorization : `Bearer ${APIKEY}`,
        Accept : `application/json`
    }
  });


export default authFetch;