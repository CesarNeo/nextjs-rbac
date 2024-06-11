'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Please, provide a name' })
      .refine((name) => name.split(' ').length > 1, {
        message: 'Please, provide your full name',
      }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address' }),
    password: z
      .string()
      .min(6, { message: 'Password must have at least 6 characters' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  })

async function signUpAction(data: FormData) {
  const schemaParsed = signUpSchema.safeParse(Object.fromEntries(data))

  if (!schemaParsed.success) {
    const errors = schemaParsed.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = schemaParsed.data

  try {
    await signUp({
      name: String(name),
      email: String(email),
      password: String(password),
    })
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

export { signUpAction }
