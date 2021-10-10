import React from 'react';

function CreateUser({ title, onChange, onCreate }) {
    return (
        <div>
            <input
                name="title"
                placeholder="할 일을 입력 해주세요"
                onChange={onChange}
                value={title}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default React.memo(CreateUser);