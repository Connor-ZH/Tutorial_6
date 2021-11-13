import React, { Component } from 'react'
import { TouchableHighlight, View, Text,Alert, TextInput, StyleSheet, Button,  SafeAreaView, ScrollView, StatusBar} from 'react-native'
import { DataTable } from 'react-native-paper';
import {Query} from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { ApolloProvider, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import RNRestart from 'react-native-restart'; 




export default class RNApp extends Component {
  constructor() {
    super()
    this.state = {
      name: 'original',
    }
    this.onPress = this.onPress.bind(this);
  }
  onPress(){
    this.setState({
      name:"refreshed"
    })
    RNRestart.Restart();
    Alert.alert("The waitlist has been refreshed")
  }
  render () {
    const read_entry_list = gql`query read_entry_list{
      read_entry_list {
        serial_number 
        name 
        phone_number 
        time_stamp
      }
    }`;

    const EntryComponent = graphql(read_entry_list)((props) => {
      const { error, read_entry_list } = props.data
      if (error) {
        return <Text>{error}</Text>
      }
      if (read_entry_list) {
        return (
          <View> 
            {
              read_entry_list.map((entry) => {
                return <DataTable.Row key={entry.serial_number} >
                       <DataTable.Cell style={{flex:1,textAlign: 'center'}}> {entry.serial_number}</DataTable.Cell>
                       <DataTable.Cell style={{flex:2,textAlign: 'center'}}> {entry.name}</DataTable.Cell>
                       <DataTable.Cell style={{flex:3,textAlign: 'center'}}> {entry.phone_number}</DataTable.Cell>
                       <DataTable.Cell style={{flex:4,textAlign: 'center'}}> {entry.time_stamp}</DataTable.Cell>
                       </DataTable.Row>
              }
              )
            }
          </View>
        )
      }
      return <Text>Loading...</Text>
    })

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} >
          <Text style={{textAlign: 'center' ,fontWeight: 'bold',fontSize: 30}}>Customers Info</Text>
          <View><Button title="Refresh the table" onPress={this.onPress}/></View>
            <DataTable style={{textAlign: 'center' ,fontWeight: 'bold'}}>
              <DataTable.Header >
                <DataTable.Title style={{flex:1}}>No. </DataTable.Title>
                <DataTable.Title style={{flex:2}}>Name </DataTable.Title>
                <DataTable.Title style={{flex:3}}>Phone</DataTable.Title>
                <DataTable.Title style={{flex:4}}>Time Stamp</DataTable.Title>
              </DataTable.Header>
                <EntryComponent />
            </DataTable>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    backgroundColor: 'lightblue',
  },


  input: {
    backgroundColor: '#dddddd',
    height: 50,
    margin: 20,
    marginBottom: 0,
    paddingLeft: 10
  }
})

