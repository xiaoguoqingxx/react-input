import React, { Component } from 'react';
import '../css/font.css';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { color, initcolor } from '../config';
import { CheckIsColor } from '../common/trans';
const outer = css`${props => props.allcss}`;
const inner = css`${props => props.incss}`;
const Inputcss = styled.div`
    width:${props => typeof props.width === "number" ? props.width + "px" : props.width};
    height:${props => typeof props.height === "number" ? props.height + "px" : props.height};
    position:relative;
    ${outer}
    input{
        display:block;
        width:100%;
        padding-right:${(props) =>{
            if(props.hasclose){
                return "25px"
            } else{
                return "10px"
            }
        }};
        outline:none;
        padding-left:${props => typeof props.height === "number" ? props.height + "px" : props.height};
        height:100%;
        position:relative;
        border-radius:${props => typeof props.borderradius === "number" ? props.borderradius + "px" : props.borderradius};
        border:${props => props.borderwidth}px solid ${props => {
            if (props.usetheme) {
                if (CheckIsColor(props.theme)) {
                    return props.theme
                } else {
                    return color[props.theme] || props.bordercolor
                }
            } else {
                return props.bordercolor
            }
        }};
        background:${props => props.background};
        font-size:${props => typeof props.fontsize === "number" ? props.fontsize + "px" : props.fontsize};
        color:${props => props.fontcolor};
        box-shadow:${props => props.boxshadow};
        transition:all 0.2s;
        &:focus{
            box-shadow:${props => props.activeboxshadow}
        }
        ${inner}
    }
    .cha{
        position:absolute;
        right:5px;
        top:50%;
        z-index:10;
        margin-top:-7px;
        cursor:pointer;
        font-size:${props => typeof props.iconsize === "number" ? props.iconsize + "px" : props.iconsize};
        color:${props => {
            if (props.usetheme) {
                if (CheckIsColor(props.theme)) {
                    return props.theme
                } else {
                    return color[props.theme] || props.iconcolor
                }
            } else {
                return props.iconcolor
            }
        }};
        &:before{
            color:${props => {
                if (props.usetheme) {
                    if (CheckIsColor(props.theme)) {
                        return props.theme
                    } else {
                        return color[props.theme] || props.iconcolor
                    }
                } else {
                    return props.iconcolor
                }
            }}
        }
    }
    .search-icon{
        width:${props => typeof props.height === "number" ? props.height + "px" : props.height};
        height:${props => typeof props.height === "number" ? props.height + "px" : props.height};
        position:absolute;
        left:0;
        top:0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
    .search{
        font-size:${props => typeof props.searchsize === "number" ? props.searchsize + "px" : props.searchsize};
        cursor: pointer;
        color:${props => {
        if (props.usetheme) {
            if (CheckIsColor(props.theme)) {
                return props.theme
            } else {
                return color[props.theme] || props.iconcolor
            }
        } else {
            return props.iconcolor
        }
    }};
        &:before{
            color:${props => {
        if (props.usetheme) {
            if (CheckIsColor(props.theme)) {
                return props.theme
            } else {
                return color[props.theme] || props.iconcolor
            }
        } else {
            return props.iconcolor
        }
    }}
        }
    }
`;
class SearchInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.defaultValue || "",
        }
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.refresh) {
            this.setState({
                value: props.defaultValue
            })
        }
    }
    handleChange(event){
        let value = event.target.value.replace(/(^\s*)|(\s*$)/g, "");
        if (this.props.pattern) {
            value = event.target.value.replace(this.props.pattern, "");
        }
        this.setState({
            value: value
        });
        this.props.changeContent && this.props.changeContent(value,this.props.name)
    }
    handleFocus(){
        this.props.focusContent && this.props.focusContent("", this.props.name)
    }
    clickClear(){
        this.setState({
            value: ""
        },()=>{
            
        });
        this.props.changeContent && this.props.changeContent("",this.props.name)
    }
    changeType(str) {
        this.setState({
            type: str
        })
    }
    render() {
        return (
            <Inputcss
                {...this.props}
            >
                <input
                    style={{boxSizing:"border-box"}}
                    type="text"
                    name={this.props.name}
                    autoComplete="new-password"
                    readOnly={this.props.readonly}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    maxLength={this.props.maxlength}
                    onChange={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                />
                <div className="search-icon">
                    <span className="search icon-search"></span>
                </div>
                {
                    this.props.hasclose && this.state.value !== "" &&
                    <span className="cha icon-cha" onClick={this.clickClear.bind(this)}></span>
                }
            </Inputcss>
        );
    }
}
SearchInput.defaultProps = {
    issearch:false,//是否是直接输入就搜索的框
    usetheme:false,//是否使用主题
    hasclose:true,//要不要删除
    defaultValue: "",//默认值字符串
    theme: "blue",//blue 蓝色 purple 紫色 green 绿色
    width: 200,//数字 
    height: 30,//数字 
    borderradius: 2,//数字 单位像素
    borderwidth: 1,//数字 单位像素
    bordercolor: initcolor,//字符串 16进制的 或者rgb值
    boxshadow: "none",//完整的box-shadow 样式 字符串
    background:"transparent",//字符串 16进制的 或者rgb值 或者完整的background
    fontsize:14,//数字
    allcss: "",//字符串类型的css 代码
    incss: "",//字符串类型的css 代码
    readonly:false,//是否可读 bool值
    placeholder: "请输入内容",//字符串
    maxlength: 200,//数字 最大长度
    name:"",//表单默认的值
    fontcolor:"#333",
    refresh: false,//是否刷新state bool值
    iconcolor: initcolor,
    activeboxshadow:"none",
    pattern:null,//外部正则
    iconsize:14,
    searchsize:16
};
SearchInput.propTypes={
    issearch: PropTypes.bool,
    usetheme: PropTypes.bool,
    hasclose: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    theme: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    borderradius: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    borderwidth: PropTypes.number,
    bordercolor: PropTypes.string,
    boxshadow: PropTypes.string,
    background: PropTypes.string,
    fontsize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    allcss: PropTypes.string,
    incss: PropTypes.string,
    readonly: PropTypes.bool,
    placeholder: PropTypes.string,
    maxlength: PropTypes.number,
    name: PropTypes.string,
    fontcolor: PropTypes.string,
    refresh: PropTypes.bool,
    iconcolor: PropTypes.string,
    pattern: PropTypes.object,
    activeboxshadow: PropTypes.string,
    iconsize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    searchsize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};
export default SearchInput;