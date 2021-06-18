import React from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import '../profile/Profile.css';
import firebase from 'firebase/app';
import icon from '../../images/user-icon.png'
// import 'firebase/storage'; 

class Profile extends React.Component {
    constructor() {
        super(); 
        this.state = {
            images: [], 
            profileImg: null
        }; 
    }; 

    componentDidMount() {
        const storage = firebase.storage(); 

        // retrieving user images
        this.props.user.images.map((img) => {
            const gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${img.name}`);
            
            gsReference.getDownloadURL()
                .then((url) => {
                    const updatedImages = this.state.images;
                    updatedImages.push({url: url, name: img.name, dateAdded: img.dateAdded}); 
                    return updatedImages
                })
                .then((updatedImages) => {
                    this.setState({
                        images: updatedImages
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }); 

        // retrieving user profile img for regular login
        const gsReference2 = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${this.props.user.profile_img}`);
        gsReference2.getDownloadURL()
            .then((url) => {
                this.setState({
                    profileImg: url
                }); 
            })
            .catch((error) => {
                console.log(error)
            }); 

    }; 

    componentDidUpdate(prevProps) {
        // retrieving user profile img for updated profile img

        if (prevProps.user.profile_img !== this.props.user.profile_img) {
            const storage = firebase.storage(); 

            const gsReference2 = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${this.props.user.profile_img}`);
            gsReference2.getDownloadURL()
                .then((url) => {
                    this.setState({
                        profileImg: url
                    }); 
                })
                .catch((error) => {
                    console.log(error)
                }); 
        }
    }; 

    render() {
        return (
            <>
                <Header {...this.props} user={this.props.user} handleLogout={this.props.handleLogout} />
                <main>
                    <section className="user">
                        {/* <img src={this.state.profileImg} alt="user icon" /> */}
                        {
                            this.props.user.profile_img === "user-icon.png"
                            ? <img src={icon} alt="user icon" />
                            : <img src={this.state.profileImg} alt="user icon" />
                        }
                        {/* <img src={icon} alt="user icon" /> */}
                        <h2>{this.props.user.username}</h2>
                    </section>
                    <section className="images">
                        {
                            this.state.images.map((img, idx) => {
                                return <div className="image-container" key={idx}>
                                        <Link to={`/image/${img.name}`}><img src={img.url} /></Link>
                                    </div>
                            })
                        }
                    </section>
                </main>
                <footer>
                    <span>&#169; MyImg 2021</span>
                </footer>
            </>    
        )
    }; 
}

export default Profile