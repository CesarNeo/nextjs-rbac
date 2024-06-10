import { cookies } from 'next/headers'

const isAuthenticated = !!cookies().get('token')?.value

export { isAuthenticated }
