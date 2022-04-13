import './MyTitle.scss';


function MyTitle(props) {
    return (
        <div className={props.className + ' my-title'}>
            <h1>Benjamin Raymond</h1>
            <h2>Full Stack Engineer</h2>
        </div>
    );
}

export default MyTitle;
