type IFormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export type { IFormState }
