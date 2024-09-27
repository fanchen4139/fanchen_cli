import {useSearchParams} from "react-router-dom";

const SearchParams = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  return (
    <div>id: {id}</div>
  )
}

export default SearchParams