import Image from "next/image";
import { signIn, signOut } from "app/actions"
import { auth } from 'app/auth';

const SignInOut = async () => {

  const session = await auth()

  if(session?.user) {
    const { user: {name, image} } = session

    return (
      <form action={signOut}>
        {name}
        {image && <Image src={image} alt='user images'  height={32} width={32}/>}
        <button type="submit">Sign Out</button>
      </form>
    )
  }

  return (
    <form action={signIn}>
      <button type="submit">Sign In</button>
    </form>
  )
}

export default SignInOut
