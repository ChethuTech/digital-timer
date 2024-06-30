import {Component} from 'react'
import './index.css'

class DigitiTimer extends Component {
  state = {setTime: 25, isStarted: false, tickingMinutes: 0, tickingSeconds: 0}

  componentDidMount() {
    const {setTime} = this.state
    this.setState({tickingMinutes: setTime})
  }

  reduceTheSetTime = () => {
    const {setTime, isStarted} = this.state
    if (setTime > 1 && !isStarted) {
      this.setState(prevState => ({
        setTime: prevState.setTime - 1,
        tickingMinutes: prevState.setTime - 1,
      }))
    }
  }

  increaseTheSetTime = () => {
    const {isStarted} = this.state
    if (!isStarted) {
      this.setState(prevState => ({
        setTime: prevState.setTime + 1,
        tickingMinutes: prevState.setTime + 1,
      }))
    }
  }

  start = () => {
    const {isStarted} = this.state
    if (!isStarted) {
      this.setState(prevState => ({isStarted: !prevState.isStarted}))
      this.timeIntervalId = setInterval(this.tickingTimer, 1000)
    } else {
      this.setState(prevState => ({isStarted: !prevState.isStarted}))
      clearInterval(this.timeIntervalId)
    }
  }

  onReset = () => {
    this.setState({
      isStarted: false,
      tickingMinutes: 25,
      tickingSeconds: 0,
    })
    clearInterval(this.timeIntervalId)
  }

  tickingTimer = () => {
    const {tickingMinutes} = this.state
    let {tickingSeconds} = this.state
    if (tickingMinutes === 0 && tickingSeconds === 0) {
      clearInterval(this.timeIntervalId)
      this.setState({isStarted: false})
    } else if (tickingMinutes >= 0) {
      if (tickingMinutes === 0 && tickingSeconds === 1) {
        this.setState({tickingSeconds: tickingSeconds - 1})
      } else if (tickingSeconds >= 0) {
        if (tickingMinutes !== 0 && tickingSeconds === 0) {
          tickingSeconds = 60

          this.setState({
            tickingMinutes: tickingMinutes - 1,
            tickingSeconds: tickingSeconds - 1,
          })
        } else if (tickingSeconds !== 0) {
          this.setState({tickingSeconds: tickingSeconds - 1})
        }
      }
    }
  }

  render() {
    const {setTime, isStarted, tickingMinutes, tickingSeconds} = this.state
    const minutes =
      String(tickingMinutes).length !== 1
        ? tickingMinutes
        : String(tickingMinutes).padStart(2, '0')
    const seconds =
      String(tickingSeconds).length !== 1
        ? tickingSeconds
        : String(tickingSeconds).padStart(2, '0')

    return (
      <div className="bg">
        <h1 className="digital-timer">Digital Timer</h1>

        <div className="digital-timer-container">
          <div className="digital-timer-card">
            <div className="digital-timer-card-tick">
              <h1 className="digital-timer-card-tick-time">
                {minutes}:{seconds}
              </h1>

              <p className="digital-timer-card-tick-time-status">
                {isStarted ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>

          <div className="digital-timer-controls">
            <div className="start-pause-reset-container">
              <button
                onClick={this.start}
                type="button"
                className="start-pause-btn"
              >
                {!isStarted ? (
                  <img
                    className="start-pause-btn-img"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                  />
                ) : (
                  <img
                    className="start-pause-btn-img"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                    alt="pause icon"
                  />
                )}
                <p className="start-pause-text">
                  {' '}
                  {isStarted ? 'Pause' : 'Start'}{' '}
                </p>
              </button>

              <button
                onClick={this.onReset}
                type="button"
                className="start-pause-btn"
              >
                <img
                  className="start-pause-btn-img"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                />

                <p className="start-pause-text"> Reset </p>
              </button>
            </div>

            <div className="set-timer-limit-container">
              <p className="set-timer-limit-title"> Set Timer Limit</p>
              <div className="set-timer-card">
                <button
                  onClick={this.reduceTheSetTime}
                  className="plus-and-minus-btn"
                  type="button"
                >
                  -
                </button>

                <p className="set-timer-time"> {setTime} </p>

                <button
                  onClick={this.increaseTheSetTime}
                  className="plus-and-minus-btn"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitiTimer
