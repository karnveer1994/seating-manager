import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Form, Input, Button, Typography } from 'antd';

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function Movie(props) {
  const [form] = Form.useForm();
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    genre: '',
    summary: '',
    imdb_link: ''
  });

  useEffect(() => {
    async function fetchData(){
      if (props.location.state && props.location.state.id){
        const response = await axios.get(`/movies/${props.location.state.id}`)
        const { title, genre, year, summary, imdb_link } = response.data.movie
        setMovie({ title, genre, year, summary, imdb_link })
        form.setFieldsValue({ title, genre, year, summary, imdb_link })
      }
    }
    fetchData();
  }, [])

  const handleSubmit = (event) => {
    if (props.location.state && props.location.state.id) {
      axios.patch(`/movies/${props.location.state.id}`, { movie })
        .then(res => {
          props.history.push('/')
        })
    }
    else {
      axios.post(`/movies`, { movie })
        .then(res => {
          props.history.push('/')
        })
    }
    event.preventDefault();
  }

  const handleChange = (changedValues) => {
    setMovie({...movie, ...changedValues})
  }

  return (
    <React.Fragment>
      <Button type='default' onClick={() => props.history.push('/')}>Back</Button>
      <Form {...layout} form={form}
        name="basic"
        submit={handleSubmit}
        onValuesChange={(changedValues) => handleChange(changedValues)}
      >
        <Form.Item {...tailLayout}>
          <Typography.Title {...tailLayout} level={2}>Add New Movie</Typography.Title>
        </Form.Item>
        <Form.Item
          label="Title"
          initialValue={movie.title}
          name="title"
          rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input
            name="title"
            type="text"
          />
        </Form.Item>

        <Form.Item
          label="Year"
          initialValue={movie.year}
          name="year"
          rules={[{ required: true, message: 'Please input year!' }]}
        >
          <Input
            name="year"
            type="number"
          />
        </Form.Item>

        <Form.Item
          label="Genre"
          initialValue={movie.genre}
          name="genre"
          rules={[{ required: true, message: 'Please input genre!' }]}
        >
          <Input
            name="genre"
            type="text"
          />
        </Form.Item>

        <Form.Item
          label="IMDB Link"
          initialValue={movie.imdb_link}
          name="imdb_link"
          rules={[{ required: true, message: 'Please input IMDB Link!' }]}
        >
          <Input
            name="imdb_link"
            type="text"
          />
        </Form.Item>

        <Form.Item
          label="Summary"
          initialValue={movie.summary}
          name="summary"
          rules={[{ required: true, message: 'Please input Summary!' }]}
        >
          <Input
            name="summary"
            type="textarea"
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={handleSubmit} htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}
