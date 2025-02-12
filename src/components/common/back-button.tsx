'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <Button onClick={handleClick} size="icon" variant="ghost">
      <ArrowLeft className="text-primary" />
    </Button>
  )
}
