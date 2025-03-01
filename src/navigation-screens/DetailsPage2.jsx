import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


const CourseButton = ({ title, onPress }) => {
    return (
      <TouchableOpacity style={styles.courseButton} onPress={onPress}>
        <Text style={styles.courseText}>{title}</Text>
      </TouchableOpacity>
    );
  };


const DetailsPage2 = () => {
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
});

export default DetailsPage2;
