import React from "react"
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd';
import SeatManager from './SeatManager'
import Movies from './Movies'
import Movie from "./Movie"
import 'antd/dist/antd.css';
import './main.css';
const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={'home'}>
              <Menu.Item key="home"><Link to="/"><Button type="primary">Movies</Button></Link></Menu.Item>
              <Menu.Item key="seat-manager"><Link to="/seat-manager"><Button type="primary">Seat Manager</Button></Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Route exact path='/' render={() => <Movies />} />
              <Route exact path='/seat-manager' render={() => <SeatManager />} />
              <Route exact path='/movie' render={(props) => <Movie {...props} />} />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
