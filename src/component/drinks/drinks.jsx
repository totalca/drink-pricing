import React, {Component} from 'react'
import AddDrinks from './add-drinks'
import axios from 'axios'
import {BASE_URL} from './constant'
//const BASE_URL = 'http://localhost:3456/'

class Drinks extends Component{


    state = {
        drinks:[]
    }

    async getDrinks() {
        let {data} = await axios.get(`${BASE_URL}drinks`)
        this.setState({drinks: data})
      }


    componentDidMount(){
        this.getDrinks()
    }

    addDrinksToState = (something) => {
        console.log(`React is Ultra ${something}`)
        this.setState({
            drinks: [...this.state.drinks, {
                name: something,
                id: ++this.newMethod().drinks.length
            }]
        })
    }

    newMethod() {
        return this.state;
    }

    renderDrinks = () => {
        return this
            .state
            .drinks
            .map((drinks, key) => 
                <p key={key}>{drinks.name}</p>
            )
    }


    render(){
        return(
            <div>
                <div>{this.renderDrinks()}</div>
                <AddDrinks 
                    anyname={this.addDrinksToState} />
            </div>
        )
    }
}

export default Drinks;