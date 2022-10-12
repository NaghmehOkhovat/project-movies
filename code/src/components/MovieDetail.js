/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-tabs */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import backIcon from './left-arrow.svg'
import Loading from './Loading';

const MovieDetail = () => {
  const [movieDetailList, setMovieDetailList] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    // eslint-disable-next-line quotes
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9316509df2a80192a5e837648d693f17&language=en-US`)
      .then((res) => res.json())
      .then((json) => {
        setMovieDetailList(json)
      })
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [id])

  return (
    <article
      className="movie-page"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280${movieDetailList.backdrop_path})` }}>
      {loading === true
        ? <Loading />
        : <>
          <Link className="go-back" to="/"> <img className="back-icon" src={backIcon} alt="Go back" />Movies</Link>
          <div className="movie-detail-info">
            <img className="movie-poster" src={`http://image.tmdb.org/t/p/w342${movieDetailList.poster_path}`} alt={movieDetailList.original_title} />
            <div className="movie-info">
              <div className="rated-title">
                <h2>{movieDetailList.title} </h2>
                <p className="rating">⭐️ {Number(movieDetailList.vote_average).toFixed(1)}</p>
              </div>
              <p>{movieDetailList.overview}</p>
            </div>
          </div>
        </>}
    </article>

  )
}

export default MovieDetail;