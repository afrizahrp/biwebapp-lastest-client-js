// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

import user from 'src/store/apps/user'
import groupProduct from 'src/store/apps/groupProduct'
import product from 'src/store/apps/product'
import productSpec from 'src/store/apps/productSpec'
import productImageUrl from 'src/store/apps/productImageUrl'
import productAttachmentUrl from 'src/store/apps/productAttachmentUrl'
import productComponent from 'src/store/apps/productComponent'
import spkType from 'src/store/apps/spk/spkType'
import spkStatus from 'src/store/apps/spk/spkStatus'
import spkHeader from 'src/store/apps/spk/spkHd/spkHeaderSlice'
import spkDetail from 'src/store/apps/spk/spkDt'
import productTaskList from './apps/production/productTaskList'
import productionTaskList from './apps/production/plan/productionTaskList'
import planHeader from 'src/store/apps/production/plan/planHeader'
import planDetail from 'src/store/apps/production/plan/planDetail'
import production from 'src/store/apps/production'
import employee from 'src/store/apps/hrd/employee'

export const store = configureStore({
  reducer: {
    user,
    groupProduct,
    product,
    productSpec,
    production,
    productImageUrl,
    productAttachmentUrl,
    productComponent,
    spkType,
    spkStatus,
    spkHeader,
    spkDetail,
    productionTaskList,
    productTaskList,
    planHeader,
    planDetail,
    production,
    employee
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: false
})
