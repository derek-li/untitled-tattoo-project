import { getUserFromSession, updateUser } from '@utils/data'
import React from 'react'

export default async function Account() {
  const user = await getUserFromSession()

  const updateUserWithEmail = updateUser.bind(null, user.email)

  return (
    <form
      className="h-full w-1/2 flex flex-col border-b-100 border gap-4 my-16 p-4" 
      action={updateUserWithEmail}
    >
      <div className="flex items-center gap-4">
        <div className="border border-black-300 rounded-full w-36 h-36 bg-stone-200" />
        <input id="username" name="username" type="text" defaultValue={user.username} />
      </div>
      <textarea
        className="p-2"
        id="description"
        name="description"
        rows={6}
        defaultValue={user.description || ''}
        placeholder="Add a brief description"
      />
      <div className="flex justify-between items-center">
        <label htmlFor="bookingsOpen">Books Open</label>
        <input id="bookingsOpen" name="bookingsOpen" type="checkbox" defaultChecked={user.isBookingOpen} />
      </div>

      <button type="submit" className="self-end">Save Changes</button>
    </form>
  )
}
