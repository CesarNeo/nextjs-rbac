'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { saveTokenInCookies } from '@/http/save-token-in-cookies'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export async function signWithEmailAndPassword(data: FormData) {
  const schemaValidate = signInSchema.safeParse(Object.fromEntries(data))

  if (!schemaValidate.success) {
    const errors = schemaValidate.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = schemaValidate.data

  try {
    const { token } = await signInWithPassword({ email, password })

    saveTokenInCookies(token)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null }
    }

    console.error(error)

    return {
      success: false,
      message: 'An unexpected error occurred',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
