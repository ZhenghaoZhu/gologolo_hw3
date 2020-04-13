import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {Button} from 'react-materialize';
import M from 'materialize-css';

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
      ms
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container row">
                            <div id = "recent_work_div" className="col s4">
                                <h3 id = "recent_work_home">Recent Work</h3>
                                {data.logos.sort((a, b) => Number(b.ms) - Number(a.ms)).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{"• " + logo.text}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    Gologolo
                                </div>
                                <div>
                                    <Button id="add_logo_button">
                                        <Link  id = "add_logo_link" to="/create">            Add Logo            </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query>
        );
    }

}

export default HomeScreen;
