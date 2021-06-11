import React, { Component } from "react";
import Header from "../Header";
import TodoList from "../TodoList";
import SearchPanel from "../SearchPanel";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";
import "./App.css";

export default class App extends Component {
  maxId = 100;
  createNewItem = label => {
    return {
      label,
      id: this.maxId++,
      important: false,
      done: false
    };
  };

  state = {
    todoData: [
      this.createNewItem("Drink Coffee"),
      this.createNewItem("Learn React"),
      this.createNewItem("Smile for smile"),
      this.createNewItem("D A N C E ")
    ],
    searchItem: "",
    filter: "all"
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      };
    });
  };
  // нельзя изменять существующий state напрямую!

  addItem = newLabel => {
    const newItem = this.createNewItem(newLabel);
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem]
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  onSearch = searchItem => {
    this.setState({ searchItem });
  };

  onFilter = filter => {
    this.setState({ filter });
  };

  search(items, searchItem) {
    if (searchItem.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(searchItem.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(el => !el.done);
      case "done":
        return items.filter(el => el.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, searchItem, filter } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.search(this.filter(todoData, filter), searchItem);

    return (
      <div className="body">
        <div className="panel">
          <Header toDo={todoCount} done={doneCount} />
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter filter={filter} onFilter={this.onFilter} />
          <TodoList
            className="TodoList"
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
          />
          <ItemAddForm onAddedItem={this.addItem} />
        </div>
      </div>
    );
  }
}
