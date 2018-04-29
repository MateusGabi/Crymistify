/** @format */

import React from 'react';
import * as Package from '../../package.json'
import { Box, Divider, Text } from 'gestalt';

const Footer = () => [
    <Divider key={0} />,
    <Box padding={12} key={1}>
        <Text align="center">
            &copy; {new Date().getFullYear()} desenvolvido com ❤️️ por{' '}
            <strong>Mateus Gabi Moreira</strong> v{Package.version}
        </Text>
    </Box>,
];

export default Footer;
