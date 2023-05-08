export default function Type({ item, setFilter, filter }: any) {
  return (
    <>
      {filter.type === item ? <h6 onClick={() => setFilter({ ...filter, type: "" })}>{item}</h6> : <p onClick={() => setFilter({ ...filter, type: item })}>{item}</p>}
    </>
  )
}