import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "antd";

const NavigateDemo = () => {
  const navigate = useNavigate()
  const location = useLocation();

  // 获取当前路径的分段
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

    return {
      path,
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
    };
  });
  console.log(breadcrumbItems);
  return (
    <div>
      <h1>导航页面</h1>
      <Button onClick={() => navigate('params/11001')}>跳转到Params页面</Button>
      <div></div>
      <Button onClick={() => navigate('searchParams?id=22002')}>跳转到SearchParams页面</Button>
      <div></div>
      <Button onClick={() => navigate('stateParams', {state: {id: 33003}})}>跳转到StateParams页面</Button>
      <div></div>
      <Button onClick={() => navigate('/login')}>返回登录页</Button>
      <Outlet></Outlet>
    </div>
  )
}

export default NavigateDemo