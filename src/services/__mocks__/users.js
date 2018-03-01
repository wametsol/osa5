let token = null


const user = {
    _id: '5a437a9e514ab7f168ddf138',
    username: 'tester',
    name: 'Teuvo Testaaja',
    token: '123123123'
}

const getAll = () => {
  return Promise.resolve(blogs)
}


export default { getAll, user}