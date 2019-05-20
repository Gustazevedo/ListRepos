import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';  
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { AppBar, Typography } from '@material-ui/core';

const style = {
  header: {
    color: 'white',
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'center',
    lineHeight: '60px'
  },
  appBar: {
    background: '#2196f3',
    height: '60px',
    position: 'fixed'
  },
  alignCenter: {
    textAlign: 'center'
  },
  textDecoration: {
    textDecoration: 'none',
    fontSize: '25px'
  },
  list: {
    boxShadow: '2px 4px 4px #ddd',
    marginTop: '80px'
  },
  flexCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default class Pagina extends React.Component {

    constructor(props) {
      super(props);      
      this.state = {
        data: [],
        user: 'reactjs'
      }
    }

    componentDidMount() {
      fetch('https://api.github.com/users/'+this.state.user+'/repos?client_id=0b90887cdb48ce220a6d&client_secret=03d500c196d4dc03094067d122ae3f97cd4f8842')
      .then(response => response.json())
      .then(data => {
        this.setState({data: data})
        console.log(this.state)
      })
      .catch(error => console.error(error));
    }

    render() {     
      if(this.state === undefined){
        return(<p>A lista está sendo carregada...</p>)
      }
      return (
        <Grid container style={style.central}>
          <AppBar position="static" style={style.appBar}>
            <Typography style={style.header}>
              {'Repositories of \'' + this.state.user + '\''}
            </Typography>
          </AppBar>
          <Grid style={style.flexCenter}>
            <List style={{...style.list, paddingTop: '0px'}}>
              {this.state.data.map((x) => {
                return (
                  <Link key={x.id} to={'/'+x.name} style={{textDecoration: 'none', width: '100%'}}>
                    <ListItem button style={{width: '300px'}}>
                        <ListItemText primary={x.name} style={{textAlign: 'center', width: '100%'}}></ListItemText>
                    </ListItem>
                  </Link>
                )
              })}
            </List>
          </Grid>
        </Grid>          
      )
    }
}
