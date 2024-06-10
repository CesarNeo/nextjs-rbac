import { type FormEvent, useState, useTransition } from 'react'

import type { IFormState } from './types'

const useFormState = (
  action: (formData: FormData) => Promise<IFormState>,
  initialState?: IFormState,
) => {
  const [formState, setFormState] = useState<IFormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )
  const [isPending, startTransition] = useTransition()

  async function handleSubmitAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const result = await action(formData)
      setFormState(result)
    })
  }

  return { formState, handleSubmitAction, isPending }
}

export default useFormState
