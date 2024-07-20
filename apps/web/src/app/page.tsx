import { auth } from '@/auth/auth'

async function Home() {
  const { user } = await auth()
  console.log('🚀 ~ Home ~ user:', user)

  return <h1>hello world</h1>
}

export default Home
