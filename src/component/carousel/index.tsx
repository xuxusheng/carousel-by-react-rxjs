import * as React from 'react'
import { Observable, Subject } from 'rxjs'
import classNames from 'classnames'
const style = require('./index.scss')

interface Style {
    width?: number
    height?: number

    [name: string]: string | number
}

class Carousel extends React.Component<{
    style?: Style
    images: string[]
}, {
    current: number
    // displacement: number
    width: number
}>{
    constructor(props) {
        super(props)
        // TODO 创建两个 rxjs 数据流，一个emit定时器，一个emit用户操作
        let width = 500
        if (this.props.style && this.props.style.width) {
            width = this.props.style.width
        }
        this.state = {
            current: 0,
            // displacement: 0
            width
        }
    }

    render() {
        if (!this.props.images.length) {
            return <div/>
        }
        const {images} = this.props
        const {current, width} = this.state
        return (
            <div className={style['wrap']} style={this.props.style}>
                <div className={style['image-wrap']} style={{transform: `translate(${- current * width}px)`}}>
                    {
                        images.map((image, index) => {
                            return <div key={index}
                                        className={style['image-item']}
                                        style={{backgroundImage: `url(${image})`}}/>
                        })
                    }
                </div>
                <div className={style['btn-wrap']}>
                    {
                        images.map((image, index) => {
                            return <span key={index}
                                         className={classNames(style['btn-item'], {[style['active']]: current === index})}
                                         onClick={() => {this.setState({current: index})}} />
                        })
                    }
                </div>
            </div>
        )
    }

}

export default Carousel