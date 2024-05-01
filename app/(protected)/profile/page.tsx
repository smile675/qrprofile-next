import { auth } from "@/auth"

const Profile = async () => {
  const session = await auth()
  return (
    <div>
       {JSON.stringify(session)}
    </div>
  )
}

export default Profile
