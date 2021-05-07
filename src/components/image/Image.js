import React from 'react'
import Header from '../header/Header'
import '../image/Image.css'
import firebase from 'firebase/app'

class Image extends React.Component {
    constructor() {
        super(); 
        this.state = {
            images: []
        }
    }

    componentDidMount() {
        var storage = firebase.storage();

        // var gsReference = storage.refFromURL(`gs://myimg-1cc76.appspot.com/${this.props.user.username}`);

        // var gsReference = storage.refFromURL('gs://myimg-1cc76.appspot.com/a_warhol/book-photo.jpeg');

        console.log(this.props.user.img_names)

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
    }

    render() {
        console.log(this.state.images, this.props.match.params.name)
        return (
            <>
                <Header user={this.props.user} handleLogout={event => this.props.handleLogout(event)}/>
                <main>
                    <section class="image">
                        <button onClick={event => this.props.history.goBack(event)}>Back</button><br/>
                        {
                            this.state.images.map(img => {
                                // return console.log(img.img_name === this.props.match.params.name)

                                if (img.name == this.props.match.params.name) {
                                    return <img src={img.url} />
                                } 

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

// function Image(props) {
//     const img = props.images.find(img => img.id == props.match.params.id)
//     console.log(props)

//     return (
//         <>
//             <Header user={props.user} handleLogout={event => props.handleLogout(event)}/>
//             <main>
//                 <section class="image">
//                     <button onClick={event => props.history.goBack(event)}>Back</button><br/>
//                     {
//                         <img src={img.file} />
//                     }
//                 </section>
//             </main>
//             <footer>
//                 <span>&#169; MyImg 2021</span>
//             </footer>
//         </>
//     )
// }

export default Image
