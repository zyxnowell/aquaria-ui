import React, { Fragment, useEffect, useState } from "react";
import { Card, Input, Form, Row, Col } from "antd";
import "../App.css";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../actions/aquaria";
import { Aquaria } from "../models";
import FormModal from "./modal";

const { Search } = Input;

const Wiki = (props: any) => {
  const { wikiList, searchWiki } = props;
  const [results, setResults] = useState([]);

  const onSearch = (term: string) => {
    searchWiki(term);
  };

  const renderCards = wikiList.map((result: any) => {
    return (
      <Col span={12}>
        <Card
          title={result.title}
          extra={
            <a
              href={`https://en.wikipedia.org?curid=${result.pageid}`}
              target="_blank"
            >
              Go to Wikipedia
            </a>
          }
        >
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </Card>
      </Col>
    );
  });

  return (
    <div>
      <Row style={{ padding: "10px 0px" }}>
        <Search
          placeholder="Search Wiki for fish species"
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      </Row>
      <Row gutter={[16, 16]}>{wikiList.length > 0 ? renderCards : ""}</Row>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  wikiList: state.aquaria.wikiList,
});

const mapActionToProps = {
  searchWiki: actions.searchWiki,
};

export default connect(mapStateToProps, mapActionToProps)(Wiki);
