import React, { Component } from 'react'
import Service from './../API/API'

import { Avatar, Box, Column, Heading, Image, Text } from 'gestalt'

class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: 'User name',
            email: 'user@email.com',
            imgURI: 'http://some.link',
            emailVerified: false
        }
    }


    componentDidMount() {
        Service.getUser().subscribe(user => {
            console.log('UP', user)


            this.setState({
                displayName: user.displayName,
                email: user.email,
                imgURI: user.photoURL,
                emailVerified: user.emailVerified
            })
        })
    }


    render() {

        return [

            <Box display="flex" direction="row" paddingY={2} paddingX={5}>
                <Column span={2}>
                      <Avatar
                          name={this.state.displayName}
                          size="lg"
                          src={this.state.imgURI}
                          verified={this.state.emailVerified}
                          />
                </Column>
              <Column span={10}>
                <Heading size="sm">{this.state.displayName}</Heading>
                <Text>{this.state.email}</Text>
              </Column>
            </Box>

        ]

    }
}


export default UserProfile;
