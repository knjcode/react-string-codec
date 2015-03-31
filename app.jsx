import React from 'react';
import {encoder, decoder, ENC_ALGOS, DEC_ALGOS} from 'string-codec';
ENC_ALGOS = ENC_ALGOS.concat(['md5','sha1','sha224','sha256','sha384','sha512','rmd160']);

var Codec = React.createClass({
  render() {
    return (
      <ul style={style.list}>
        {this.props.algos.map((algo => {
          try {
            var output = this.props.func(this.props.str,algo)
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
        <div>
        <div style={style.float}>
          <div>encode text</div>
          <Codec algos={ENC_ALGOS} func={encoder} str={this.state.value} />
        </div>
        <div style={style.float}>
          <div>decode text</div>
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
    width: 300
  },
  list: {
    fontSize: '80%',
    margin: 0,
    padding: 0
  }
};

React.render( <StringCodecWebIF />, document.body );
