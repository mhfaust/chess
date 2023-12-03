import SignInOut from 'app/components/SignInOut'
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
      <SignInOut />
        
        {children}</body>
    </html>
  )
}
