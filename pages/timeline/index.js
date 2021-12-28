import Link from "next/link"
import AppLayout from "components/AppLayout"

export default function Timeline({ userName }) {
  return (
    <>
      <AppLayout>
        <h1>This is the {userName} timeline</h1>
        <Link href="/">Back to home</Link>
      </AppLayout>
    </>
  )
}
