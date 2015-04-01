import React from 'react';
import {encoder, decoder, ENC_ALGOS, DEC_ALGOS} from 'string-codec';
ENC_ALGOS = ENC_ALGOS.concat(['md5','rmd160','sha1','sha224','sha256','sha384','sha512']);

var Codec = React.createClass({
  render() {
    return (
      <ul style={style.list}>
        {this.props.algos.map( algo => {
          try {
            var output = this.props.func(this.props.str,algo);
            return <li key={algo}><strong>{algo}:</strong> {output ? output : ''}</li>;
          } catch(e) {
            return <li key={algo}><strong>{algo}:</strong> {e.toString()}</li>;
          }
        })}
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
        <div>The string-codec web inerface with react, browserify, and babelify.</div>
        <input
          type='text' style={style.text} autoFocus={true}
          placeholder='enter text you want to encode or decode'
          onChange={this.handleChange} value={this.state.value} />
        <div>
          <div style={style.float}>
            <div style={style.head}>encode</div>
            <Codec algos={ENC_ALGOS} func={encoder} str={this.state.value} />
          </div>
          <div style={style.float}>
            <div style={style.head}>decode</div>
            <Codec algos={DEC_ALGOS} func={decoder} str={this.state.value} />
          </div>
        </div>
      </div>
    );
  }
});

var style = {
  float: {
    float: 'left',
    width: '50%'
  },
  text: {
    fontSize: '80%',
    width: 600
  },
  head: {
    textDecoration: 'underline'
  },
  list: {
    margin: 0,
    padding: 0,
    fontSize: '80%',
    listStyleType: 'none'
  }
};

React.render(<StringCodecWebIF />, document.body);
