import React, {Component} from 'react'
import AddDrinks from './add-drinks'
import axios from 'axios'
import {BASE_URL} from './constant'
import './drinks.css'

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

    addDrinksToState = something => {
        console.log(`React is Ultra ${something}`)
        this.setState({
            drinks: [...this.state.drinks, {
                name: something,
                id: this.state.drinks.length +1
            }]
        })
        console.log(this.state.drinks)
    }

    renderDrinks = () => {
        return this
            .state
            .drinks
            .map((drinks, key) => 
                <p key={key} className='drink__item'>
                    <span>{drinks.name}</span>
                    <button
                        onClick={() => this.deleteDrinks(drinks.id)}>
                        &times;
                    </button>
                  <button>Edit</button>
                </p>
            )
    }

    async deleteDrinks(id) {
        console.log(`Drink with id "${id}" has been deleted`)
        await axios.delete(`${BASE_URL}drinks/${id}`, {
            'Content-Type': 'application/json',
            //method: 'DELETE'
        }).then(result => {
            //remove the drink from state
            this.setState({
                drinks: this.state.drinks
                          .filter(drinks => drinks.id !== id)
            });
        })
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