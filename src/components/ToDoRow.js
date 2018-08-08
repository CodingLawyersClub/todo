import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import dates from '../utils/dates';

export default class ToDoRow extends Component {
      
  render() {
    const { toDo } = this.props;
    return (
        <Table.Row>
          <Table.Cell>{toDo.text}</Table.Cell>
          <Table.Cell>{dates.formatDate(toDo.createdAt)}</Table.Cell>
        </Table.Row>
    )
  }
}
