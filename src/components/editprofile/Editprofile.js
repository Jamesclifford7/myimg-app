import React from 'react';
import Header from '../header/Header';
import '../editprofile/Editprofile.css';
import firebase from 'firebase/app';
import icon from '../../images/user-icon.png'
import ReactLoading from 'react-loading';

class Editprofile extends React.Component {
    constructor() {
        super(); 
        this.state = {
            images: [], 
            profileImg: null, 
            isLoading: false
        }
    }

    componentDidMount() {
        var storage = firebase.storage();

        // var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}`);

        // var gsReference = storage.refFromURL('gs://myimg-1cc76.appspot.com/a_warhol/book-photo.jpeg');

        this.props.user.images.map((img, idx) => {

            var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}/${img.name}`);


            return gsReference.getDownloadURL()
                .then((url) => {
                    const updatedImages = this.state.images; 
                    // updatedImages.push(url); 
                    updatedImages.push({url: url, name: img.name, date: img.date}); 
                    return updatedImages

                })
                .then((updatedImages) => {
                    const sortedImages = updatedImages.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date); 
                    }); 
                    this.setState({
                        images: sortedImages
                    }); 
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

    changeLoad = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }))
    }

    render() {
        return (
            <>
                <Header {...this.props} user={this.props.user} handleLogout={this.props.handleLogout} />
                <main>
                    <section className="user">
                        {
                            this.props.user.profile_img === "user-icon.png" ? <><img src={icon} alt="user icon" /><br/></>
                            : this.state.isLoading && this.props.selectedProfileFile !== null ? <ReactLoading className="load-circle" type={"spin"} color={"blue"} width={250} height={250} />
                            : <><img src={this.state.profileImg} alt="user icon" /><br/></>
                        }
                        <input type="file" name="file" onChange={e => this.props.onChangeHandlerProfile(e)} />
                        <button onClick={(e) => {this.props.handleChangeProfilePic(e); this.changeLoad(e)}}>Change Profile Image</button>
                        <h2>{this.props.user.username}</h2>
                    </section>
                    <section className="images">
                    {
                        this.state.images.map((img, idx) => {
                            return <div className="image-container-edit" key={idx} name={img.name}>
                                    <img src={img.url} alt="user upload" />
                                    <button onClick={event => this.props.handleDeleteImage(event)}>Delete</button>
                                </div>
                        }).reverse()
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
