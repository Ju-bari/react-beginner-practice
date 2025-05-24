import './App.css';
import { useState } from 'react';

function Header(props) {
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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event=> {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value
          props.onCreate(title, body);
        }
      }>
        <p><input type='text' id='title' name='title' placeholder='title'></input></p>
        <p><textarea type='text' id='body' name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='Submit'></input></p>
      </form>
    </article>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.topics[props.id].title) // 사용을 위해 props -> state로 환승 (변경을 위해)
  const [body, setBody] = useState(props.topics[props.id].body)

  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event=> {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value
          props.onUpdate(title, body);
        }
      }>
        <p><input type='text' id='title' name='title' placeholder='title' value={title} onChange={event=>{
          setTitle(event.target.value);
        }}></input></p>
        <p><textarea type='text' id='body' name='body' placeholder='body' value={body} onChange={event=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type='submit' value='Submit'></input></p>
      </form>
    </article>
  )
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 0, title: 'HTML', body: 'HTML is HyperText Markup Language.' },
    { id: 1, title: 'CSS', body: 'CSS is Cascading Style Sheets.' },
    { id: 2, title: 'JavaScript', body: 'JavaScript is a programming language.' }
  ]);

  let content = null;
  let updateContext = null;

  if (mode === 'WELCOME') {
  } else if (mode === 'READ') {
    content = <Article title={topics[id].title} body={topics[id].body}></Article>
    updateContext = <button onClick={event=>{
        setMode('UPDATE');
      }}>Update</button>
  } else if (mode === 'CREATE') {
    content = <Create topics={topics} onCreate={(_title, _body)=>{
        const newTopic = {id: topics.length, title:_title, body:_body};
        const newTopics = [...topics] // 원시타입X의 상태관리 -> 새로운 변수로 메모리 주소 바꾸는 느낌
        newTopics.push(newTopic);
        setTopics(newTopics);
        // 이후 로직
        setMode('READ');
        setId(newTopics.length-1);
      }
    }></Create>
  } else if (mode === 'UPDATE') {
    content = <Update topics={topics} id={id}
      onUpdate={(_title, _body) => {
        const newTopic = {title:_title, body:_body};
        const newTopics = [...topics]
        newTopics[id] = newTopic;
        setTopics(newTopics);
        // 이후 로직
        setMode('READ')
      }}>
    </Update>
  }
  return (
    <div>
      <Header title="Board" onChangeMode={()=>{
        setMode('WELCOME');
        setId(null);
      }}></Header>

      <button onClick={event=>{
        setMode('CREATE')
      }}>Create</button>
      {updateContext}

      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;