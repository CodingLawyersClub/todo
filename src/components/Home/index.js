import React, { Component } from 'react';
import ToDoRow from '../../components/ToDoRow';
import Table from '../../components/Table';
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";
import { inject, observer } from 'mobx-react';
import Heading from '../../components/Heading';
import { Box, Flex } from 'rebass';
import { Button } from 'semantic-ui-react';
import Container from '../../components/Container';

@inject("toDoStore", "userStore")
@observer
export default class Splash extends Component {

    componentDidMount() {
      if (this.props.userStore.currentUser) {
        this.props.toDoStore.findToDos()
      }
    }

    render() {
        const { toDos, isFetchingToDos } = this.props.toDoStore;
        const { currentUser } = this.props.userStore;                                
        return (
            <Layout showLogo={true}>
              <Helmet>
                <title>ToDo List</title>
              </Helmet>
              <Container>
                <Heading>ToDo List</Heading>
                {currentUser && <div>
                  <Flex justifyContent="flex-end">
                    <Box>
                      <Button onClick={() => this.props.history.push("/create") } content='New' icon='plus' labelPosition='right' />
                    </Box>
                  </Flex>
                  <Table
                  isLoading={isFetchingToDos}
                  striped
                  selectable                
                  headings={["Text", "Created At"]}
                  rows={toDos.map((toDo) => <ToDoRow key={toDo.id} toDo={toDo} />)}
                  />
                </div>}
                {!currentUser && <div>Login / Sign-Up to to see your To-Dos!</div>}
              </Container>
            </Layout>
        )
    }
}
