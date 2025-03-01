import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const Dashboard = () => {
  return (
    <LinearGradient
              colors={['#E6E6FA', '#43328B']}
              locations={[0.01, 1]}
              style={styles.gradient}
            >
        <View style={styles.container}>
          <Image source={require('../../assets/img/dashboardFirstPic.png')}
          style={styles.img}/>
          <Image source={require('../../assets/img/notifications.png')}
          style={styles.img1}/>
        </View>
        <View style={styles.container}>
        <View style={{marginTop:30}}>
          <Text style={styles.text1}>
            Hi Sam
          </Text>
          <Text style={styles.text2}>
            Good Morning!
          </Text>
        </View>
        <Image source={require('../../assets/img/dashboardProfilePic.png')}
          style={styles.img2}/>
        </View>
        <View style={styles.container1}>
          <View style={{flexDirection:'row',
          }}>
            <Image source={require('../../assets/img/university.png')} style={styles.img3}/>
            <View style={{flexDirection:'column',
              marginLeft:15,
            }}>
            <Text style={styles.text3}>
            University
            </Text>
            <Text style={styles.text4}>
              Dayananda Sagar University
            </Text>
            </View>
          </View>
          <View style={{flexDirection:'row'
          }}>
            <Image source={require('../../assets/img/profession.png')} style={styles.img3}/>
            <View style={{flexDirection:'column',
              marginLeft:15,
            }}>
            <Text style={styles.text3}>
            Profession
            </Text>
            <Text style={styles.text4}>
              B Tech
            </Text>
            </View>
            
          </View>
        </View>
        </LinearGradient>
  );
};
const styles = StyleSheet.create({
    gradient: {
      flex: 1, // Full screen gradient
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    img:{
    height:70,
    width:200,
    // marginTop:30,
    },
    img1:{
      height:70,
      width:50,
      // marginTop:30,
      },
      img2:{
        height:120,
        width:120,
      },
      img3:{
        height:50,
        width:50,
      },
      container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginLeft:15,
        marginTop:20,
        marginRight:10,
        // alignItems: 'center',
        // justifyContent:'space-around',
      },
      container1:{
        flexDirection:'column',
        justifyContent:'space-between',marginTop:30,
        gap:20,
        marginLeft:15,
      },
      
      text1:{
        fontSize:30,
        fontWeight:'bold',
        marginLeft:10,
      },
      text2:{
        fontSize:20,
        fontWeight:'light',
      },
      text3:{
        fontSize:19,
        fontWeight:'bold',
        // marginTop:15,
        // marginLeft:10,
      },
      text4:{
        fontSize:19,
        fontWeight:'light',
        // marginTop:15,
        // marginLeft:10,
      },
});
export default Dashboard;
