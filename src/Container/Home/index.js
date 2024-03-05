import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardMovieComponent from "../../Components/CardMovies";
import PaginationComponent from "../../Components/Pagination";
import SearchComponents from "../../Components/Search";
import Alert from 'react-bootstrap/Alert';
import authFetch from "../../Helper";

const HomeContainer = () => {

    const KEY = process.env.REACT_APP_API_KEY

    const [movie, setmovie] = useState([]);
    const [pages, setpage] = useState(1);

    const [paginationno, setpaginationno] = useState(0);

    const [searchValue, setSearchValue] = useState('');
    const [typeValue, setTypeValue] = useState('movie');
    const [showAlertMsg, hideAlertMsg] = useState(false);
    const [showToastMsg, hideToastMsg] = useState(false);

    const PopularMovie = async () => {
        try {
            const { data } = await authFetch.get(`/3/movie/popular?language=en-US&page=${pages}`);
            setmovie([]);
            setpaginationno(0);
            setmovie(data.results);
            setpaginationno(data.total_pages)
            hideAlertMsg(false);
        } catch (error) {
            hideAlertMsg(true);
        }
    }

    const handleClick = (number) => {
        setpage(number);
    }

    const SearchMovie = async () => {
        const { data } = await authFetch.get(`/3/search/movie?query=${searchValue}&api_key=${KEY}`);

        setmovie(data.results);
        setpaginationno(data.total_pages)
        hideToastMsg(false)
    }

    const fetchDataQuery = () => {
        if (searchValue === '') {
            hideToastMsg(true)
        } else {
            SearchMovie();
        }
    }

    const showAlert = ({ msg }) => {
        return (
            <Alert>
                {msg}
            </Alert>
        )
    }

    useEffect(() => {
        PopularMovie();
    }, [pages])


    return (
        <main className="homePage">
            <Container>
                <Row>
                    <Col className="col-12">
                        <section>
                            <h1 className="txtCenter">Popular Movie</h1>

                            {
                                showAlertMsg ? showAlert({ msg: "API Error" }) : ""
                            }

                            <SearchComponents
                                searchValue={searchValue}
                                setSearchValue={(value) => { setSearchValue(value) }}
                                typeValue={typeValue}
                                setTypeValue={(value) => { setTypeValue(value) }}
                                filterData={fetchDataQuery} />

                            {
                                showToastMsg ? showAlert({ msg: "Please Enter Text" }) : ""
                            }

                        </section>

                    </Col>

                    {
                        movie && movie.length > 0 ? movie.map((item, index) => {
                            return (
                                <>
                                    <CardMovieComponent key={index} data={item} />
                                </>
                            )
                        }) : "No Data Found"
                    }
                    {
                        paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pages} handleClick={handleClick} /> : ''
                    }
                </Row>
            </Container>
        </main>
    )
}

export default HomeContainer;