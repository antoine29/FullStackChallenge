/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    },
})

/* Heads up!
 * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
 * components for such things.
 */
// const HomepageHeading = ({ mobile }) => (
//     <Container text>
//         <Header
//             as='h1'
//             content='Imagine-a-Company'
//             inverted
//             style={{
//                 fontSize: mobile ? '2em' : '4em',
//                 fontWeight: 'normal',
//                 marginBottom: 0,
//                 marginTop: mobile ? '1.5em' : '3em',
//             }}
//         />
//         <Header
//             as='h2'
//             content='Do whatever you want when you want to.'
//             inverted
//             style={{
//                 fontSize: mobile ? '1.5em' : '1.7em',
//                 fontWeight: 'normal',
//                 marginTop: mobile ? '0.5em' : '1.5em',
//             }}
//         />
//         <Button primary size='huge'>
//             Get Started
//       <Icon name='right arrow' />
//         </Button>
//     </Container>
// )

// HomepageHeading.propTypes = {
//     mobile: PropTypes.bool,
// }

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
        <DesktopContainer Media={Media}>{children}</DesktopContainer>
        <MobileContainer Media={Media}>{children}</MobileContainer>
    </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

export default ResponsiveContainer