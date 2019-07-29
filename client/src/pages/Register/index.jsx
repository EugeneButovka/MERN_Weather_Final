import React from 'react';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import {registerUser} from '../../store/thunks/userThunks';


class Register extends React.Component {
    initialState = {
        name: '',
        email: '',
        password: '',
        error: null
    };
    
    state = {...this.initialState};
    
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({error: null});
    };
    
    validateInput = () => {
        const {name, email, password, password2} = this.state;
    
        //simple validation
        if (!name || !email || !password) {
            this.setState({error: "please fill the form!"});
            return false;
        }
        if (password !== password2) {
            this.setState({error: "passwords no not match!"});
            return false;
        }
    
        this.setState({error: null});
        return true;
    };
    
    onSubmit = e => {
        e.preventDefault();
        if (!this.validateInput()) return;
    
        const {name, email, password} = this.state;
    
    
        const newUser = {
            name,
            email,
            password
        };
    
        //reset state
        this.setState({...this.initialState});
        
        //try add user  and set waiting till done
        Promise.resolve(this.props.registerUser(newUser))
            .then(this.props.history.push.bind(this,"/"));
    };
    
    handleError() {
        if (this.state.error)
            return (
                <Alert color="danger">
                    {this.state.error}
                </Alert>
            )
    };
    
    render() {
        return (
            <Container>
                <Form
                    onSubmit={this.onSubmit}
                >
                    <FormGroup>
                        <Label for={"name"}>
                            Name
                        </Label>
                        <Input
                            type={"text"}
                            name={"name"}
                            id={"name"}
                            placeholder={"enter user name"}
                            onChange={this.onChange}
                        />
    
                        <Label for={"email"}>
                            E-Mail
                        </Label>
                        <Input
                            type={"text"}
                            name={"email"}
                            id={"email"}
                            placeholder={"enter user e-mail"}
                            onChange={this.onChange}
                        />
    
                        <Label for={"password"}>
                            Password
                        </Label>
                        <Input
                            type={"text"}
                            name={"password"}
                            id={"password"}
                            placeholder={"enter user password"}
                            onChange={this.onChange}
                        />
    
                        <Label for={"password2"}>
                            Repeat Password
                        </Label>
                        <Input
                            type={"text"}
                            name={"password2"}
                            id={"password2"}
                            placeholder={"enter password again"}
                            onChange={this.onChange}
                        />
                        {this.handleError()}
                        <Button
                            color={"dark"}
                            style={{marginTop: '2rem'}}
                            block
                        >
                            Add User
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}


export default connect(null, {registerUser})(Register);


