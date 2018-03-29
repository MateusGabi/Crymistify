import React, { Component } from 'react'
import { Box, Divider, Text } from 'gestalt'

const Footer = () => [
    <Divider />,
    <Box
        padding={12}
    >
        <Text align="center">
            &copy; {new Date().getFullYear()} desenvolvido com ❤️️ por <strong>Mateus Gabi Moreira</strong> v. 1.0.1
        </Text>
    </Box>
]

export default Footer;
