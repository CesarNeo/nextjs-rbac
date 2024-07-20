'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((name) => name.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z.string().email({ message: 'Invalid e-mail' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    password_confirmation: z.string(),
  })
  .refine(
    ({ password, password_confirmation: passwordConfirmation }) =>
      password === passwordConfirmation,
    {
      message: 'Passwords do not match',
      path: ['password_confirmation'],
    },
  )

export async function signUpAction(data: FormData) {
  const schemaValidate = signUpSchema.safeParse(Object.fromEntries(data))

  if (!schemaValidate.success) {
    const errors = schemaValidate.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = schemaValidate.data

  try {
    await signUp({ name, email, password })
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
