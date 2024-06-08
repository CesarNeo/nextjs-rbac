import ky from 'ky'

const api = ky.create({ prefixUrl: 'http://localhost:3333' })

export { api }
