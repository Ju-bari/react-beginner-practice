import logo from './logo.svg';
import './App.css';

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
          props.onChangeMode(topic.id);
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
  const topics = [
    { id: 1, title: 'HTML', body: 'HTML is HyperText Markup Language.' },
    { id: 2, title: 'CSS', body: 'CSS is Cascading Style Sheets.' },
    { id: 3, title: 'JavaScript', body: 'JavaScript is a programming language.' }
  ]
  return (
    <div>
      <Header title="REACT" onChangeMode={()=>{
        alert('header');
      }}></Header>
      <Nav topics={topics} onChangeMode={(id)=>{
        alert(id);
      }}></Nav>

      <Article title="Welcome" body="Hello, WEB!"></Article>
      <Article title="Welcome" body="Hello, React!"></Article>
      <Article title="Welcome" body="Hello, Spring!"></Article>
    </div>
  );
}

export default App;
