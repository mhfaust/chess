import { githubSignIn, googleSignIn } from "app/actions"
import { auth } from 'app/auth';

const SignInPage = () => {

  //TODO: if already signed in, redirect somewhere.

  return (
    <div>
      <form action={githubSignIn}>
        <button type="submit">GitHub</button>
      </form>
      <form action={googleSignIn}>
        <button type="submit">Google</button>
      </form>
    </div>
  )
}

export default SignInPage