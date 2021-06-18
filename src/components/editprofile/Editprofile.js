import React from 'react';
import Header from '../header/Header';
import '../editprofile/Editprofile.css';
import firebase from 'firebase/app';
import icon from '../../images/user-icon.png'


class Editprofile extends React.Component {
    constructor() {
        super(); 
        this.state = {
            images: [], 
            profileImg: null
        }
    }


    componentDidMount() {
        var storage = firebase.storage();

        // var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}`);

        // var gsReference = storage.refFromURL('gs://myimg-1cc76.appspot.com/a_warhol/book-photo.jpeg');

        this.props.user.images.map((img, idx) => {

            var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${img.name}`);


            gsReference.getDownloadURL()
                .then((url) => {
                    const updatedImages = this.state.images; 
                    // updatedImages.push(url); 
                    updatedImages.push({url: url, name: img.name}); 
                    this.setState({
                        images: updatedImages
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        })

        const gsReference2 = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${this.props.user.profile_img}`);
        gsReference2.getDownloadURL()
            .then((url) => {
                // console.log(url)
                this.setState({
                    profileImg: url
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <>
                <Header {...this.props} user={this.props.user} handleLogout={this.props.handleLogout} />
                <main>
                    <section className="user">
                        {
                            this.props.user.profile_img === "user-icon.png"
                            ? <img src={icon} alt="user icon" />
                            : <img src={this.state.profileImg} alt="user icon" />
                        }
                        <input type="file" name="file" onChange={e => this.props.onChangeHandlerProfile(e)} />
                        <button onClick={e => this.props.handleChangeProfilePic(e)}>Change Profile Image</button>
                        {/* <button>change profile pic</button> */}
                        <h2>{this.props.user.username}</h2>
                        {/* <button>change username</button> */}
                    </section>
                    <section className="images">
                    {
                        this.state.images.map((img, idx) => {
                            return <div className="image-container-edit" key={idx} name={img.name}>
                                    <img src={img.url} />
                                    <button onClick={event => this.props.handleDeleteImage(event)}>Delete</button>
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
    }
}

export default Editprofile
