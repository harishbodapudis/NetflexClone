import {Component} from 'react'
import {Link} from 'react-router-dom'
import {RiAlertFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Originals extends Component {
  state = {originals: [], status: apiStatus.initial}

  componentDidMount() {
    this.fetchOriginals()
  }

  renderSuccess = () => {
    const {originals} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }

    return (
      <div className="slide-container">
        {originals && (
          <Slider {...settings}>
            {originals.map(item => (
              <li key={item.id} className="slick-item">
                <Link to={`/movies/${item.id}`}>
                  <img
                    src={item.posterPath}
                    alt={item.title}
                    className="original-poster"
                  />
                </Link>
              </li>
            ))}
          </Slider>
        )}
      </div>
    )
  }

  renderFailure = () => (
    <div className="originals-failure-view">
      <div className="originals-failure-box">
        <img
          src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1681031102/alert-triangle_bive9d.png"
          alt="failure view"
          className="alert"
        />
        <p className="org-failure-para">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="org-alert-btn"
          onClick={this.fetchOriginals}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <div className="originals-failure-view">
      <div className="originals-failure-box" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderDefault = () => (
    <div className="originals-failure-view">
      <div className="originals-failure-box">
        <></>
      </div>
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

  fetchOriginals = async () => {
    this.setState({status: apiStatus.loading})

    const token = Cookies.get('jwt_token')
    console.log(token)
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
        const originalData = data.results.map(item => ({
          id: item.id,
          overview: item.overview,
          posterPath: item.poster_path,
          title: item.title,
          backdropPath: item.backdrop_path,
        }))
        this.setState({originals: originalData, status: apiStatus.success})
      } else {
        this.setState({status: apiStatus.failure})
      }
    } catch (e) {
      this.setState({status: apiStatus.loading})
    }
  }

  render() {
    const {originals, status} = this.state

    return <>{this.renderOutput(status)}</>
  }
}

export default Originals
