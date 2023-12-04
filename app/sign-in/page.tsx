import { githubSignIn, googleSignIn, facebookSignIn } from "app/actions"
import { auth } from 'app/auth';

const SignInPage = () => {

  //TODO: if already signed in, redirect somewhere.

  return (
    <div>
      <form action={googleSignIn}>
        <button type="submit">Google</button>
      </form>
      <form action={facebookSignIn}>
        <button type="submit">Facebook</button>
      </form>
      <form action={githubSignIn}>
        <button type="submit">GitHub</button>
      </form>
    </div>
  )
}

export default SignInPage