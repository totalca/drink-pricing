import React, {Component} from 'react'
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
          <p>{this.state.drinks.length}</p>
        )
    }
}

export default Drinks;