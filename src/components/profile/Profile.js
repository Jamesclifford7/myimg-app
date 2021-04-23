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

        // var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}`);

        // var gsReference = storage.refFromURL('gs://myimg-1cc76.appspot.com/a_warhol/book-photo.jpeg');


        this.props.user.img_names.map((img_name, idx) => {

            var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${img_name}`);


            gsReference.getDownloadURL()
                .then((url) => {
                    const updatedImages = this.state.images; 
                    updatedImages.push(url); 
                    this.setState({
                        images: updatedImages
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        })

        // gsReference.getDownloadURL()
        //     .then((url) => {
        //         // `url` is the download URL for 'images/stars.jpg'

        //         // This can be downloaded directly:

        //         // var xhr = new XMLHttpRequest();
        //         // xhr.responseType = 'blob';
        //         // xhr.onload = (event) => {
        //         //     var blob = xhr.response;
        //         // };
        //         // xhr.open('GET', url);
        //         // xhr.send();

        //         this.setState({
        //             images: [url]
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    render() {
        console.log(this.state.images)
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
                                        <img src={img} />
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