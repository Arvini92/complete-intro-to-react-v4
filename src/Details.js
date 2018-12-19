import React from 'react';
import pf from 'petfinder-client';
import { navigate } from '@reach/router';
import Carousel from './Carousel';
import Modal from './Modal';

const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
})

class Details extends React.Component {
   
    state = {
        loading: true,
        showModal: true
    };

    toggleModel = () => this.setState({showModal: !this.state.showModal });
    
    componentDidMount () {
        petfinder.pet.get({
            output: "full",
            id: this.props.id
        }).then(data => {
            const pet = data.petfinder.pet;
            let breed;
            if(Array.isArray(pet.breeds.breed)) {
                breed = pet.breeds.breed.join(', ');
            } else {
                breed = pet.breeds.breed;
            }

            this.setState({
                name: pet.name,
                animal: pet.animal,
                location: `${pet.contact.city}, ${pet.contact.state}`,
                description: pet.description,
                media: pet.media,
                breed,
                loading: false
            });
        }).catch(() => {
            navigate("/");
        });
    }
    render () {
        if(this.state.loading) {
            return <h1>loading ...</h1>
        }

        const { animal, breed, location, description, media, showModal } = this.state;
        // let modal;
        // if(showModal) {
        //     modal = <Modal />
        // } else {
        //     modal = null; 
        // }

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1 href={(el) => this.myH1 = el}>{name}</h1>
                    <h2>{animal} - {breed} - {location}</h2>
                    <button onClick={this.toggleModel}>Adopt {name}</button>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <h1>Would you like to adopt {name} ?</h1>
                                <div className="buttons">
                                    <button onClick={this.toggleModel}>Yes</button>
                                    <button onClick={this.toggleModel}>Definitly Yes</button>
                                </div>
                            </Modal>
                        ) : null
                        // modal
                    }
                </div>
            </div>
        )
    }
}

export default Details;