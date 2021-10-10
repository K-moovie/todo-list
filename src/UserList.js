import React from 'react';

const User = React.memo(function User({ todo, onRemove, onToggle }) {
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: todo.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(todo.id)}
            >
                {todo.title}
            </b>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    );
});

function UserList({ todos, onRemove, onToggle }) {
    return (
        <div>
            {todos.map(todo => (
                <User
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default React.memo(
    UserList,
    (prevProps, nextProps) => prevProps.todos === nextProps.todos
);