
const Block: React.FC = (flag = true) => {
    let divContent ;
    const divTitle = "標籤標題"
    divContent = flag ? <span>flag為true</span> : <p>flag為false</p>

    return (
        <div title={divTitle}>
            {divContent}
        </div>
    )
}

export default Block;

