import React, { Component } from 'react'
// import Icon from './../Icon/Icon'
import { Heading, Text, Box, SearchField, IconButton, Icon } from 'gestalt'

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = { value : ' '}

        this.__logoutHandler = this.__logoutHandler.bind(this)
    }

    __searchHandler(value) {
        this.props.searchHandler(value);
    }
    __logoutHandler(event) {
        this.props.logoutHandler(event.target.value);
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

            <Box color="white" shape="rounded" padding={3} display="flex" direction="row" alignItems="center">
         <Box padding={3}>
           <Heading size="xs">Crymistify</Heading>
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
           <IconButton
             accessibilityLabel="Notifications"
             icon="speech-ellipsis"
             size="md"
           />
         </Box>
         <Box paddingX={2}>
           <IconButton accessibilityLabel="Profile" icon="person" size="md" />
         </Box>
       </Box>

        );
    }
}
