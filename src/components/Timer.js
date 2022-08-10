import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonDisable } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const milliseconds = 1000;
    this.timer = setInterval(() => this.tick(), milliseconds);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1,
    }), () => this.stopTick());
  }

  stopTick = () => {
    const { seconds } = this.state;
    const secondsLimit = 0;
    if (seconds === secondsLimit) {
      const { disable } = this.props;
      disable(true);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <span>{ `Você tem ${seconds} segundos para responder!` }</span>
      </div>
    );
  }
}

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timeover: state.playReducer.timeover,
});

const mapDispatchToProps = (dispatch) => ({
  disable: (payload) => (dispatch(buttonDisable(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);