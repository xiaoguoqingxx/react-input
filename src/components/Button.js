import React, { Component } from 'react';
import '../css/font-awesome.min.css';
import '../css/font.css';
import styled, { css } from 'styled-components';
import { TweenMax, Linear } from 'gsap';
import PropTypes from 'prop-types';
import { color, initcolor } from '../config';
import { CheckIsColor } from '../common/trans';
import _ from "lodash";
const outer = css`${props => props.allcss}`;
const Buttons = styled.div`
    ${props => props.width ? `width:${typeof props.width === "number" ? props.width - props.borderWidth * 2 + "px" : props.width};`:""};
    height:${props => typeof props.height === "number" ? props.height - props.borderWidth * 2 + "px" : props.height};
    position:relative;
    font-size:var(--middlesize);
    ${outer}
    button{
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        outline:none;
        height:100%;
        border-radius:${props => typeof props.borderRadius === "number" ? props.borderRadius + "px" : props.borderRadius};
        border: ${props => props.borderWidth}px solid ${props => {
            if (props.usetheme) {
                if (CheckIsColor(props.theme)) {
                    return props.theme
                } else {
                    return color[props.theme] || props.borderColor
                }
            } else {
                return props.borderColor
            }
        }};
        background: ${props => {
            if (props.usetheme) {
                if (CheckIsColor(props.theme)) {
                    return props.theme
                } else {
                    return color[props.theme] || props.background
                }
            } else {
                return props.background
            }
        }};
        ${props => props.width?`width:100%;`:"padding:0 10px;"}
        color:${props => props.fontColor};
        cursor:${props=>props.cursors?"not-allowed":"pointer"};
        transition:all 0.2s;
        font-size:${props => typeof props.fontSize === "number" ? props.fontSize + "px" : props.fontSize};
    }
    
`;
class Button extends Component {
    handleClick(e){
        this.props.doClick && this.props.doClick(e);
    }
    render() {
        return (
            <Buttons
             {...this.props}
            >
                <button type={this.props.type?this.props.type:"button"} onClick={this.handleClick.bind(this)}>
                    {this.props.name}
                </button>
            </Buttons>
        );
    }
}

Button.defaultProps = {
    usetheme: false,
    theme: "blue",
    name: "搜索",
    height: 30,
    allcss: "",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: initcolor,
    background: initcolor,
    fontSize: 14,
    fontColor: "#fff",
    cursor:"pointer"
};
Button.propTypes = {
    usetheme: PropTypes.bool,
    theme: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    
    allcss: PropTypes.string,
    borderRadius: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    background: PropTypes.string,
    fontSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    fontColor: PropTypes.string,
    cursor: PropTypes.string,
};
export default Button;