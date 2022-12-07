import React from 'react'
import Alloffer from './offer/alloffer'
import Allchat from './offer/allchat'

function Offer({alloffer,allchat}) {
  return (
    <div className='main_div'>
        <div className='fist_div'>
           <Alloffer totaloffer={alloffer}/>
        </div>
        <div className='fist_div'>
        <Allchat totalchat={allchat} />
        </div>
    </div>
  )
}



export default Offer