import React, {Component} from 'react'


class AddDrinks extends Component {
    constructor() {
        super()
        this.input = null
    }

    handleClick = () => {
        console.log(this.input.value)
    }

    render(){
            return(
                 <p>
                     <input 
                        ref={e => this.input = e}/>
                     <button 
                        onClick={this.handleClick}>
                        React is Awesome
                     </button>
                 </p>

        )
    }
}

export default AddDrinks;