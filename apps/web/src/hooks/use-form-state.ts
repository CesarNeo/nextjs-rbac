'use client'

import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface IFormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface IUseFormState {
  action: (formData: FormData) => Promise<IFormState>
  onSuccess?: () => Promise<void> | void
  initialState?: IFormState
}

const DEFAULT_INITIAL_STATE: IFormState = {
  success: false,
  message: null,
  errors: null,
}

export function useFormState({
  action,
  onSuccess,
  initialState = DEFAULT_INITIAL_STATE,
}: IUseFormState) {
  const [formState, setFormState] = useState<IFormState>(initialState)
  const [isPending, startTransition] = useTransition()

  function handleSubmitAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await action(formData)
      setFormState(result)

      if (result.success && typeof onSuccess === 'function') {
        await onSuccess()
      }
    })

    requestFormReset(event.currentTarget)
  }

  return { formState, isPending, handleSubmitAction }
}
