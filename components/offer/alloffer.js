import React from 'react'
import { useState,useEffect } from 'react'
import Link from 'next/link'


export default function alloffer({totaloffer}) {

  return (
    <>
    <div >{
         totaloffer.map((offer)=>(
            <div className='card-design' key={offer._id}> <Link href={`/offer/${offer._id}`}>{offer.offername}</Link></div>
        ))
        }
    </div>
    </>
  )
}



