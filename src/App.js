import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'
import Togglable from './components/Togglable'
import Toggleblog from './components/Toggleblog'
const LoginForm = ({ handleSubmit, handleChange, username, password}) => {
      return (
      <div>
        <h1>Log in to application</h1>

        
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
        </div>
    )}

const BlogForm = ({handleAdd, handleChange, title, author, url}) => {
      return(
      <div>
        <h2>create new blog</h2>
        <form onSubmit={handleAdd}>
          <div>
            title
            <input
              type="text"
              name="newTitle"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="newAuthor"
              value={author}
              onChange={handleChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="newUrl"
              value={url}
              onChange={handleChange}
            />
          </div>
          <button type="submit">create</button>
        </form>

        
      </div>
    )
  }
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newUrl: '',
      newAuthor: '',
      username: '',
      password: '',
      user: null,
      error: null,
      success: null,
      loginVisible:false,
      blogcreateVisible:false
    }
  }
  

  componentDidMount() {
    blogService.getAll().then(blogs => {
      blogs = blogs.sort(function(a,b){
        return b.likes-a.likes
      })
      this.setState({ blogs })
    })
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
      this.setState({ username: '', password: '',success: 'logging succesfull', user})
      setTimeout(() => {
        this.setState({success: null})
      }, 5000);
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
    this.setState({user:null, success:'logging out succesfull'})
    setTimeout(() => {
      this.setState({success: null})
    }, 5000);
  }
  
  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()
    if(this.state.newTitle === "" || this.state.newUrl === ""){
      this.setState({
        error: 'title or url missing'
      })
      setTimeout(() => {
        this.setState({error: null})
      }, 5000);
      return
    }
    else {
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }
    
    blogService.create(blogObject)
    .then(newBlog => {
      this.setState({
        success: `a new blog'${this.state.newTitle}' by ${this.state.newAuthor} has been added`,
        blogs: this.state.blogs.concat(newBlog),
        newTitle: '',
        newAuthor: '',
        newUrl: ''
          
        

      })
      setTimeout(() => {
        this.setState({success:null})
      }, 5000);
    })
  }
}
  
   handleLike = (event) => {
     event.preventDefault()
    
     const blogs = this.state.blogs
     const likedBlog = blogs.find(blog => blog._id === event.target.value) 
     
     likedBlog.likes = likedBlog.likes + 1
     
     
     
     blogService.update(likedBlog._id, likedBlog)
     .then(newBlog => {
      var blogit = this.state.blogs
      blogit.sort(function(a,b){
        return b.likes-a.likes
      })
      this.setState({
        success: `you liked'${newBlog.title}' by ${newBlog.author} `,
        blogs: blogit
        
          
        

      })
      setTimeout(() => {
        this.setState({success:null})
      }, 2000);
   
}) 
   }

  handleDelete = (event) => {
    event.preventDefault()
    const blogs = this.state.blogs
    const blogToDelete = blogs.find(blog => blog._id === event.target.value)
    
    if(window.confirm(`are you sure you want to delete ${blogToDelete.title}`)){
      blogService.destroy(event.target.value)
      blogService.getAll().then(blogs => {
        blogs = blogs.sort(function(a,b){
          return b.likes-a.likes
        })
        this.setState({ blogs })
      })
    }
    
    

  }
  
  
  


  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
      if (this.state.error === null){
        return(
          <div className="success">
        
         <h2  > {message}</h2>
        </div>
        )
      }
      
      return (
        
        <div className="error">
        
         <h2  > {message}</h2>
        </div>
      )
    }
    const loginForm = () => {
       return (
      
      <Togglable buttonLabel="log in">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
        </Togglable>
        
      )
    }
    
    const deleButton = (blog) => {
     
      if(blog.user.name===this.state.user.name ||blog.user.name===undefined){
        return (
          <button value ={blog._id} onClick={this.handleDelete}>delete</button>
        )
      }
    }
    const blogForm = () => {
      
      return(
      <div>
        
        <Togglable buttonLabel="create blog" ref={component => this.blogForm = component}>
        <BlogForm
        handleAdd={this.addBlog}
        handleChange={this.handleLoginFieldChange}
        title={this.state.newTitle}
        author={this.state.newAuthor}
        url={this.state.newUrl}
        />
        </Togglable>
        {this.state.blogs.map(blog =>
        
        <div key={blog._id + 1} style={blogStyle} >

        
        
        <Toggleblog buttonLabel={<Blog  key={blog.user._id} blog={blog} />}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>{blog.likes}<button  value={blog._id} onClick={this.handleLike}>like</button></li>
        <li>added by {blog.user.name}</li>
        {deleButton(blog)}
        </Toggleblog>
        </div>
          
        )}
        
      </div>
    )
  }
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.error} />
        <Notification message={this.state.success} />
        
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
