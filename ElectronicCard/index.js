import React from 'react'
import useProfile from '../../hooks/useProfile'

import './global.css'

const ElectronicCard = () => {
  const profile = useProfile()
  //console.log(profile);
  if (profile) {
    return (
      <div>
        <a className="landing-btn" href="/e-giftcard">
          Ver e-giftcard
        </a>
      </div>
    )
  } else {
    return (
      <div>
        <a className="landing-btn" href="/login?returnUrl=/e-giftcard">
          Ver e-giftcard
        </a>
      </div>
    )
  }
}

export default ElectronicCard
