'use client'
import { otherServices, webServices } from '@/lib/constants'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CreateProject = () => {
  const searchParams=useSearchParams()
  const projectType=searchParams.get('type')
  const service=searchParams.get('service')
  if (projectType==="web") {
        if (!webServices.includes(service!)) {
            return
        }
  }else if(projectType==="others"){
        if (!otherServices.includes(service!)) {
            return
        }
  }
  return (
    <div>CreateProject</div>
  )
}

export default CreateProject