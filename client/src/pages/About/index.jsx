import React from 'react';
import {
    Alert,
    Button,
    Container, Form, FormGroup, Input,
    Label, ListGroup, ListGroupItem,
    Card
} from 'reactstrap';
import {connect} from 'react-redux';
import {getCurrentUser, updateCurrentUser} from '../../store/thunks/userThunks';
import {StyledHeaderMain, StyledHeaderSecondary} from '../../components/shared/StyledHeaders'


class About extends React.Component {
    componentDidMount() {
        this.performUserInfoRequest();
    }
    
    performUserInfoRequest = () => {
        
        console.log('Loading user info, user ID:',);
        
        try {
            this.props.getCurrentUser();
            return true;
        }
        catch (err) {
            console.log('user info request fail!');
            throw err;
        }
    };
    
    
    initialState = {
        name: '',
        password: '',
        error: null
    };
    
    state = {...this.initialState};
    
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({error: null});
    };
    
    validateInput = () => {
        const {name, password, password2} = this.state;
        
        //simple validation
        if (!name || !password) {
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
        
        const {name, password} = this.state;
        
        
        const newUserInfo = {
            name,
            password
        };
        
        //reset state
        this.setState({...this.initialState});
        
        //try update user info
        try {
            this.props.updateCurrentUser(newUserInfo);
        } catch (err) {
            this.setState({error: err.message});
        }
        this.setState({error: "Update success! Refresh the page"});
    };
    
    handleError() {
        if (this.state.error)
            return (
                <Alert color="danger">
                    {this.state.error}
                </Alert>
            )
    };
    
    
    renderUserInfoTable() {
        if (this.props.isLoading)
            return <div>Loading user info from DB...</div>;
        
        if (this.props.error)
            return <div>Error! {this.props.error}</div>;
        
        if (!this.props.requestCompleted)
            return <div>Loading</div>;
        
        return (
            <ListGroup>
                <ListGroupItem>
                    <Label>
                        Name: <b>{this.props.userData.name}</b>
                    </Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label>
                        E-Mail: <b>{this.props.userData.email}</b>
                    </Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label>
                        Register date and time: <b>{this.props.date}</b>
                    </Label>
                </ListGroupItem>
            </ListGroup>
        );
    };
    
    renderUserDataInput() {
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
                            Update User info
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
    
    render() {
        if (!this.props.requestCompleted) return <div>Loading</div>;
        return (
            <Container>
                <StyledHeaderMain>
                    User cabinet
                </StyledHeaderMain>
                <StyledHeaderSecondary>
                    User Info
                </StyledHeaderSecondary>
                {this.renderUserInfoTable()}
                <br/>
                <StyledHeaderSecondary>
                    Edit Info
                </StyledHeaderSecondary>
                <Card>
                    {this.renderUserDataInput()}
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    let date = new Date();
    date.setTime(Date.parse(state.userStore.currentUserData.register_date));
    
    return ({
        userData: state.userStore.currentUserData,
        date: date.toLocaleString(),
        error: state.userStore.error,
        isLoading: state.userStore.isLoading,
        requestCompleted: state.userStore.requestCompleted,
    });
};

export default connect(mapStateToProps, {getCurrentUser, updateCurrentUser})(About);