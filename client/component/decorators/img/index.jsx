import React  from 'react'
import classNames from 'classnames'

import style from './css/style.scss'

export default class imgDec extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLDrag: false,
            activeRDrag: false,
            startDrag: false,
            startX: "",
            imgWidth: 600,
            imgCurrentWidth: 600,
            showOption: false,
        }
    }

    componentDidMount() {
        document.addEventListener("mouseup", (e) => {
            e.preventDefault()
            this.setState({
                startDrag: false,
                imgCurrentWidth: this.state.imgWidth
            })
        })
    }

    activeRDrag = (e) => {
        e.preventDefault()
        this.setState({
            activeRDrag: true
        })
    }

    startDrag = (e) => {
        e.preventDefault()
        this.setState({
            startDrag: true,
            startX: e.clientX,
        })
    }

    endDrag = () => {
        this.setState({
            startDrag: false,
            imgCurrentWidth: this.state.imgWidth
        })
    }

    move = (e) => {
        e.preventDefault()
        if(!this.state.startDrag) return
        const moveDis = this.state.startX - e.clientX
        this.setState({
            imgWidth: this.state.imgCurrentWidth - 2 * moveDis
        })
    }

    hideRDrag = (e) => {
        e.preventDefault()
        this.setState({
            startDrag: false,
            activeRDrag: false,
        })
    }

    showOption = (e) => {
        e.preventDefault()
        this.setState({
            showOption: true,
        })
    }

    hideOption = (e) => {
        e.preventDefault()
        this.setState({
            showOption: false,
        })
    }

    remove = () => {
        console.log("remove this image")
        this.props.remove(this.props.block.getKey());
    }

    render() {
        const rDragStyle = this.state.activeRDrag ? {[style.active]: true} : null

        return (
            <div
                className={style.wrap}
                style={{width: this.state.imgWidth}}
                onMouseEnter={this.showOption}
                onMouseLeave={this.hideOption}
            >
                <div>
                    <img src={this.props.src} />
                </div>
                <div
                    className={classNames(style.right, style.drag)}
                    onMouseOver={this.activeRDrag}
                    onMouseLeave={this.hideRDrag}
                    onMouseDown={this.startDrag}
                    onMouseUp={this.endDrag}
                    onMouseMove={this.move}
                >
                    <div
                        ref={this.dragRButtonRef}
                        className={classNames(style["drag-children"], style["drag-children-right"], rDragStyle)}
                        style={{display: this.state.showOption ? 'inline-block' : "none"}}
                    />
                </div>
                <div className={classNames(style["img-remove"], {[style["show-option"]]: this.state.showOption})}>
                    <span className={style["remove-option"]} onClick={this.remove}>remove</span>
                </div>
            </div>
        )
    }
}
