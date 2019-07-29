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
import {loginUser} from '../../store/thunks/userThunks';
import {withRouter} from "react-router-dom";
import styled from 'styled-components';

const StyledButton = styled(Button)`
    color: ${props => props.color}
    margin-top: 2rem
`;


class LoginNoRouter extends React.Component {
    initialState = {
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
        const {email, password} = this.state;
        
        //simple validation
        if (!email || !password) {
            this.setState({error: "please fill the form!"});
            return false;
        }
        
        this.setState({error: null});
        return true;
    };
    
    onSubmit = e => {
        e.preventDefault();
        if (!this.validateInput()) return;
        
        const {email, password} = this.state;
        
        //add user via addUser action
        Promise.resolve(this.props.loginUser({email, password}))
            .then(this.props.history.push.bind(this,"/"));
        
        //reset state
        //this.setState({...this.initialState});
    
        //get back to main page
        //this.props.history.push("/");
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
                        
                        {this.handleError()}
                        <StyledButton
                            color="dark"
                            block
                        >
                            Login as User
                        </StyledButton>
                    </FormGroup>
                </Form>
            </Container>
        );
    }
}


const Login = withRouter(LoginNoRouter);

export default connect(null, {loginUser})(Login);


