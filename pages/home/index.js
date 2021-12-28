import { useEffect, useState } from "react"

import AppLayout from "components/AppLayout/index"
import Devit from "components/Devit"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  })

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                id={devit.id}
                avatar={devit.avatar}
                message={devit.message}
                username={devit.username}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ccc;
          height: 49px;
          width: 100%;
          position: sticky;
          top: 0;
        }

        article {
          padding: 10px;
        }

        section {
          padding-top: 49px;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: fixed;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
        }
      `}</style>
    </>
  )
}
