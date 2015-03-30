import React from 'react';
import {encoder, ENC_ALGOS} from 'string-codec';
var ALGOS = ENC_ALGOS.concat(['md5','sha1','sha224','sha256','sha384','sha512','rmd160']);

var Encoder = React.createClass({
  render() {
    return (
      <ul style={style.list}>
        {ALGOS.map((algo => {
          try {
            var output = encoder(this.props.str,algo)
            return <li key={algo}><strong>{algo}:</strong> {output ? output : ''}</li>
          } catch(e) {
            return <li key={algo}><strong>{algo}:</strong> {e.toString()}</li>
          }
        }))}
      </ul>
    );
  }
});

var StringCodecWebIF = React.createClass({
  getInitialState() {
    return {value: ''};
  },
  handleChange(event) {
    this.setState({value: event.target.value});
  },
  render() {
    return (
      <div>
        <div>The string-codec web inerface with react</div>
        <input
          type='text'
          style={style.text}
          placeholder='enter string you want to encode'
          onChange={this.handleChange}
          autoFocus={true}
          value={this.state.value} />
        <Encoder str={this.state.value} />
      </div>
    );
  }
});

var style = {
  text: {
    fontSize: '80%',
    width: 300
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
};

React.render( <StringCodecWebIF />, document.body );
