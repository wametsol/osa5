import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
jest.mock('./services/login')
import loginService from './services/login'

describe('<App />', () => {
  let app
  describe.skip('when user is not logged', () => {
    beforeEach(() => {
        app = mount(<App />)
      })
    
      it('blogs not visible, only login', () => {
        app.update()
        const blogComponents = app.find(Blog)
        console.log(app.text());
        
        expect(blogComponents.length).toEqual(0)
        expect(app.text()).toContain("Log in to application")
      })

  })
  describe('when user is logged', () => {
    const user = {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'tester',
        name: 'Teuvo Testaaja',
        token: '123123123'
    }
    beforeEach(() => {
        app = mount(<App /> )
        localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        
        
        
        
        
        
      })

    it('after log in, you can see blogs', () => {
        app.update()
        const blogComponents = app.find(Blog)
        console.log('kirjauduttu: ', blogComponents);
       
      })
    })
  })

  
