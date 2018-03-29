import React, { Component } from 'react'
import { Heading, Text, Box, SearchField, IconButton, Icon, Modal } from 'gestalt'



import UserProfileModal from './../UserProfileModal/UserProfileModal'

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value : ' ',
            profileModalisOpen: false
        }
    }

    __searchHandler(value) {
        this.props.searchHandler(value);
    }
    __logoutHandler(event) {
        this.props.logoutHandler();
    }

    openUPModal() {
        this.setState({ profileModalisOpen: true })
    }

    closeUPModal() {
        this.setState({ profileModalisOpen: false })
    }

    render() {

        // return (
        //         <div className="grid-cell cell--1of6" style={{borderRadius: '0px', borderRight: '1px solid #ccc', margin: '0px'}}>
        //             <div className='layout vertical justified' style={{height: '95vh'}}>
        //                 <div>
        //                     <span className="brand h4">Remind! <span role="img" aria-label="">💭</span></span>
        //
        //                     <div className="menu">
        //                         <div className="form no-margin">
        //                             <input className='input' onChange={this.__searchHandler} type="text" />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div>
        //                     <div className="">
        //                         <a className='button' onClick={this.__logoutHandler}> <Icon name='log-out' /> Sair</a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        // );

        return (

        <div>
            <Box color="white" shape="rounded" padding={3} display="flex" direction="row" alignItems="center">
         <Box padding={3}>
           <Heading size="xs">Crymistify 😭</Heading>
         </Box>
         <Box flex="grow" paddingX={2}>
           <SearchField
             accessibilityLabel="Demo Search Field"
             id="searchField"
             onChange={({ value }) => this.__searchHandler(value)}
             placeholder="Buscar"
             value={this.state.searchValue}
           />
         </Box>
         <Box paddingX={2}>
           <IconButton onClick={() => this.openUPModal() } accessibilityLabel="Profile" icon="person" size="md" />
         </Box>
       </Box>

       {this.state.profileModalisOpen && (
        <UserProfileModal closeFunction={this.closeUPModal.bind(this)} logoutFunction={this.__logoutHandler.bind(this)} />
      )}

       </div>

        );
    }
}
