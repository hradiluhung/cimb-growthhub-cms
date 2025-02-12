import Image from 'next/image'
import React from 'react'

const SIZES = {
  sm: { width: 80, height: 40 },
  md: { width: 160, height: 80 },
  lg: { width: 320, height: 160 },
} as const

export default function Logo({
  size = 'md',
  invert = false,
}: {
  size?: 'sm' | 'md' | 'lg'
  invert?: boolean
}) {
  return (
    <div className="flex flex-col">
      <Image
        src={invert ? '/logo-invert.png' : '/logo.svg'}
        alt="Logo"
        width={SIZES[size].width}
        height={SIZES[size].height}
      />
      <p className={`font-semibold ${invert ? 'text-white' : 'text-primary'}`}>GrowthHub</p>
    </div>
  )
}
