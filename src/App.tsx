import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Layout, Input, Row, Menu, Col } from "antd";
import TableList from "./components/tablelist";
import FilterAction from "./components/filteractions";
import Wiki from "./components/wiki";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import * as actions from "./actions/aquaria";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const App = (props: any) => {
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState(["home"]);

  useEffect(() => {
    return history.listen((location) => {
      setSelectedMenu([`${location.pathname}`]);
    });
  }, [history]);

  const NoMatch = () => {
    return (
      <Row justify="center" align="middle">
        <Col style={{ paddingTop: "100px" }}>404 Page Not Found</Col>
      </Row>
    );
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={selectedMenu}>
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="wiki">
            <Link to="/wiki">Wiki Search</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="page-container">
        <Switch>
          <Route exact path="/">
            <Row style={{ padding: "10px 0px" }}>
              <FilterAction />
            </Row>

            <TableList />
          </Route>
          <Route exact path="/wiki">
            <Wiki />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center", position: "sticky", bottom: "0" }}>
        All Rights Reserved
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  aquariaList: state.aquaria.list,
});

const mapActionToProps = {
  fetchAllData: actions.fetchAll,
  deleteData: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(App);
