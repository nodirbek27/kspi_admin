import React from 'react'
import BakalavrFanDasturlariCom from '../../../components/BFanDasturlariCom'
import BakalavrFanDasturlariTurCom from '../../../components/BFanDasturlariTur'
import BakalavrFanDasturlariKursCom from '../../../components/BFanDasturlariKurs'
import BakalavrFanDasturlariYonalishCom from '../../../components/BFanDasturlariYonalish'

function BakalavrFanDasturlari() {
  return (
    <div>
        <BakalavrFanDasturlariKursCom/>
        <BakalavrFanDasturlariYonalishCom/>
        <BakalavrFanDasturlariTurCom/>
        <BakalavrFanDasturlariCom/>
    </div>
  )
}

export default BakalavrFanDasturlari