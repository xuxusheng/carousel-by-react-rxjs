import 'babel-polyfill'

import * as React from 'react'
import {render} from 'react-dom'

import Carousel from './component/carousel/index'

class App extends React.Component<any, {}> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const src = [require('./image/1.jpg'), require('./image/2.jpg'), require('./image/3.jpg')]
        return (
            <Carousel images={src} />
        )
    }
}

render(<App/>, document.querySelector('#root'))