import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(todos) {
    console.log('활성 사용자 수를 세는중...');
    return todos.filter(user => user.active).length;
}

const initialState = {
    inputs: {
        title: '',
    },
    todos: [
        {
            id: 1,
            title: 'test1',
            active: false
        }
    ]
};

function reducer(state, action) {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            };
        case 'CREATE_TODO':
            return {
                inputs: initialState.inputs,
                todos: state.todos.concat(action.todo)
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id ? { ...todo, active: !todo.active } : todo
                )
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);

    const { todos } = state;
    const { title } = state.inputs;

    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        });
    }, []);

    const onCreate = useCallback(() => {
        dispatch({
            type: 'CREATE_TODO',
            todo: {
                id: nextId.current,
                title
            }
        });
        nextId.current += 1;
    }, [title]);

    const onToggle = useCallback(id => {
        dispatch({
            type: 'TOGGLE_TODO',
            id
        });
    }, []);

    const onRemove = useCallback(id => {
        dispatch({
            type: 'REMOVE_TODO',
            id
        });
    }, []);

    const count = useMemo(() => countActiveUsers(todos), [todos]);
    return (
        <>
            <CreateUser
                title={title}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList todos={todos} onToggle={onToggle} onRemove={onRemove} />
            <div>활성 TODO 수 : {count}</div>
        </>
    );
}

export default App;