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
    interval?: number
    images: string[]
}, {
    current: number
    // displacement: number
    interval
    width: number
}>{
    constructor(props) {
        super(props)
        let width = 500
        if (this.props.style && this.props.style.width) {
            width = this.props.style.width
        }
        let interval = this.props.interval || 3000
        this.state = {
            current: 0,
            interval,
            width
        }
    }

    timer$

    unsubscribe

    componentDidMount() {
        this.timer$ = new Subject<Observable<number>>()

        this.unsubscribe = this.timer$.switch().subscribe(() => {
            let current = this.state.current + 1 < this.props.images.length ? this.state.current + 1 : 0
            this.setState({
                current
            })
        })
        this.nextTimer()
    }

    componentWillUnmount() {
        this.unsubscribe.unsubscribe()
    }

    nextTimer = () => {
        this.timer$.next(Observable.interval(this.state.interval))
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
                                         onClick={() => {this.setState({current: index}); this.nextTimer()}} />
                        })
                    }
                </div>
            </div>
        )
    }

}

export default Carousel