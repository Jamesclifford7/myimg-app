import React from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import '../profile/Profile.css';

function Profile(props) {
    console.log(props.images)
    return (
        <>
            <Header {...props} user={props.user} handleLogout={props.handleLogout} />
            <main>
                <section class="user">
                    <img src={props.user.profile_img} alt="user icon" />
                    <h2>username</h2>
                </section>
                <section class="images">

                    {
                        props.images.map((img, idx) => {
                            return <div class="image-container" key={idx}>
                                        <Link to={`/image/${img.id}`}><img src={img.file}  /></Link>
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

export default Profile