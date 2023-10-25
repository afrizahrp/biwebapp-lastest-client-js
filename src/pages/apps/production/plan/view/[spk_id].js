import { useRouter } from 'next/router'
import PlanViewPage from 'src/views/apps/production/plan/PlanViewPage'

const PlanView = () => {
  const router = useRouter()

  const { spk_id } = router.query

  const encodedId = encodeURIComponent(spk_id)

  return (
    <div>
      <PlanViewPage spk_id={encodedId} />
    </div>
  )
}

export default PlanView
