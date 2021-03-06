import React, {Component} from 'react'
import AddDrinks from './add-drinks'
import axios from 'axios'
import {BASE_URL} from './constant'
import './drinks.css'

class Drinks extends Component{


    state = {
        drinks:[],
        current: null
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

    setCurrentDrinks = id => {
        console.log(id);
        this.setState({
            current: id
        })
    }

    handleEditDrinks = event => {
        const { keyCode: key } = event;
        // if Escape is pressed (27)
        if (key === 27) {
            this.setState({
                current: null
            })
        } else if (key === 13) {
            console.log(event.target.value)
            this.saveDrinks({
                id: this.state.current,
                name: event.target.value
            })
        }
        // if Enter is pressed (13)
    }

    renderDrinks = () => {
        return this
            .state
            .drinks
            .map((drinks, key) => 
                <p key={key} className='drink__item'>
                    <span>
                        {
                            this.state.current !== drinks.id && 
                            <span>{drinks.name}</span>
                        }
                        {
                            this.state.current === drinks.id &&
                            <input 
                                type="text" 
                                defaultValue={drinks.name} 
                                onKeyDown={this.handleEditDrinks}
                                autoFocus />
                            }
                            </span>
                  <button
                        onClick={() => this.deleteDrinks(drinks.id)}>
                        &times;
                  </button>
                  <button
                        onClick={() => this.setCurrentDrinks(drinks.id)}>
                  Edit</button>
                </p>
            )
    }

    async saveDrinks(drinksObject) {
        console.log(`Drink with id "${drinksObject.id}" has been saved`)
        console.log(drinksObject.id)
        await axios.put(`${BASE_URL}drinks/${drinksObject.id}`, {
            //'Content-Type': 'application/json',
            ...drinksObject
            //method: 'PUT'
        }).then(result => {
            //remove the drink from state
            this.setState({
                drinks: this.state.drinks
                          .map(drinks => drinks.id !== drinksObject.id ? 
                            // if it's not the id, return the same object
                              drinks :
                            // if it's the one to be updated, return the new object with the 
                            drinksObject
                        )
            });
            this.setState({
                current: null
            })
        })
        // if(confirm('any')) {
        // }
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