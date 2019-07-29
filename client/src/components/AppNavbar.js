import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button,
    Row,
    Col
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import { logoutUserAction } from '../store/actions/userActions'
import { clearWeatherDataAction } from '../store/actions/weatherActions'


class AppNavbarNoRouter extends React.Component {
    state = {
        isOpen: false
    };
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    
    logOut = () => {
        localStorage.removeItem('token');//logout by deleting user token
        this.props.logoutUserAction();
        this.props.history.push('/login');
        this.props.clearWeatherDataAction();
    };
    
    handleClick = (path) => {
        switch (path) {
            case 'login':
                this.props.history.push("/" + path);
                break;
            case 'register':
                this.props.history.push("/" + path);
                break;
            case 'logout':
                this.props.history.push("/" + path);
                break;
            default:
                this.props.history.push("/");
        }
    };
    
    renderButtons = () => {
        if (this.props.isLogined)
            return (
                <Button
                    color={"primary"}
                    style={{marginBottom: '2rem'}}
                    onClick={this.logOut}
                >
                    LogOut
                </Button>
            );
        return (
            <Container>
                <Row>
                    <Col>
                        <Button
                            color={"info"}
                            style={{marginBottom: '2rem'}}
                            onClick={this.handleClick.bind(this,'login')}
                        >
                            Login
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            color={"warning"}
                            style={{marginBottom: '2rem'}}
                            onClick={this.handleClick.bind(this,'register')}
                        >
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>
        
        );
    };
    
    renderNavLinks() {
        if (!this.props.isLogined)
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                            You need to login or register:
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        {this.renderButtons()}
                    </NavItem>
                </Nav>
            );
        
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/history">
                        History
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/about">
                        About
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/EugeneButovka/MERN_Weather_Final">
                        <u>Project Repository</u>
                    </NavLink>
                </NavItem>
                <NavItem>
                    {this.renderButtons()}
                </NavItem>
            </Nav>
        );
    }
    
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            MERN Weather
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {this.renderNavLinks()}
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    isLogined: state.userStore.isLogined,
    //requestCompleted: state.userStore.requestCompleted
});

const AppNavbar = withRouter(AppNavbarNoRouter);

export default connect(mapStateToProps, {logoutUserAction, clearWeatherDataAction})(AppNavbar)