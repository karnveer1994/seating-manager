import React, { useState } from "react";
import axios from 'axios';
import { Form, Input, Button, Typography, Col, Row, Space } from 'antd';
import { CloseSquareOutlined } from "@ant-design/icons";

const rowsName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function SeatManager() {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    rows: 10,
    columns: 50,
    response: [],
    seatRow: '',
    seatColumn: '',
    seats: {
      "a1": { "id": "a1", "row": "a", "column": 1, "status": "AVAILABLE" },
      "b5": { "id": "b5", "row": "b", "column": 5, "status": "AVAILABLE" },
      "h7": { "id": "h7", "row": "h", "column": 7, "status": "AVAILABLE" }
    },
    errors: {
      rows: '',
      columns: '',
      seatRow: '',
      seatColumn: '',
    }
  })

  const handleresponse = (event) => {
    event.preventDefault();

    let detail = {
      "venue": { "layout": { "rows": state.rows, "columns": state.columns } },
      "seats": state.seats
    }

    axios.get(`/seats`, { params: { detail: detail } })
      .then(res => {
        debugger
        setState({ ...state, response: res.data.seats });
      })
  }

  const handleSubmit = () => {
    let seats = state.seats
    let key = rowsName[state.seatRow - 1] + state.seatColumn
    seats[key] = { 'id': key, 'row': rowsName[state.seatRow - 1], 'column': state.seatColumn, "status": "AVAILABLE" }
    setState({ ...state, seats, seatRow: '', seatColumn: '' })
  }

  const removeSubmit = (event, item) => {
    let seats = state.seats
    delete seats[item.id]
    setState({ ...state, seats: seats })
    event.preventDefault();
  }

  const handleChange = (allValues) => {
    const { rows, columns, seatColumn, seatRow } = allValues
    let errors = state.errors;
    errors.rows = !(rows > 0 && rows <= 26) ? 'Rows must be between 1 to 26!' : '';
    errors.columns = (columns > 0) ? '' : 'Columns must be greater then 0!';
      
    errors.seatRow = !(seatRow <= Number(state.rows)) ? `Row must be less or equal to ${state.rows}` : '';
    errors.seatColumn = !(seatColumn <= Number(state.columns)) ? `Column must be less or equal to ${state.columns}` : '';
    setState({ ...state, errors, ...allValues })
  }
  return (
    <Form {...layout} form={form} 
      name="basic"
      submit={handleresponse}
      onValuesChange={(changedValues, allValues) => handleChange(allValues)}
    >
      <Form.Item {...tailLayout}>
        <Typography.Title {...tailLayout} level={2}>Seat Manager</Typography.Title>
      </Form.Item>
      <Form.Item
        label="Total Rows"
        initialValue={state.rows}
        name="rows"
      >
        <Input
          name="rows"
          type="number"
        />
      </Form.Item>

      <Form.Item
        label="Total Columns"
        initialValue={state.columns}
        name="columns"
      >
        <Input
          name="columns"
          type="number"
        />
      </Form.Item>

      <Row>
        <Col span={8} offset={8}>
          {state.seats &&
            <div>
              <Typography.Title {...tailLayout} level={4}>Selected Seats are</Typography.Title>
              {Object.values(state.seats).map((item, i) => {
                return <div key={i}>
                  <span style={line} >{item.id}</span>
                  <CloseSquareOutlined onClick={(event) => removeSubmit(event, item)} />
                </div>
              })}
            </div>
          }
          <Typography.Title {...tailLayout} level={4}>Add More Seats</Typography.Title>
        </Col>
      </Row>

      <Form.Item
        label="Add Seat Row"
        initialValue={state.seatRow}
        name="seatRow"
      >
        <Input
          name="seatRow"
          type="number"
        />
      </Form.Item>

      <Form.Item
        label="Add Seat Column"
        initialValue={state.seatColumn}
        name="seatColumn"
      >
        <Input
          name="seatColumn"
          type="number"
        />
      </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Space size={'middle'}>
          <Button type='primary' onClick={handleSubmit} disabled={!(state.seatColumn && state.seatRow && state.seatRow <= state.rows && state.seatColumn <= state.columns)}>Add Seat</Button>
          <Button type="primary" onClick={handleresponse} htmlType="submit" disabled={!(state.rows && state.columns)}>Get the BEST SEATS</Button>
        </Space>
      </Form.Item>
      <Row>
        <Col span={8} offset={8}>
          {state.response[0] &&
            <div>
              <h5>Best Seats are: <b>{state.response[0].id}</b></h5>
              <h5>Also some good available Seats are</h5>
              {state.response.map((item, i) => {
                return (i > 0) && <span style={line} key={i}>{item.id}</span>
              })}
            </div>
          }
        </Col>
      </Row>
    </Form>
  );
}

const line = {
  display: "inline-block",
  verticalAlign: "middle",
  float: "left",
  marginRight: 10,
  paddingLeft: 10,
  paddingRight: 10
}
