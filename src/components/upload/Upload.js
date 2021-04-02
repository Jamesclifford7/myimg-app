import React from 'react'; 
import Header from '../header/Header';
import '../upload/Upload.css'; 

function Upload() {
    return (
        <>
            <Header />
            <main>
                <section class="upload">
                    <h1>Upload New Image</h1>
                    <img src="https://image.flaticon.com/icons/png/512/23/23714.png" /><br/>
                    <button>Choose File</button>
                </section>
            </main>
            <footer>
                <span>&#169; MyImg 2021</span>
            </footer>
        </>
    )
}

export default Upload