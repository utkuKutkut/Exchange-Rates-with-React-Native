import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import io from 'socket.io-client/dist/socket.io';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
import { Table, Row, Rows,Col,TableWrapper,Cell } from 'react-native-table-component';
import { Image } from 'react-native'
import { TextInput } from 'react-native';
import {
  TouchableOpacity,
} from 'react-native';

console.disableYellowBox = true;


const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'], 
 };

  

 
export default class App extends React.Component {
 
  constructor() {
    
    super();
  
    this.state = {
      
       yorum: '',
       dolarRate: 5.13,
       oldDolar: 5.13,
       euroRate: 6.12,
       oldEuro: 6.12,
       bitcoinRate: 9000,
       oldBitcoin: 9000,
       x:1,
       tableHead: ['Dolar', 'Euro', 'BitCoin'],
       tableData1: [
         ['5.13']
       ],
       tableData2: [
        ['6.12']
      ],
      tableData3: [
        ['9000']
      ],
       
       connectionConfig : connectionConfig
    };

  }
  
  

  componentDidMount() { 
  
    // connection to our web server //
    socket = io('https://exchange-rates.azurewebsites.net/', this.connectionConfig);
    socket.on('connect', function(){
      
   });
   
   socket.on('updateDolar', function (response) {
   
    this.changeState( response.data.dolarRate );
    

   }.bind(this));
    socket.on('updateEuro', function (response) {
    
     this.changeState2( response.data.euroRate );
     
   }.bind(this));
   socket.on('updateBitcoin', function (response) {
    
    this.changeState3( response.data.bitcoinRate);
    
  }.bind(this));

  socket.on('OldDolar', function (response) {
    this.changeState4( response.data.oldDolar);
    
  }.bind(this));
  socket.on('OldEuro', function (response) {
    this.changeState5( response.data.oldEuro);
    
  }.bind(this));
  socket.on('OldBitcoin', function (response) {
    this.changeState6( response.data.oldBitcoin);
    
  }.bind(this));
  }

 

  changeState = dolarRate => {
    this.setState({ dolarRate });
    this.setState({  tableData1: [
      [this.state.dolarRate]
    ] });
    this.setState({  tableData2: [
      [this.state.euroRate]
    ] });
    this.setState({  tableData3: [
      [this.state.bitcoinRate]
    ] });

  };
  changeState2 = euroRate => {
    this.setState({ euroRate });
    this.setState({  tableData1: [
      [this.state.dolarRate]
    ] });
    this.setState({  tableData2: [
      [this.state.euroRate]
    ] });
    this.setState({  tableData3: [
      [this.state.bitcoinRate]
    ] });

  };
  changeState3 = bitcoinRate => {
    this.setState({ bitcoinRate });
    this.setState({  tableData1: [
      [this.state.dolarRate]
    ] });
    this.setState({  tableData2: [
      [this.state.euroRate]
    ] });
    this.setState({  tableData3: [
      [this.state.bitcoinRate]
    ] });

  };


  // this part is important to compare old and new values. If there is a change, we need to indicate it (red or blue) //

  changeState4 = oldDolar => {
    this.setState({ oldDolar });

  };
  changeState5 = oldEuro => {
    this.setState({ oldEuro });

  };
  changeState6 = oldBitcoin => {
    this.setState({ oldBitcoin });

  }; 

  

  SendDataFunction = () => {

    socket.emit('comment', this.state.yorum);

  }

  render() {
    const state = this.state;

    
    if((this.state.dolarRate+0.01)<(this.state.oldDolar+0.01) &&(this.state.euroRate+0.01)<(this.state.oldEuro+0.01)) {
      
      return(
        <View style={styles.container}>
          <Image source={{uri: 'https://miro.medium.com/max/2800/0*oCCcB15sWlEQinu3.png'}}
              style={{width: 325, height: 150}} />
        <Text style={styles.renk}> {'\n'}{'\n'}Current Exchange Rates{'\n'}
          
        </Text>
          
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead}  textStyle={styles.head}/>
          <TableWrapper style={styles.wrapper}>
            
            <Col data={state.tableData1}  heightArr={[20]} textStyle={styles.textRed}/>
            <Col data={state.tableData2} heightArr={[20]}  textStyle={styles.textRed}/>
            <Col data={state.tableData3} heightArr={[20]}  textStyle={styles.textBlue}/>
            
          </TableWrapper>
        </Table>
        <Text > {'\n'}{'\n'} </Text>
       
        <TextInput  
                    onChangeText={data => this.setState({ yorum: data })}
                    
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="Write some comment here..."  
               
                />  
        <Text > {'\n'}{'\n'} </Text>
       
   
        <TouchableOpacity  style={styles.button} onPress={this.SendDataFunction} activeOpacity={0.7} style={styles.button} >
       
 <Text style={styles.textRed}>Send Comment </Text>

</TouchableOpacity>
      </View>
      );
  }

