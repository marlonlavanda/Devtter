import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function Timeline({ userName }) {
  return (
    <>
      <AppLayout>
        <h1>This is the {userName} timeline</h1>
        <Link href="/">Back to home</Link>
      </AppLayout>
    </>
  );
}

// Timeline.getInitialProps = () => {
//   return fetch('http://localhost:3000/api/hello')
//   .then(res => res.json())
// }
