import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import CardMovieComponent from "../../Components/CardMovies";
import PaginationComponent from "../../Components/Pagination";
import SearchComponents from "../../Components/Search";
import Alert from 'react-bootstrap/Alert';
import ToastMessageComponent from "../../Components/Toast";
const HomeContainer = () =>{

    const APIKEY = process.env.REACT_APP_TOKEN;
    const KEY = process.env.REACT_APP_API_KEY
   // const APIKEY = "c82efe36f886f9f4ee17e977df32ddfeeyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWFjY2QzNGJiNDM0NmQ4ZjRiNGQ4NDQ4ZmU1NWRhOSIsInN1YiI6IjYzY2UxZjdlM2M0MzQ0MDBjZWVkNGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qPAaDDmSfqodVwQcNzPZZmTBg6ripGVRJZUwfiya60Q";

    const [movie, setmovie ] = useState([]);
    const [pages, setpage]=useState(1);

    const [paginationno, setpaginationno] = useState(0);

    const [searchValue, setSearchValue] = useState('');
    const [typeValue, setTypeValue] = useState('movie');
    const [showAlertMsg, hideAlertMsg] = useState(false);
    const [showToastMsg, hideToastMsg] = useState(false);

    const authFetch = axios.create({
        baseURL: "https://api.themoviedb.org",
        headers:{
            Authorization : `Bearer ${APIKEY}`,
            Accept : `application/json`
        }
      });

    //    // interceptor request
    // authFetch.interceptors.request.use(
    // (config) => {
    //   config.headers.Authorization = `Bearer ${APIKEY}`;
    //   config.headers.Accept =`application/json`;
    //   console.log(config);
    //   return config;
    // },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    const PopularMovie = async() => {
      //  const {data} = await axios.get(authFetch +`/3/movie/popular?language=en-US&page=${page}`);

      try {
        
        const {data} = await authFetch.get(`/3/movie/popular?language=en-US&page=${pages}`);
        setmovie([]);
        setpaginationno(0);
        setmovie(data.results);
        setpaginationno(data.total_pages)
        console.log(`Popular Movie  ${data.page}   ${data.results}`);
        //console.log(`${movie.at(2).original_title}`)
        console.log(movie)
        console.log(`movie size  ${movie.length}`)
        hideAlertMsg(false);
      } catch (error) {
        hideAlertMsg(true);        
        
      }


    }

    const handleClick = (number)=>{
        setpage(number);
    }

    const SearchMovie  = async() => {

        const {data} = await authFetch.get(`/3/search/movie?query=${searchValue}&api_key=${KEY}`);

        setmovie(data.results);
        setpaginationno(data.total_pages)
        console.log(`Popular Movie  ${data.page}   ${data.results}`);
        //console.log(`${movie.at(2).original_title}`)
        console.log(movie)
        console.log(`movie size  ${movie.length}`)
        hideToastMsg(false) 
    }

    const fetchDataQuery = ()=>{
        console.error(`Error show ${searchValue}`)
        if(searchValue === ''){
            hideToastMsg(true) 
        } else {
            SearchMovie();
        }
    }

    const showAlert = ({msg})=>{
        return (
            <Alert>
                {msg}
            </Alert>
        )
    }


    useEffect(() =>{
        PopularMovie();
       // console.log(`${movie.at(2).original_title}`)
    },[pages])


    return(
        <main className="homePage">
        <Container>
            <Row>
                <Col className="col-12">
                    <section>
                    <h1 className="txtCenter">Popular Movie</h1>

                    {
                        showAlertMsg ? showAlert({msg : "API Error"}) : ""
                    }



                    <SearchComponents 
                                searchValue={searchValue}
                                setSearchValue={(value)=>{setSearchValue(value)}}
                                typeValue={typeValue}
                                setTypeValue={(value)=>{setTypeValue(value)}}
                                filterData={fetchDataQuery} />

                    {

                        showToastMsg  ? showAlert({msg : "Please Enter Text"}) : ""
                    }  

                    </section>
                    
                </Col>

                {
                       movie && movie.length > 0 ? movie.map((item, index) =>{
                        // console.error(item)
                        // //const d = item[index]
                        // console.error(item.original_title)
                        return (
                            <>
                                {/* <h1>{index}</h1>
                                <h1>{item.original_title}</h1>
                                <h1>{index}</h1> */}
                                <CardMovieComponent  key={index} data={item} mediaType="tv"/>
                            </>
                         )
                       }) : "Loading..." 

                }

                {
                    paginationno && paginationno > 1 ? <PaginationComponent  maxnum = {paginationno} activenum={pages} handleClick={handleClick} /> : ''
                }
            </Row>
        </Container>
        </main>
    )
}

export default HomeContainer;