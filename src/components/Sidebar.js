import React, { Component } from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { inject, observer } from 'mobx-react';
import Menu from 'react-burger-menu/lib/menus/slide'
import { Flex } from 'rebass';

const SidebarResponsiveContainer = styled.div`
    ${breakpoint('desktop') `
        display: none;
    `}
`

var styles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '30px',
      height: '24px',
      right: '20px',
      top: '20px'
    },
    bmBurgerBars: {
      background: 'white'
    },
    bmCrossButton: {
      height: '40px',
      width: '40px',
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }  

@inject('userStore')
@observer
export default class Sidebar extends Component {
  
    render () {
      const { userStore } = this.props;
      const { currentUser } = userStore;
      return (
        <SidebarResponsiveContainer>
          <Menu right styles={styles} {...this.props}>
            <Flex>
              {currentUser &&
                <Navlinkcontainer >
                  <NavLink href="/account">
                    <Avatar size={40} user={currentUser}/>
                  </NavLink>
                </Navlinkcontainer>}
                {!currentUser &&
                <Navlinkcontainer>
                  <NavLink key={"/register"} href={"/register"}>Sign Up</NavLink>
                </Navlinkcontainer>
                }
              {!currentUser &&
                <Navlinkcontainer>
                  <NavLink key={"/login"} href={"/login"}>Login</NavLink>
                </Navlinkcontainer>
              }
            </Flex>
          </Menu>
        </SidebarResponsiveContainer>
      );
    }
}
