import {useNavigate} from "react-router-dom";
import {Button} from "antd";

const About = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button onClick={() => navigate('/')}>跳回首页</Button>
      <Button onClick={() => navigate('/navigate')}>跳转到导航页</Button>
    </>
  )
}

export default About