    else if ((this.state.dolarRate+0.01)>=(this.state.oldDolar+0.01) && (this.state.euroRate+0.01)<(this.state.oldEuro+0.01))
{      
  return(
    <View style={styles.container}>
      <Image source={{uri: 'https://miro.medium.com/max/2800/0*oCCcB15sWlEQinu3.png'}}
              style={{width: 325, height: 150}} />
        <Text style={styles.renk}> {'\n'}{'\n'}Current Exchange Rates{'\n'}
          
        </Text>

        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead}  textStyle={styles.head}/>
          <TableWrapper style={styles.wrapper}>
            
            <Col data={state.tableData1}  heightArr={[20]} textStyle={styles.textBlue}/>
            <Col data={state.tableData2} heightArr={[20]}  textStyle={styles.textRed}/>
            <Col data={state.tableData3} heightArr={[20]}  textStyle={styles.textBlue}/>
            
          </TableWrapper>
        </Table>
        <Text > {'\n'}{'\n'} </Text>
       
       <TextInput  
                   onChangeText={data => this.setState({ yorum: data })}
                   
                   style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                   placeholder="Write some comment here..."  
              
               />  
       <Text > {'\n'}{'\n'} </Text>
      
  
       <TouchableOpacity  style={styles.button} onPress={this.SendDataFunction} activeOpacity={0.7} style={styles.button} >
      
<Text style={styles.textRed}>Send Comment  </Text>

</TouchableOpacity>
      
      </View>
          
  );
    }

    else if ((this.state.dolarRate+0.01)<(this.state.oldDolar+0.01) && (this.state.euroRate+0.01)>=(this.state.oldEuro+0.01))
    {      return(
      <View style={styles.container}>
        <Image source={{uri: 'https://miro.medium.com/max/2800/0*oCCcB15sWlEQinu3.png'}}
              style={{width: 325, height: 150}} />
        <Text style={styles.renk}> {'\n'}{'\n'}Current Exchange Rates{'\n'}
          
        </Text>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead}  textStyle={styles.head}/>
          <TableWrapper style={styles.wrapper}>
            
            <Col data={state.tableData1}  heightArr={[20]} textStyle={styles.textRed}/>
            <Col data={state.tableData2} heightArr={[20]}  textStyle={styles.textBlue}/>
            <Col data={state.tableData3} heightArr={[20]}  textStyle={styles.textBlue}/>
            
          </TableWrapper>
        </Table>
        <Text > {'\n'}{'\n'} </Text>
       
       <TextInput  
                   onChangeText={data => this.setState({ yorum: data })}
                   
                   style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                   placeholder="Write some comment here..."  
              
               />  
       <Text > {'\n'}{'\n'} </Text>
      
  
       <TouchableOpacity  style={styles.button} onPress={this.SendDataFunction} activeOpacity={0.7} style={styles.button} >
      
<Text style={styles.textRed}>Send Comment</Text>

</TouchableOpacity>

    </View>
              
    );
        }

        else{
          return(
            
            <View style={styles.container}>
             
             <Image source={{uri: 'https://miro.medium.com/max/2800/0*oCCcB15sWlEQinu3.png'}}
              style={{width: 325, height: 150}} />
       
       



<Text style={styles.renk}> {'\n'}{'\n'}Current Exchange Rates{'\n'}
          
          </Text>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead}  textStyle={styles.head}/>
          <TableWrapper style={styles.wrapper}>
            
            <Col data={state.tableData1}  heightArr={[20]} textStyle={styles.textBlue}/>
            <Col data={state.tableData2} heightArr={[20]}  textStyle={styles.textBlue}/>
            <Col data={state.tableData3} heightArr={[20]}  textStyle={styles.textBlue}/>
            
          </TableWrapper>
        </Table>
        <Text > {'\n'}{'\n'} </Text>
       
        <TextInput  
                    onChangeText={data => this.setState({ yorum: data })}
                    
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20}}  
                    placeholder="Write some comment here..."  
               
                />  
        <Text > {'\n'}{'\n'} </Text>
       
   
        <TouchableOpacity  style={styles.button} onPress={this.SendDataFunction} activeOpacity={0.7} style={styles.button} >
       
 <Text style={styles.textRed}>Send Comment  </Text>

</TouchableOpacity>
                
        
      </View>
      
            );
        }




 

      }

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { margin: 15, backgroundColor: '#f1f8ff',fontWeight: 'bold', },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  textRed: { margin: 20,color: 'red' },
  textBlue: { margin: 20,color: 'blue' },
  wrapper: { flexDirection: 'row' },

  renk: {
   alignSelf: 'center',
  color: 'red',
  fontWeight: 'bold',
  fontSize: 30,
  }



});



