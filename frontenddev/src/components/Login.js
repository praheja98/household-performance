import React,{Component} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import '../App.css';
import { withCookies, Cookies } from 'react-cookie';

class Login extends Component {

constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {loggedIn:false , username:'' , password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
}

handleSubmit(event) {

event.preventDefault();
const {cookies} = this.props;


fetch('http://localhost:3017/processLogin1' , {
method:'POST',
credentials:'include',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
    uname:this.state.username,
    pword:this.state.password
})
})
.then(response => response.json()) 
.then(data => {
console.log('test completed');
console.log(data);
console.log('test completed 1');
if(data.authorized) {
    cookies.set('loginCredentials','loggedIn');
    this.setState({loggedIn:true});
}




})

}

handleUsernameChange(event) {
    event.preventDefault();
    this.setState({username:event.target.value});
}

handlePasswordChange(event) {
    event.preventDefault();
    this.setState({password:event.target.value});
}

componentDidMount() {
    const {cookies} = this.props;
    console.log('cookie info');
    console.log(cookies.get('loginCredentials'))
    if(cookies.get('loginCredentials')) {
        this.setState({loggedIn:true});
    }
    console.log('cookie info 1');
}

render() {

    return (
        <div className='login-container'>
        { this.state.loggedIn ?
            <Alert variant='info'> Congratulations you are logged in  </Alert>
            : 
            
            <Form id='login'>
            <Form.Label> Enter username</Form.Label>
            <Form.Control type='text' placeholder='Enter username' onChange={this.handleUsernameChange} />
            <Form.Label> Enter password </Form.Label>
            <Form.Control type='password' placeholder='Enter password' onChange={this.handlePasswordChange}/>
            <Button variant='primary' onClick={this.handleSubmit}> Login </Button>

        </Form>

        }

        </div>

    )




}

}

export default withCookies(Login);
