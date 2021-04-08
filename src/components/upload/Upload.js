import React from 'react'; 
import Header from '../header/Header';
import '../upload/Upload.css'; 

function Upload(props) {
    return (
        <>
            <Header {...props} user={props.user} handleLogout={event => props.handleLogout(event)} />
            <main>
                <section class="upload">
                    <h1>Upload New Image</h1>
                    <img src="https://image.flaticon.com/icons/png/512/23/23714.png" /><br/>
                        <input type="file" name="file" onChange={props.onChangeHandler} />
                        <button onClick={e => props.handleUpload(e)}>Upload</button>
                    {/* <form onSubmit={event => props.handleUpload(event)}>
                        <input type="file" id="profileImg" />
                        <input type="submit" />
                    </form> */}
                </section>
            </main>
            <footer>
                <span>&#169; MyImg 2021</span>
            </footer>
        </>
    )
}; 

export default Upload;

{/* <section class="upload">
    <h1>Upload New Image</h1>
    <img src="https://image.flaticon.com/icons/png/512/23/23714.png" /><br/>
    <button>Choose File</button>
</section> */}