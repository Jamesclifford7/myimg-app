import React from 'react'
import Header from '../header/Header'
import '../image/Image.css'

function Image(props) {
    const img = props.images.find(img => img.id == props.match.params.id)
    console.log(props)

    return (
        <>
            <Header user={props.user} handleLogout={event => props.handleLogout(event)}/>
            <main>
                <section class="image">
                    <button onClick={event => props.history.goBack(event)}>Back</button><br/>
                        {
                        <img src={img.file} />
                    }
                </section>
            </main>
            <footer>
                <span>&#169; MyImg 2021</span>
            </footer>
        </>
    )
}

// class Image extends React.Component {

//     backButton = (event) => {
//         event.preventDefault(); 
        
//     }

//     render() {
//         console.log(props)
//         console.log(props.images)
//         const img = props.images.find(img => img.id == props.match.params.id)
//         console.log(img)
//         return (
//                 <>
//                     <Header />
//                     <main>
//                         <section class="image">
//                             <button>Back</button><br/>
//                             {
//                                 <img src={img.file} />
//                             }
//                         </section>
//                     </main>
//                     <footer>
//                         <span>&#169; MyImg 2021</span>
//                     </footer>
//                 </>
//         )
//     }
// }

export default Image
