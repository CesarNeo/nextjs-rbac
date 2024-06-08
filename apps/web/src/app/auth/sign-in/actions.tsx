'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address' }),
  password: z.string().min(1, { message: 'Please, provide a password' }),
})

async function signInWithEmailAndPassword(data: FormData) {
  const schemaParsed = signInSchema.safeParse(Object.fromEntries(data))

  if (!schemaParsed.success) {
    const errors = schemaParsed.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = schemaParsed.data

  try {
    const result = await signInWithPassword({
      email: String(email),
      password: String(password),
    })

    console.log(result)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}

export { signInWithEmailAndPassword }
