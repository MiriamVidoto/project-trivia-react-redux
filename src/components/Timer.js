import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buttonDisable, restTime } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };

    this.time_limit = 0;
  }

  componentDidMount() {
    const milliseconds = 1000;
    this.timer = setInterval(() => this.tick(), milliseconds);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === this.time_limit) {
      this.pauseTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pauseTimer = () => {
    this.setState({
      seconds: 0,
    });
  }

  tick = () => {
    this.stopRestTick();
    this.setState(
      (prevState) => ({
        seconds: prevState.seconds - 1,
      }),
    );
  };

  stopTick = () => {
    const { seconds } = this.state;
    const secondsLimit = 0;
    if (seconds === secondsLimit) {
      const { disable } = this.props;
      disable(true);
    }
  };

  stopRestTick = () => {
    const { btnDisable, timeRest } = this.props;
    const { seconds } = this.state;
    if (btnDisable) {
      this.setState(
        (prevState) => ({
          seconds: prevState.seconds,
        }), () => timeRest(seconds),
      );
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <span>{`Você tem ${seconds} segundos para responder!`}</span>
      </div>
    );
  }
}

Timer.propTypes = {
  disable: PropTypes.func.isRequired,
  timeRest: PropTypes.func.isRequired,
  btnDisable: PropTypes.bool.isRequired,
  // timeover: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  timeover: state.playReducer.timeover,
  btnDisable: state.playReducer.btnDisable,
});

const mapDispatchToProps = (dispatch) => ({
  disable: (payload) => (dispatch(buttonDisable(payload))),
  timeRest: (payload) => (dispatch(restTime(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
