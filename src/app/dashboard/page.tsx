'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Gallery } from '@/containers/gallery'
import SidebarContainer from '@/containers/sidebar-container'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
      router.replace('/')
    }
  }, [router])

  return (
    <SidebarContainer>
      <Gallery />
    </SidebarContainer>
  )
}

export default Dashboard
