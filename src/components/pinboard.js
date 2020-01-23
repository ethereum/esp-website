import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Pinboard = () => {
  const data = useStaticQuery(graphql`
    query PinboardQuery {
      records: allAirtable(
        filter: { table: { eq: "Records" } }
        sort: { fields: data___Title, order: DESC }
      ) {
        nodes {
          data {
            Title
            Description
          }
          recordId
        }
      }
    }
  `)

  return (
    <>
      <h3>Pinboard</h3>

      <ul>
        {data.records.nodes.map((item, i) => (
          <li key={item.recordId}>
            <p>{item.data.Title}</p>
            <p>{item.data.Description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Pinboard
