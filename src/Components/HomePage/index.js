import {Component} from 'react'
import {RiAlertFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import Footer from '../Footer'
import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {
    trending: [],
    poster: '',
    currentPage: 'HOME',
    status: apiStatus.initial,
  }

  componentDidMount() {
    const token = Cookies.get('jwt_token')
    this.getTrendingMovies(token)
  }

  getTrendingMovies = async token => {
    this.setState({status: apiStatus.loading})
    console.log('hero')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        console.log(data)
        const newData = data.results

        const trendingData = newData.map(obj => ({
          backdropPath: obj.backdrop_path,
          id: obj.id,
          overview: obj.overview,
          posterPath: obj.poster_path,
          title: obj.title,
        }))

        // console.log(trendingData.length)
        const randomIndex = Math.floor(Math.random() * trendingData.length)
        // console.log(randomIndex)
        const poster = trendingData[randomIndex]
        this.setState({
          poster,
          trending: [...trendingData],
          status: apiStatus.success,
        })
      } else {
        this.setState({status: apiStatus.failure})
      }
    } catch (e) {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccess = () => {
    const {poster} = this.state
    const {title, overview} = poster
    const bgImage = {
      backgroundImage: `linear-gradient(to bottom,transparent,rgba(0, 0, 0, 1)),url(${poster.backdropPath})`,
      backgroundPosition: 'center',
      backgroundPositionY: `${15}%`,
      backgroundSize: 'cover',
      padding: '0px',
    }
    return (
      <div style={bgImage} className="home-display-img-box">
        <div className="display-poster-details">
          <h1 className="display-title-data" key={title}>
            {title}
          </h1>
          <h1 className="display-overview-data" key={overview}>
            {overview}
          </h1>
          <button type="button" className="play-btn">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="home-failure-loading-bgImg-container">
      <img
        src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1681031102/alert-triangle_bive9d.png"
        alt="failure view"
        className="alert"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="alert-btn"
        onClick={this.getTrendingMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="home-failure-loading-bgImg-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderDefault = () => (
    <div className="home-failure-loading-bgImg-container">
      <></>
    </div>
  )

  renderOutput = status => {
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
    const {trending, currentPage, status} = this.state

    return (
      <div className="home-container">
        <Header status={currentPage} />
        {this.renderOutput(status)}
        <div className="body">
          <div>
            <h1 className="body-trending-originals">Trending Now</h1>
            <TrendingNow />
          </div>
          <div>
            <h1 className="body-trending-originals">Originals</h1>
            <Originals />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomePage
