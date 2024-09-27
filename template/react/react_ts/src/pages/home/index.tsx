// import {useNavigate, useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

const Home = () => {
  const navigate = useNavigate()
  // const [params] = useSearchParams()
  // const id = params.get('id')
  return (
    <div>
      <div>我是首页</div>
      <div>{Math.random()}</div>
      <Button onClick={() => navigate("/about")}>跳转到关于页</Button>
      <Button onClick={() => navigate("/basicLayout")}>跳转到Layout页</Button>
      <Button onClick={() => navigate("/navigate")}>跳转到navigate页</Button>
    </div>
  )
}

export default Home