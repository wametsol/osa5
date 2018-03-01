import React from 'react'
import PropTypes from 'prop-types'

class Toggleblog extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <a className="togglableBlog"onClick={this.toggleVisibility}>{this.props.buttonLabel}</a>
          </div>
          <div style={showWhenVisible} className="togglableContent">
            <a onClick={this.toggleVisibility}>{this.props.buttonLabel}
            
            </a>
            {this.props.children}
          </div>
        </div>
      )
    }
  }
  Toggleblog.propTypes = {
    buttonLabel: PropTypes.object.isRequired
  }
  export default Toggleblog