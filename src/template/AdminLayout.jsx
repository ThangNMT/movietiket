import React from "react";
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { LaptopOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BreadCrumbNav from "../component/BreadCrumbNav";
import { adminLocalStorage } from "../api/localService";
import { useDispatch, useSelector } from "react-redux";
import { SET_INFO_ADMIN } from "../redux/constant/admin";
import { defaultAvatar } from "../constants/defaultValues";

const { Header, Content, Sider } = Layout;

// const items1 = ["1", "2", "3"].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {

const items2 = [LaptopOutlined].map((icon, index) => {
  const key = String(index + 1);
  const menu = [
    {
      label: "User",
      url: "/admin/user",
    },
    {
      label: "Movie",
      url: "/admin/movie",
    },
  ];
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `Menu`,

    children: menu.map(item => {
      return {
        key: item.url,
        label: <Link to={item.url}>{item.label}</Link>,
      };
    }),
  };
});

const AdminLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAdminLogout = () => {
    message.success("Admin logout successfully!");
    navigate("/admin/auth");
    adminLocalStorage.remove();
    const action = {
      type: SET_INFO_ADMIN,
      payload: null,
    };
    dispatch(action);
  };
  const { info } = useSelector(state => {
    return state.adminReducer;
  });
  const handleAccount = () => {
    navigate("/admin/account");
  };
  return (
    <div className=''>
      <div className='bg-white w-screen h-screen z-50 fixed md:hidden flex justify-center items-center'>
        <div className='text-black text-3xl font-bold text-center'>Admin, please use computer fullscreen for best view!</div>
      </div>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 200 }}>
          <span className='text-white font-medium text-2xl'>CyberFlix Admin</span>
          <div className='flex justify-center items-center gap-x-3'>
            <div className='cursor-pointer flex justify-center items-center gap-x-1 group' onClick={handleAccount}>
              <img src={defaultAvatar} className='w-7 h-7  rounded-lg' alt='' />
              <span className='text-white group-hover:text-gray-500 duration-300'>{info.hoTen.toUpperCase()}</span>
            </div>
            <button onClick={handleAdminLogout} className='text-black bg-white rounded px-5 h-10 leading-10 shadow shadow-white'>
              Logout
            </button>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ overflow: "auto", height: "100vh", position: "fixed", left: 0, top: 0, bottom: 0 }}>
            <Menu
              theme='dark'
              mode='inline'
              defaultSelectedKeys={[window.location.pathname]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout className='site-layout' style={{ marginLeft: 200 }}>
            <BreadCrumbNav />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
