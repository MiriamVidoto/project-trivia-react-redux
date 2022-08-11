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
    const { btnDisable, timeRest } = this.props;
    if (btnDisable || prevState.seconds === this.time_limit) {
      timeRest(prevState.seconds);
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    const { seconds } = this.state;
    if (seconds === this.time_limit) {
      const { disable } = this.props;
      disable(true);
      this.setState({
        seconds: 0,
      });
    } else {
      this.setState(
        (prevState) => ({
          seconds: prevState.seconds - 1,
        }),
      );
    }
  };

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
  btnDisable: state.player.btnDisable,
  timeover: state.player.timeover,
});

const mapDispatchToProps = (dispatch) => ({
  disable: (payload) => (dispatch(buttonDisable(payload))),
  timeRest: (payload) => (dispatch(restTime(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
