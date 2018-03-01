import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import Toggleblog from './Toggleblog'

describe('<Toggleblog />', () => {
let ToggleblogComponent
let blog
  beforeEach(() => {
    blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Testaaja Taina',
      likes: 2
    }

    ToggleblogComponent = shallow(
      <Toggleblog buttonLabel={blog}>
        <div className="testDiv" />
      </Toggleblog>
    )    
  })
  it('renders ', () => {
    
  expect(ToggleblogComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('after clicking name, the details are displayed', () => {
    const nameDiv = ToggleblogComponent.find('.togglableBlog')
    nameDiv.at(0).simulate('click')
    const contentDiv = ToggleblogComponent.find('.togglableContent')
    
    expect(contentDiv.getElement().props.style).toEqual({ display: ''})
  })

})
