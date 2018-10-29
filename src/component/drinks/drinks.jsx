import React, {Component} from 'react'
import AddDrinks from './add-drinks'
import axios from 'axios'

const BASE_URL = 'http://localhost:3456/'

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


    render(){
        return(
            [
            <div>{this.state.drinks.map(drinks => drinks.name)}</div>,
            <AddDrinks />
        ]
        )
    }
}

export default Drinks;