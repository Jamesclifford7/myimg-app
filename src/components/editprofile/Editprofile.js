import React from 'react'
import Header from '../header/Header'
import '../editprofile/Editprofile.css'

function Editprofile(props) {
    return (
        <>
            <Header {...props} user={props.user} handleLogout={props.handleLogout} />
            <main>
                <section class="user">
                    <img src={props.user.profile_img} alt="user icon" /><br/>
                    <button>change profile pic</button>
                    <h2>{props.user.username}</h2>
                    <button>change username</button>
                </section>
                <section class="images">
                    {
                        props.images.map((img, idx) => {
                            return <div class="image-container-delete" key={idx}>
                                        <img src={img.file}  />
                                        <button>Delete</button>
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

export default Editprofile

{/* <div class="image-container">
    <img src="https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-1080x720.jpg" />
</div>
<div class="image-container">
    <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80" />
</div>
<div class="image-container">
    <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
</div>
<div class="image-container">
    <img src="https://www.w3schools.com/w3css/img_lights.jpg" />
</div>
<div class="image-container">
    <img src="https://media.istockphoto.com/photos/green-leaf-with-dew-on-dark-nature-background-picture-id1050634172?k=6&m=1050634172&s=612x612&w=0&h=C6CWho9b4RDhCqvaivYOLV2LK6FzygYpAyLPBlF1i2c=" />
</div>
<div class="image-container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" />
</div> */}

