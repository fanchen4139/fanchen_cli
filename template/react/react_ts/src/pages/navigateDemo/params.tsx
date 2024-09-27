import {useParams} from "react-router-dom";

const SearchParams = () => {
  const params = useParams()
  const id = params.id
  return (
    <div>param's id: {id}</div>
  )
}

export default SearchParams