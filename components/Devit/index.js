import Avatar from "components/Avatar"

export default function Devit({ id, avatar, username, message }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: solid 1px #eaf7ff;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  )
}
