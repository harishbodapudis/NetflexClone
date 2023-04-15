import {Switch, Redirect, Route, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'
import Account from './Components/Account'
import MovieDetails from './Components/MovieDetails'
import Popular from './Components/Popular'
import Search from './Components/Search'
import NotFoundPage from './Components/NotFoundPage'
import ProtectedRoute from './Components/ProtectedRoute'

import ContextValues from './context/ContextValues'

import './App.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class App extends Component {
  state = {
    menu: false,
    searchVal: '',
    searchMovies: [],
    userName: '',
    password: '',
    detailsStatus: '',
    searchWord: '',
    status: apiStatus.initial,
  }

  updateUsername = e => {
    this.setState({userName: e.target.value})
  }

  updatePassword = e => {
    this.setState({password: e.target.value})
  }

  setCookie = data => {
    console.log(data, this.props, 'props..')
    const {history} = this.props
    Cookies.set('jwt_token', data.jwt_token, {
      expires: 30,
      path: '/',
    })
    this.setState({detailsStatus: '', userName: '', password: ''})
    history.replace('/')
  }

  sendUserDetails = async (username, password) => {
    console.log(username, password, 'sendUser')

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const req = await fetch(url, options)
    const data = await req.json()
    if (req.ok) {
      console.log('success +++ ++')
      this.setCookie(data)
    } else {
      this.setState({detailsStatus: data.error_msg})
    }
  }

  checkDetails = e => {
    e.preventDefault()
    const {userName, password} = this.state
    console.log(userName, password, 'checkdetails')
    Cookies.set('user_name', userName, {
      expires: 30,
      path: '/',
    })
    Cookies.set('user_password', password, {
      expires: 30,
      path: '/',
    })
    this.sendUserDetails(userName, password)
  }

  openMenu = () => {
    this.setState({menu: true})
  }

  closeMenu = () => {
    this.setState({menu: false})
  }

  updateSearchVal = event => {
    this.setState({searchVal: event.target.value})
  }

  setSearchVal = async () => {
    const {searchVal} = this.state
    this.setState({searchWord: searchVal})
    if (searchVal) {
      console.log('.......in set state func..........')
      this.setState({status: apiStatus.loading})
      const token = Cookies.get('jwt_token')
      try {
        const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchVal}`
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await fetch(url, options)

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          const searchMoviesList = data.results.map(item => ({
            id: item.id,
            posterPath: item.poster_path,
            title: item.title,
            backdropPath: item.backdrop_path,
          }))

          this.setState({searchMovies: [...searchMoviesList]})
          this.setState({status: apiStatus.success, searchVal: ''})
        } else {
          this.setState({status: apiStatus.failure})
        }
      } catch (e) {
        this.setState({status: apiStatus.failure})
      }
    } else {
      this.setState({searchMovies: []})
      this.setState({status: apiStatus.initial})
    }
  }

  render() {
    const {
      menu,
      searchVal,
      searchMovies,
      userName,
      password,
      detailsStatus,
      searchWord,
      status,
    } = this.state
    return (
      <ContextValues.Provider
        value={{
          menu,
          searchVal,
          searchMovies,
          userName,
          password,
          detailsStatus,
          searchWord,
          status,
          openMenu: this.openMenu,
          closeMenu: this.closeMenu,
          updateSearchVal: this.updateSearchVal,
          setSearchVal: this.setSearchVal,
          updateUsername: this.updateUsername,
          updatePassword: this.updatePassword,
          checkDetails: this.checkDetails,
          sendUserDetails: this.sendUserDetails,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route path="/not-found" component={NotFoundPage} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextValues.Provider>
    )
  }
}

export default withRouter(App)
