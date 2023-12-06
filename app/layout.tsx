import Providers from "app/Providers"
import SignInOut from 'app/components/SignInOut'
import '@radix-ui/themes/styles.css';
import './globals.css'

export const metadata = {
  title: 'Chess',
  description: 'Author: Mike Hildebrand-Faust',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers >
          <SignInOut />
          {children}
        </Providers>
        
      </body>
    </html>
  )
}
