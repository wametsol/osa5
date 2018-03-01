import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders title, author & likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Testaaja Taina',
      likes: 2
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.content')
    
    
    expect(titleDiv.text()).toContain(blog.title)
  
    expect(blogComponent.text()).toContain(blog.author)
    
    const likesDiv = blogComponent.find('.likes')

    expect(likesDiv.text()).toContain(blog.likes)
    
  })

  it('clicking the button twice, calls the handler twice', () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'Testaaja Taina',
        likes: 2
      }

      const mockHandler = jest.fn()

      const blogComponent = shallow(
          <SimpleBlog blog={blog}
          onClick={mockHandler}/>

      )
      const button = blogComponent.find('button')
      button.simulate('click')
      button.simulate('click')

      expect(mockHandler.mock.calls.length).toBe(2)
  })
})