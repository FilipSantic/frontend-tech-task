import React, { Component } from 'react';

const API = 'http://www.colr.org/json/color/random';

class Header extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        colors1: [],
        colors2: [],
      };
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
  
    render() {
        var colors1 = this.state.colors1;
        var colors2 = this.state.colors2;
    
        return (
          <div class="Header">
            {colors1.map(color1 =>
              <div key={color1.id}>
                {color1.hex}
              </div>
            )}
            {colors2.map(color2 =>
              <div key={color2.id}>
                {color2.hex}
              </div>
            )}
          </div>
        );
    }
  }

export default Header;