import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import DisplayLogo from './DisplayLogo.js';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $borderColor: String!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    render() {
        let text, color, fontSize, backgroundColor, borderColor;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel_panel_default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className = "panel_with_displayed_logo">
                                            <div className="panel-body">                                            
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                    updateLogo({ variables: { id: data.logo._id, 
                                                                            text: text.value, 
                                                                            color: color.value, 
                                                                            fontSize: parseInt(fontSize.value),
                                                                            backgroundColor: backgroundColor.value,
                                                                            borderColor: borderColor.value
                                                                            } });
                                                    text.value = "";
                                                    color.value = "";
                                                    fontSize.value = "";
                                                    backgroundColor.value = "";
                                                    borderColor.value = "";
                                                }}>
                                                    <div className="form-group">
                                                        <label htmlFor="text">Text:</label>
                                                        <input type="text" className="form-control" name="text" ref={node => {
                                                            text = node;
                                                        }} placeholder="Text" defaultValue={data.logo.text} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="color">Color:</label>
                                                        <input type="color" className="form-control" name="color" ref={node => {
                                                            color = node;
                                                        }} placeholder="Color" defaultValue={data.logo.color} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="fontSize">Font Size:</label>
                                                        <input type="text" className="form-control" name="fontSize" ref={node => {
                                                            fontSize = node;
                                                        }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="backgroundColor">Background Color:</label>
                                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                            backgroundColor = node;
                                                        }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="color">Border Color:</label>
                                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                                            borderColor = node;
                                                        }} placeholder="Border Color" defaultValue={data.logo.borderColor} />
                                                    </div>
                                                    <button type="submit" className="btn btn-success">Submit</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error. Please try again</p>}
                                            </div>
                                            <div id = "displayedLogoViewLogoScreen">
                                                <DisplayLogo logo = {data.logo} logoText = {data.logo.text}></DisplayLogo>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;