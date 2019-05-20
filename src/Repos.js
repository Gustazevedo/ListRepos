import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import { AppBar, Icon, IconButton, Typography, InputBase } from '@material-ui/core';

// const style = {
//     header: {
//         fontWeight: 'bold',
//         color: 'gray'
//     },
//     alignCenter: {
//       textAlign: 'center'
//     },
//     textDecoration: {
//       textDecoration: 'none',
//       fontSize: '25px'
//     },
//     fontWhite: {
//         color: 'white',
//         textDecoration: 'none'
//     }
//   };

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
      position: 'fixed',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
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

export default class Repos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            authors: []
        }
    }

    componentDidMount() {
        const url = window.location.href.split("/")[3];
        fetch('https://api.github.com/repos/reactjs/'+url+'/commits?client_id=0b90887cdb48ce220a6d&client_secret=03d500c196d4dc03094067d122ae3f97cd4f8842')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({data: data.filter((x, index) => {if (index < 20) return x}), authors: data.filter((x, index) => {if (index < 20) return x})});
        })
        .catch(error => console.error(error));  
    }

    searchForCommits(e) {
        const value = e.currentTarget.value;
        if (value === "" || value === undefined || value === null) {
            this.setState({authors: this.state.data});
            return;
        }
        this.setState({authors: this.state.data.filter((x, i) => x.author.login.includes(value))});
    }

    render() {      
        if(this.state === undefined){
            return(<p>Carregando</p>)
        }
        return (
            <Grid container style={style.central}>
                <AppBar position="static" style={style.appBar}>
                    <Link to="/" style={{width: '60px', position: 'absolute', left: '0', textDecoration: 'none', color: 'white', marginLeft: 10}}>
                        <IconButton color="inherit" aria-label="Return">
                            <Icon>keyboard_arrow_left</Icon>
                        </IconButton>
                    </Link>
                    <Typography style={style.header}>
                    {'Commit authors of \'' + window.location.href.split('/')[3] + '\''}
                    </Typography>
                    <Grid style={{position: 'absolute', right: '0', marginRight: '20px', background: '#59B0F6', borderRadius: '5px', display: 'flex'}}>
                        <Icon style={{margin: '5px', height: '100%'}}>search</Icon>
                        <InputBase 
                        style={{color: 'white', textDecoration: 'none'}}
                        value={this.state.name}
                        onChange={($event) => this.searchForCommits($event)}
                        placeholder="Search..."
                        />
                    </Grid>
                </AppBar>
                <Grid style={style.flexCenter}>
                    <List style={{...style.list, paddingTop: '0px'}}>
                    {this.state.authors.map((x, i) => {
                        return (
                        <ListItem button style={{width: '300px', textDecoration: 'none'}}>
                            <ListItemText primary={x.author && x.author.login} style={{textAlign: 'center', width: '100%'}}></ListItemText>
                        </ListItem>
                        )
                    })}
                    </List>
                </Grid>
            </Grid>
        )
    }
}
