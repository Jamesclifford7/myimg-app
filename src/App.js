import React from 'react'; 
import './App.css';
import { Route, withRouter } from 'react-router-dom'; 
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Image from './components/image/Image';
import Editprofile from './components/editprofile/Editprofile';
import Upload from './components/upload/Upload';
import user from './user';
import user_images from './user_images'

class App extends React.Component {
  constructor() {
    super(); 
    this.state = {
      user: {}, 
      images: []
    }
  }

  handleLogin = (event) => {
    event.preventDefault(); 
    // retrieve user info and validate it
    const input = event.target.input.value; 
    const password = event.target.password.value;
    if ((input === user.email || input === user.username) && password === user.password) {
      this.setState({
        user: user, 
        images: user_images
      }); 
      this.props.history.push('/profile');
    } else {
      alert('username/password not found');
    }; 
  }


  render() {
    return (
      <div className="App">
          <Route 
          exact path="/"
          component={Landing}/>
          <Route 
          path="/login"
          render={(props) => (
            <Login {...props} handleLogin={this.handleLogin} />
          )}/>
          <Route 
          path="/profile"
          render={(props) => (
            <Profile {...props} images={this.state.images} user={this.state.user} />
          )}/>
          <Route 
          path="/image/:id"
          render={(props) => (
            <Image {...props} images={this.state.images} user={this.state.user} />
          )}/>
          <Route 
          path="/editprofile"
          render={(props) => (
            <Editprofile {...props} images={this.state.images} user={this.state.user} />
          )}/>
          <Route 
          path="/upload"
          render={(props) => (
            <Upload {...props} images={this.state.images} user={this.state.user} />
          )}/>
      </div>
    );
  }
}

export default withRouter(App);
