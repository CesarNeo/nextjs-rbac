import { useRouter } from 'next/navigation'

function useSheetCloseParallelRoute() {
  const router = useRouter()

  function onClosing() {
    return router.back()
  }

  return { onClosing }
}

export default useSheetCloseParallelRoute
