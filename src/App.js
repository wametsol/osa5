import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: ''
    }
  }
  

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
     
      
      this.setState({ username: '', password: '', user})
      
      
    } catch(exception){
      this.setState({
        error: 'wrong user or password'
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000);
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }


  render() {
    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
      return (
        <div className="error">
         <h2 style={{color:"red"}}> {message}</h2>
        </div>
      )
    }
    if(this.state.user === null){
      return(
        <div>
        <h1>Log in to application</h1>

        <Notification message={this.state.error}/>
        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
        </div>
      )
    }
    return (
      <div>
        <p style={{color:"green"}}>{this.state.user.name} logged in </p>

        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
