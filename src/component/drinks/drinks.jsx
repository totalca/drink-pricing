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
        // if(confirm('any')) {
        // }
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