import { Component} from 'react';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "Give a man a fish, and he'll eat for a day. Teach a man to fish, and he'll eat for a lifetime.",
      author: 'Lao Tsu'
    } 
    this.getQuote = this.getQuote.bind(this);
  }
  
   getQuote = async () => {
    let res = await axios.get("https://type.fit/api/quotes");
    if (res.status === 200){
      let { data } = res;
      let i = Math.floor(Math.random() * data.length);
      let {text, author} = data[i];
      this.setState({text, author});
    } 
  }
  
  render(){
    return <div className='container-fluid  center '>
    <div className='row border shadow-lg rounded flex-wrap w-50 d-flex justify-content-between align-items-center p-4' id='quote-box'>
        <blockquote id='text' className="col-12 blockquote ">
          <p className="mb-0">"{this.state.text}"</p>
          <footer id='author' className="blockquote-footer text-right">{this.state.author}</footer>
        </blockquote>
      <a id='tweet-quote'
        href={`twitter.com/intent/tweet?text=${encodeURIComponent(this.state.text).replace(' ', '%20')}%0A%0A${encodeURIComponent(this.state.author).replace(' ', '%20')}`}
        target='_blank'
        rel='noopener noreferrer'
        className='col-3 btn btn-outline-primary'>Tweet this quote!</a>
      <button 
        id='new-quote' 
        className='col-3 btn btn-success' 
        onClick={this.getQuote}>New quote</button>
    </div>
  </div>
  }
}


export default App;
