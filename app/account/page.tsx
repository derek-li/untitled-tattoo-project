'use client'

import { useStytchUser } from '@stytch/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  username: string
  exampleRequired: string
}

export default function Account() {
  const { user, isInitialized } = useStytchUser()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("username"))

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace('login')
    }
  }, [isInitialized, router, user])

  return (
    <form className="h-full w-1/2 flex flex-col border-b-100 border gap-4 my-16 p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-start items-center gap-4 border border-black-300 p-4 background-black-300">
        <div className="border border-red-500 rounded-full w-24 h-24 bg-stone-200" />
        <input defaultValue="usernamegoeshere" {...register("username")} />
      </div>
      
      <span>Contact Information</span>
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
