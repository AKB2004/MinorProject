import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const CourseButton = ({ title, onPress }) => {
    return (
      <TouchableOpacity style={styles.courseButton} onPress={onPress}>
        <Text style={styles.courseText}>{title}</Text>
      </TouchableOpacity>
    );
  };


const DetailsPage2 = () => {

    const navigation = useNavigation();

  return (
    <LinearGradient
        colors={['#E6E6FA', '#43328B']}
        locations={[0.01, 1]}
        style={styles.gradient}
        >
    <View>
    <Text
    style={{fontSize:30, fontWeight:'bold',marginTop:30,marginLeft:20}}>Personal Details</Text>
    <Text style={{fontSize:20,marginLeft:20}}>Let's Know about yourself</Text>
    <Image source={require('../../assets/img/profileicon.png')} style={styles.img}/>
    </View>
    <View style={styles.courseContainer}>
        <Text style={styles.courseHeading}>Course</Text>
        <View style={styles.courseGrid}>
          {['B.Tech', 'BSc', 'BCA', 'BBA', 'MBA', 'MCA', 'Others'].map((course, index) => (
            <CourseButton key={index} title={course} onPress={() => console.warn(`${course} Selected`)} />
          ))}
        </View>
      </View>
      <View>
        <Text  style={{fontSize:22, marginTop:20, marginLeft:30, fontWeight:'bold'}}>
        Date of Birth
        </Text>
        <TextInput
        placeholder='DD/MM/YYYY'
        placeholderTextColor="#36454F"
        style={styles.input}/>
      </View>
      <View style={styles.contain}>
<TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {/* <Text style={{marginBottom:8}}>___________________________________</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={styles.recoveryText}>Already an user? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#51158C', fontWeight: 'bold',marginTop:5, fontSize:17, marginLeft:5}}>Login</Text>
    </TouchableOpacity>
</View> */}
</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  img:{
    alignSelf:'center',
    marginTop:50,
    width:120,
    height:150,
  },
  text:{
    fontSize:20,
  },
  courseContainer: {
    marginLeft: 30,
    marginTop: 30,
  },
  courseHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  courseButton: {
    width: 110,
    height: 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  courseText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  button: {
    backgroundColor: '#43328B',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    // marginTop: 35,
    marginBottom:10,
    width:200,
    // alignSelf:'center',
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginTop:10,
  },
  contain:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  recoveryText: {
    textAlign: 'right',
    marginTop: 5,
    alignSelf: 'flex-end', // Align to right
    color: 'black',
    fontSize:17,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    // marginBottom: 15,
    height: 60,
    marginTop:5,
    marginLeft:30,
    backgroundColor: 'white',
    fontSize:20,
  },
});

export default DetailsPage2;
