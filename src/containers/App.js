import React, {Component} from 'react'; 
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'; 
import ErrorBoundary from '../components/ErrorBoundary'; 
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        // fetch users, get response, update users with setState
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({ robots: users}));
    }

    onSearchChange = event => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const { robots, searchfield } = this.state; 
        const filteredRobots = robots.filter(robots => {
            // if the lowercase name of the robot includes the lowercase name in 
            // the searchfield, return robots which return true 
            return robots.name.toLowerCase().includes(searchfield.toLowerCase()); 
        })
        // if no robots 
        // ternary 
        return !robots.length ?
            <h1>Loading</h1> : 
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots = {filteredRobots} />   
                    </ErrorBoundary>
                </Scroll>
            </div>
        ); 
    }
}


export default App; 