import React from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import '../profile/Profile.css';
import firebase from "firebase/app";
// import 'firebase/storage'; 

class Profile extends React.Component {
    constructor() {
        super(); 
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        var storage = firebase.storage(); 

        this.props.user.images.map((img) => {
            var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${img.name}`);
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
        })
    }


    render() {
        return (
            <>
                <Header {...this.props} user={this.props.user} handleLogout={this.props.handleLogout} />
                <main>
                    <section className="user">
                        <img src={this.props.user.profile_img} alt="user icon" />
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

                        {/* <div className="image-container" >
                            {/* <img src={this.state.images[0]}  /> }
                            {/* <img src="https://firebasestorage.googleapis.com/v0/b/myimg-1cc76.appspot.com/o/a_warhol%2Fbook-photo.jpeg?alt=media&token=769f6419-7789-41b2-a1a7-b0d83ffb2653"  /> }
                            <img src={this.state.image} />
                        </div> */}


                        {/* {
                            this.props.images.map((img, idx) => {
                                return <div className="image-container" key={idx}>
                                            <Link to={`/image/${img.id}`}><img src={img.file}  /></Link>
                                        </div>
                            }).reverse()
                        } */}
                    </section>
                </main>
                <footer>
                    <span>&#169; MyImg 2021</span>
                </footer>
            </>    
        )
    }
}

export default Profile