import React, { Component } from 'react';
import './Header.css';

const API = 'http://www.colr.org/json/color/random';

class Header extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        colors1: [],
        colors2: [],
        randomColor: [],
        blackColor: '#000000',
        isToggleOn: true,
        value: '',
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleColor = this.handleColor.bind(this);
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
        setTimeout(function() {
          this.handleColor();
        }.bind(this), 1000)
    }

    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    handleColor() {
      const { colors1 } = this.state;
      const { colors2 } = this.state;

      const colors = [
        colors1.map(color1 => color1.hex),
        colors2.map(color2 => color2.hex)
      ]

      const randomColor = '#' + colors[Math.floor(Math.random()*colors.length)];

      this.setState({randomColor: randomColor});
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
        return (
          <div class="Header">
            <div>
              Click on the button below to change the color:
            </div>
            <div>
            <button className="Button" style={{backgroundColor: this.state.isToggleOn ? this.state.randomColor : this.state.blackColor}} onClick={this.handleClick}>
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