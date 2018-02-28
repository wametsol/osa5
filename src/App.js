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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
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
  handleLogOut = (event) => {
    
    window.localStorage.removeItem('loggedBlogUser')
    this.setState({user:null})
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
    const loginForm = () => (
      <div>
        <h1>Log in to application</h1>

        
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
    const blogForm = () => (
      <div>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
    
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.error}/>
        
        {this.state.user === null ?
        loginForm() :
        <div>
          <p style={{color:"green"}}>{this.state.user.name} logged in
           <button onClick={this.handleLogOut}>logout</button></p>
          {blogForm()}
        </div>
        }
      </div>
      
    )
  }
}

export default App;
