import React from 'react'; 
import Header from '../header/Header';
import '../upload/Upload.css'; 
import ReactLoading from 'react-loading';

class Upload extends React.Component {
    constructor() {
        super(); 
        this.state = {
            isLoading: false
        }
    }

    changeLoad = (event) => {
        event.preventDefault(); 
        this.setState({
            isLoading: true
        })
    }

    // need to move handleUpload from App.js to here in order for loading bar to work

    // onChangeHandler = (event) => {
    //     // this.setState({
    //     //   selectedFile: URL.createObjectURL(event.target.files[0]), 
    //     // });
    //     const file = event.target.files[0]; 
    //     console.log(file)
    //     this.setState({
    //       selectedFile: file
    //     })
    //   }

    // handleUpload = (event) => {
    //     event.preventDefault(); 
    //     const file = this.state.selectedFile;
    //     const fileName = file.name;
    //     // const folder = toString(this.props.user.id); 
    //     console.log(this.state.user.username)
    //     // create a root reference
    //     var storageRef = firebase.storage().ref();

    //     // create a reference to the image

    //     var imgRef = storageRef.child(`${this.props.user.username}/${file.name}`); 

    //     imgRef.put(file)    
    //     .then(snapshot => {
    //         console.log('uploaded')
    //     })
    //     .then(() => {
    //             // need to push file name to array in this.state.user

    //         const dateUploaded = new Date(); 

    //         const newImg = {
    //         name: fileName,
    //         dateAdded: dateUploaded
    //         }; 

    //         const updatedUser = this.state.user; 

    //         updatedUser.images.push(newImg); 

    //         this.setState({
    //         user: updatedUser
    //         }); 
    //     })
    //     .then(() => {
    //         this.props.history.push(`/profile/${this.state.user.username}`);
    //     })
    // }

    render() {
        return (
            <>
                <Header {...this.props} user={this.props.user} handleLogout={event => this.props.handleLogout(event)} />
                <main>
                    <section class="upload">
                        <h1>Upload New Image</h1>
                        <img src="https://image.flaticon.com/icons/png/512/23/23714.png" /><br/>
                            <input type="file" name="file" onChange={this.props.onChangeHandler} />
                            <button onClick={(e) => {this.props.handleUpload(e); this.changeLoad(e)}}>Upload</button>
                        {/* <form onSubmit={event => props.handleUpload(event)}>
                            <input type="file" id="profileImg" />
                            <input type="submit" />
                        </form> */}
                        {
                            this.state.isLoading === true
                            ? <ReactLoading className="load-circle" type={"spin"} color={"blue"} width={250} height={250} />
                            : null
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

export default Upload;
