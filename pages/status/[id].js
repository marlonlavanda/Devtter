import Devit from "components/Devit"
import { firestore } from "../../firebase/admin"
import { useRouter } from "next/router"

function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "IyKQGsrc2jcZaEvxAkLK" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // params, req, res, query están dentro del context
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

export default DevitPage
