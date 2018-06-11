import React, { Component } from 'react';
import './Header.css';

const API = 'http://www.colr.org/json/color/random';

class Header extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        colors1: [],
        colors2: [],
        isToggleOn: true,
        value: '',
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount() {
        Promise.all([
            fetch(API),
            fetch(API)
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
            colors1: data1.colors,
            colors2: data2.colors
        }));
    }

    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
        const { colors1 } = this.state;
        const { colors2 } = this.state;

        const colors = [
          colors1.map(color1 => color1.hex),
          colors2.map(color2 => color2.hex)
        ]

        const randomColor = '#' + colors[Math.floor(Math.random()*colors.length)];
        const blackColor = '#000000';
    
        return (
          <div class="Header">
            <div>
              Click on the button below to change it's color.
            </div>
            <div>
            <button className="Button" style={{backgroundColor: this.state.isToggleOn ? randomColor : blackColor}} onClick={this.handleClick}>
            {this.state.value}
            </button>
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <label className="Form">
                  Change the button text:
                  <input className="Form" type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
              </form>
            </div>
          </div>
        );
    }
}

export default Header;