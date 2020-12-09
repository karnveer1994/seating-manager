import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { DeleteFilled, ExclamationCircleOutlined, EditFilled, EyeFilled } from '@ant-design/icons';
import { Modal, Typography, Table, Space, Button } from 'antd';

const { confirm } = Modal;

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = () => {
    axios.get(`/movies`)
      .then(res => {
        setMovies(res.data.movies);
      })
  }

  const handleDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this string match?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        try {
          axios.delete(`/movies/` + id)
          .then(response => {
            fetchMovies()
          })
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre'
    },
    {
      title: 'IMDB Link',
      dataIndex: 'imdb_link',
      key: 'imdb_link'
    },
    {
      title: 'Summary',
      dataIndex: 'summary',
      key: 'summary'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={{ pathname: "movie", state: { id: record.key } }}><EditFilled /></Link>
          <DeleteFilled onClick={() => handleDeleteConfirm(record.key)} />
        </Space>
      ),
    }
  ];

  const data = movies.map((movie) => {
    const { title, year, genre, summary, imdb_link, id } = movie
    return {
      key: id,
      title,
      year,
      genre,
      summary,
      imdb_link
    }
  })

  return (
    <>
      <Link to="/movie"><Button type='primary'>Add Movie</Button></Link>
      <div className="col-md-6 col-md-offset-3">
        {
          movies.length ?
          <>
            <Typography.Title level={2}>List of Movies </Typography.Title>
            <Table columns={columns} dataSource={data} />
          </> :
          <Typography.Title level={2}>'No Movies!'</Typography.Title>
        }
      </div>
    </>
  );
}
