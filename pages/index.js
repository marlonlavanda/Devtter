import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import AppLayout from "components/AppLayout/index"
import Button from "components/Button/index"
import GitHub from "components/Icons/GitHub"
import Logo from "components/Icons/Logo"

import { colors } from "styles/theme"

import { loginWithGitHub } from "../firebase/client"

import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devtter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo height={120} />
          <h1>Devtter</h1>
          <h2>
            Talk about development <br /> with developers
          </h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill={colors.white} width={24} height={24} />
                Login with Github
              </Button>
            )}
            {user === USER_STATES.NOT_kNOWN && <img src="/spinner.gif" />}
          </div>
        </section>
      </AppLayout>
      <style jsx>
        {`
          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }

          div {
            margin-top: 16px;
          }

          h1 {
            color: ${colors.primary};
            font-weight: 800;
            font-size: 32px;
            margin-bottom: 16px;
          }

          h2 {
            font-size: 16px;
            color: ${colors.secondary};
          }

          a {
            color: blue;
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}
