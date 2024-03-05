import React from "react";
import { img_300, img_not_available } from '../../Config';
import { Link } from "react-router-dom"

const CardMovieComponent = ({ data}) => {

    const id = data.id;
    const ImageURL = data.poster_path ? img_300 + data.poster_path : img_not_available;
    const title = data.original_title || data.name;
    const release_date = data.release_date || data.first_air_date;
    return (
        <>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
                <Link to={`/movies/${id}/`} className='video-thumb' >
                    <figure className="video-image">
                        <span>
                            <img src={ImageURL} alt={title} />
                        </span>
                            <div className="relesedate">Release Date :<b>{release_date}</b></div>
                            <h3 className="moviename">{title}</h3>
                    </figure>
                </Link>

            </div>
        </>
    );
}
export default CardMovieComponent;