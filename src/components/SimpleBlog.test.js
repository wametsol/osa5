import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
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
})