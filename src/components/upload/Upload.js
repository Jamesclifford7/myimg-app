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
    };

    changeLoad = (event) => {
        event.preventDefault(); 
        this.setState({
            isLoading: true
        })
    };

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
    };
};

export default Upload;
