import { useEffect, useState } from "react"

import Devit from "components/Devit"
import useUser from "hooks/useUser"

import { fetchLatestDevits } from "../../firebase/client"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"
import Head from "next/head"
import Link from "next/link"
export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devtter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(({ id, img, avatar, content, userName, createdAt }) => {
          return (
            <Devit
              key={id}
              id={id}
              img={img}
              avatar={avatar}
              content={content}
              userName={userName}
              createdAt={createdAt}
            />
          )
        })}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home stroke="#09f" width="32" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Search stroke="#09f" width="32" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create stroke="#09f" width="32" />
          </a>
        </Link>
      </nav>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        section {
          flex: 1;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          min-height: 49px;
          position: sticky;
          width: 100%;
        }

        nav a {
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
