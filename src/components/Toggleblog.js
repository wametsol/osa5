import React from 'react'

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
            <a onClick={this.toggleVisibility}>{this.props.buttonLabel}</a>
          </div>
          <div style={showWhenVisible}>
            <a onClick={this.toggleVisibility}>{this.props.buttonLabel}
            
            </a>
            {this.props.children}
          </div>
        </div>
      )
    }
  }
  export default Toggleblog