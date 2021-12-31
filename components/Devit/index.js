import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  id,
  img,
  avatar,
  userName,
  content,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <span>{timeago}</span>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: ${img ? "0 0 10px 0" : "0"};
        }

        img {
          border-radius: 10px;
          width: 100%;
          height: auto;
        }

        span {
          margin: 0 5px;
        }

        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
