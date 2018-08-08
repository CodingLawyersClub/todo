import { observable, action, flow } from 'mobx';
import agent from '../agent';

class ToDoStore {
    @observable toDos = [];
    @observable isCreatingToDo;
    @observable isFetchingToDos;

    @action
    createToDo = flow(function* (toDo) {
        this.isCreatingToDo = true;
        yield agent.ToDo.create(toDo);
        this.isCreatingToDo = false;
    });

    @action
    findToDos = flow(function* () {
        this.isFetchingToDos = true;
        const response = yield agent.ToDo.find();
        this.toDos = response.toDos;
        this.isFetchingToDos = false;
    });
}

export default new ToDoStore();
