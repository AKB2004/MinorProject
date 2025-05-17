import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const DetailsPage2 = () => {
  const navigation = useNavigation();
  const [professionModalVisible, setProfessionModalVisible] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState('');

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <View>
        <Text style={styles.title}>Personal Details</Text>
        <Text style={styles.subtitle}>Let us know about you</Text>
        <Image source={require('../../assets/img/profileicon.png')} style={styles.img} />
      </View>

      <View>
        <TextInput
          placeholder="Enter Guardian Name"
          placeholderTextColor="#ced4da"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Guardian Number"
          placeholderTextColor="#ced4da"
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          placeholder="Enter Guardian Email"
          placeholderTextColor="#ced4da"
          style={styles.input}
          keyboardType="email-address"
        />

        {/* Profession Picker */}
        <TouchableOpacity
          onPress={() => setProfessionModalVisible(true)}
          style={styles.input}
        >
          <Text style={[styles.professionText, { color: selectedProfession ? '#000' : '#ced4da' }]}>
            {selectedProfession || 'Your Profession'}
          </Text>
        </TouchableOpacity>

        {/* Conditional Fields */}
        {selectedProfession === 'Student' && (
          <>
            <TextInput
              placeholder="College Name"
              placeholderTextColor="#ced4da"
              style={styles.input}
            />
            <TextInput
              placeholder="College Address"
              placeholderTextColor="#ced4da"
              style={styles.input}
            />
          </>
        )}

        {selectedProfession === 'Professional' && (
          <>
            <TextInput
              placeholder="Company Name"
              placeholderTextColor="#ced4da"
              style={styles.input}
            />
            <TextInput
              placeholder="Company Address"
              placeholderTextColor="#ced4da"
              style={styles.input}
            />
          </>
        )}

        {/* Profession Modal */}
        <Modal
          transparent
          animationType="slide"
          visible={professionModalVisible}
          onRequestClose={() => setProfessionModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Select Profession</Text>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setSelectedProfession('Student');
                  setProfessionModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>Student</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setSelectedProfession('Professional');
                  setProfessionModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>Professional</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setProfessionModalVisible(false)}>
                <Text style={{ color: 'red', marginTop: 10, fontSize: 18 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.contain}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 20,
    color: '#000',
  },
  img: {
    alignSelf: 'center',
    marginTop: 10,
    width: 100,
    height: 110,
  },
  input: {
    width: '85%',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 3,
    height: 55,
    marginTop: 5,
    marginLeft: 30,
    backgroundColor: 'white',
    fontSize: 14,
    color:'black',
    justifyContent: 'center',
  },
  professionText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOption: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#43328B',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: 200,
    marginTop: -50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsPage2;
