import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiCall = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class MovieDetails extends Component {
  state = {movieDetails: {}, status: apiCall.initial, movieId: ''}

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.fetchData(id)
  }

  fetchData = async id => {
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`

    this.setState({status: apiCall.loading, movieId: id})
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      this.setState({status: apiCall.loading})
      if (response.ok) {
        const items = data.movie_details
        console.log(items)
        const movieDetails = {
          adult: items.adult,
          backdropPath: items.backdrop_path,
          budget: items.budget,
          genres: items.genres,
          id: items.id,
          overview: items.overview,
          posterPath: items.poster_path,
          releaseData: items.release_date,
          runtime: items.runtime,
          similarMovies: items.similar_movies.map(item => ({
            id: item.id,
            title: item.title,
            backdropPath: item.backdrop_path,
            posterPath: item.poster_path,
          })),
          spokenLanguage: items.spoken_languages.map(item => ({
            id: item.id,
            englishName: item.english_name,
          })),
          title: items.title,
          voteAverage: items.vote_average,
          voteCount: items.vote_count,
        }
        this.setState({movieDetails, status: apiCall.success})
      } else {
        this.setState({status: apiCall.failure})
      }
    } catch (e) {
      this.setState({status: apiCall.failure})
    }
  }

  renderFailure = () => {
    const {movieId} = this.state
    return (
      <div className="movie-details-failure-loading-bgImg-container">
        <img
          src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1680763091/Group_gl7dt2.png"
          alt="failure view"
          className="movie-details-failure-page-img"
        />
        <p className="movie-details-failure-para">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="movie-details-try-again-btn"
          onClick={() => this.fetchData(movieId)}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderLoading = () => (
    <div
      className="movie-details-failure-loading-bgImg-container"
      testid="loader"
    >
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderDefault = () => (
    <div className="movie-details-failure-loading-bgImg-container">
      <></>
    </div>
  )

  renderSuccess = () => {
    const {movieDetails} = this.state
    const time = parseInt(movieDetails.runtime / 60)
    const hours = time
    const minutes = movieDetails.runtime - time * 60
    const date = `${movieDetails.releaseData}`
    const year = date.split('-')
    console.log(movieDetails.similarMovies)

    const bgImge = {
      backgroundImage: `linear-gradient(to bottom,transparent,rgba(0, 0, 0, 1)),url(${movieDetails.posterPath})`,
      backgroundPosition: 'center',
      backgroundPositionY: `${25}%`,
      backgroundSize: `cover`,
      padding: '0px',
      marginTop: 'opx',
    }

    const dateYear = `${year[0]}`
    const dateMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = dateMonths[parseInt(year[1]) - 1]
    let day = parseInt(year[2])
    if (day === 1) {
      day = `${day}st`
    } else if (day === 2) {
      day = `${day}nd`
    } else if (day === 3) {
      day = `${day}rd`
    } else {
      day = `${day}th`
    }

    return (
      <>
        <div style={bgImge} className="movie-details">
          <div className="movie-details-box">
            <h1>{movieDetails.title}</h1>
            <div className="box">
              <p>{`${hours}h ${minutes}m`}</p>
              <p className="adult">{movieDetails.adult ? 'A' : 'U/A'}</p>
              <p>{year[0]}</p>
            </div>
            <p className="description">{movieDetails.overview}</p>
            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        </div>

        <div className="movie-meta-data-container">
          <div className="movie-meta-data">
            <div className="genres-box">
              <h1 className="movie-meta-data-heading">Genres</h1>
              <div className="movie-meta-list">
                {movieDetails.genres &&
                  movieDetails.genres.map(item => (
                    <p key={item.id} className="list-text">
                      {item.name}
                    </p>
                  ))}
              </div>
            </div>

            <div className="audio-box">
              <h1 className="movie-meta-data-heading">Audio Available</h1>
              <div className="movie-meta-list">
                {movieDetails.genres &&
                  movieDetails.spokenLanguage.map(item => (
                    <p key={item.id} className="list-text">
                      {item.englishName}
                    </p>
                  ))}
              </div>
            </div>

            <div className="ratings-box">
              <h1 className="movie-meta-data-heading">Rating Count</h1>
              <p className="text">{movieDetails.voteCount}</p>
              <h1 className="movie-meta-data-heading">Rating Average</h1>
              <p className="text">{movieDetails.voteAverage}</p>
            </div>

            <div className="Budget-release-box">
              <h1 className="movie-meta-data-heading">Budget</h1>
              <p className="text">{movieDetails.budget}</p>
              <h1 className="movie-meta-data-heading">Release Date</h1>
              <p className="text">{`${day} ${month} ${dateYear}`}</p>
            </div>
          </div>
        </div>

        <div className="similar-movies-container">
          <div className="similar-movies-box">
            <h1 className="similar-movies-heading">More like this</h1>
            <ul className="similar-movies">
              {movieDetails.similarMovies &&
                movieDetails.similarMovies.map(item => (
                  <li key={item.id} className="li-movie-item">
                    <img
                      src={item.posterPath}
                      alt={item.title}
                      className="similar-movies-img"
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'LOADING':
        return this.renderLoading()
      default:
        return this.renderDefault()
    }
  }

  render() {
    return (
      <div className="movie-details-container">
        <Header />
        {this.renderOutput()}
        <Footer />
      </div>
    )
  }
}

export default MovieDetails
