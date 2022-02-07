import './App.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainColumn from './main-column/MainColumn';
import FilterColumn from './filter-column/FilterColumn'
import NavBar from './NavBar';

class Canvas extends React.Component {
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <Container>
          <Row>
            <Col sm={4}> <FilterColumn /> </Col>
            <Col sm={8}> <MainColumn /> </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Canvas;
