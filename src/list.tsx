import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

const List: React.FC = (props) => {
    const [list,setList] =  useState([
        { id: 1, name: 'lee' },
        { id: 2, name: 'wu' },
        { id: 3, name: 'wang' }
    ])
    

    const listContent = list.map(item =>
        <Fragment key={item.id}>
            <li>{item.name}</li>
            <li>------------</li>
        </Fragment>
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('安安')
        data.title = '新標題'
        data.content = '新內容'
        setContent(data)
        setList([...list, { id: 4, name: 'li' }])
    }

    let data = { title: '預設標題', content: '預設內容' }
    const [info, setContent] = useState(data)

    return (<>
        <button onClick={handleClick}></button>
        <div title={info.title}>{info.content}</div>
        <ul>
            {listContent}
        </ul>
    </>)
}

export default List;