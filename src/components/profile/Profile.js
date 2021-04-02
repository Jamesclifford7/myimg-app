import React from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import '../profile/Profile.css';

function Profile(props) {
    console.log(props.images)
    return (
        <>
            <Header />
            <main>
                <section class="user">
                    <img src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" alt="user icon" />
                    <h2>username</h2>
                </section>
                <section class="images">

                    {
                        props.images.map((img, idx) => {
                            return <div class="image-container" key={idx}>
                                        <Link to={`/image/${img.id}`}><img src={img.file}  /></Link>
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

export default Profile