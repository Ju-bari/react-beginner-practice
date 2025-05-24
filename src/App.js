import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  console.log('props', props);
  console.log('>>>', props.title);
  return (
    <header>
      <h1><a href='/' onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const list = [];
  for (let i = 0; i < props.topics.length; i++) {
    let topic = props.topics[i];
    list.push(
      <li key={topic.id} title={topic.body}>
        <a href={'/read/' + topic.id} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(Number(topic.id)); // HTML 태그에서 정보가 들어오면 문자로 바뀜
        }}>
        {topic.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>
        {list}
      </ol>
    </nav>
  )
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </article>
  )
}

function App() {
  // const _mode = useState('WELCOME');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: 'HTML', body: 'HTML is HyperText Markup Language.' },
    { id: 2, title: 'CSS', body: 'CSS is Cascading Style Sheets.' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is a programming language.' }
  ]

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  } else if (mode === 'READ') {
    content = <Article title={topics[id-1].title} body={topics[id-1].body}></Article>
  }

  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        // alert('header');
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        // alert(id);
        setMode('READ');
        setId(_id);
      }}></Nav>

      <p>-----</p>
      {content}
      <p>-----</p>
      <Article title="Welcome" body="Hello, React!"></Article>
      <Article title="Welcome" body="Hello, Spring!"></Article>
    </div>
  );
}

export default App;
