import "./index.scss"
import React, {Component} from 'react';


class WWW extends Component {
state = {message:'', body:''}
  async componentDidMount() {
    const response =  await fetch('http://localhost:1337/api/v1/root/')
    const data = await response.json()
    console.log(data)

    this.setState(data);

  }

  render() {
  const{message, body} = this.state
    return (
      <div>
        {message}
        {body}
      </div>
    );
  }
}

export default WWW;
