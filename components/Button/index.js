import { colors } from "styles/theme"

export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          background-color: ${colors.black};
          border: 0;
          color: #fff;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: opacity 0.3s ease;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
