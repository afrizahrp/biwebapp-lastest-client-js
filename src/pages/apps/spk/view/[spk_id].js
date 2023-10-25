import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import SpkViewPage from 'src/views/apps/spk/view/SpkViewPage'

const SpkView = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { spk_id } = router.query

  const encodedId = encodeURIComponent(spk_id)

  return (
    <div>
      <SpkViewPage spk_id={encodedId} />
    </div>
  )
}

export default SpkView
