import React, {Component} from 'react'
import axios from 'axios'
import {BASE_URL} from '../constant'

class AddDrinks extends Component {
    constructor(props) {
        super(props)
        this.somethingElse = null
        this.pushDrinks = this.pushDrinks.bind(this)
    }

    async pushDrinks() {
        try {
            await axios
                .post(
                    `${BASE_URL}drinks`, 
                    {
                        name: this.somethingElse.value
                    },
                    {
                        'Content-Type': 'application/json',
                    }
                )
            this.props.property(this.somethingElse.value);
        }catch (e) {
        }
    }


    render(){
            return(
                 <p>
                     <input 
                        ref={qwe => this.somethingElse = qwe}/>
                     <button 
                        onClick={this.pushDrinks}>
                        React is Awesome
                     </button>
                 </p>

        )
    }
}

export default AddDrinks;