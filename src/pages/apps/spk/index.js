import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpkHeader } from 'src/store/apps/spk/spkHd/spkHeaderSlice'
import SearchContainer from 'src/pages/apps/spk/view/searchContainer'
import SpkListCard from './list/spkListCard'
import NoData from 'src/common/NoData'
// import SpkListGrid from './list/spkListGrid'

const SpkContainer = () => {
  const { allSpkHd, searchStatusName, searchTypeName, searchQuery } = useSelector(state => state.spkHeader)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSpkHeader())
  }, [dispatch, searchStatusName, searchTypeName, searchQuery])

  const totalSpk = allSpkHd.length

  if (allSpkHd && allSpkHd.length > 0) {
    return (
      <>
        <SearchContainer />

        <SpkListCard allSpkHd={allSpkHd} totalSpk={totalSpk} />
        {/* <SpkListGrid allSpkHd={allSpkHd} /> */}
      </>
    )
  } else {
    return (
      <>
        <SearchContainer />
        <NoData />
      </>
    )
  }
}

export default SpkContainer
