import React, { Component } from "react";
import TodoListItem from "../TodoListItem";
import "./TodoList.css";

export default class TodoList extends Component {
  render() {
    const { todos, onDeleted, onToggleImportant, onToggleDone } = this.props;
    const elements = todos.map(item => {
      const { id, ...itemProps } = item;
      return (
        <li key={item.id} className="list-group-item">
          <TodoListItem
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        </li>
      );
    });
    return <ul className="list-group TodoList">{elements}</ul>;
  }
}
