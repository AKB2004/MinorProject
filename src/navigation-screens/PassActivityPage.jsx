// import { View, Text, StyleSheet } from 'react-native';
// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';

// const PassActivityPage = () => {
//   return (
//     <LinearGradient
//               colors={['#E6E6FA', '#43328B']}
//               locations={[0.01, 1]}
//               style={styles.gradient}
//             >
//                 <Text style={styles.passActivity}>
//                     1 Day 
//                 </Text>
//             </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//     gradient:{
//         flex:1,
//     },
// });
// export default PassActivityPage;



import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const PassActivityPage = () => {
  const navigation = useNavigation();
  const [selectedPass, setSelectedPass] = useState(null);
  const [step, setStep] = useState(1);

  const handleSelectPass = (passType) => {
    setSelectedPass(passType);
    setStep(2);
  };

  const handleConfirm = () => {
    if (selectedPass) {
      console.log(`Selected pass: ${selectedPass}`);

      // Navigation logic
    }
  };

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
          </TouchableOpacity>
          <Text style={styles.headerText}>Apply Pass</Text>
        </View>
        
        <View style={styles.timeline}>
          <View style={[styles.timelineItem, styles.activeTimelineItem]}>
            <Text style={styles.timelineNumber}>1</Text>
            <Text style={styles.timelineText}>Select Pass</Text>
          </View>
          <View style={styles.timelineConnector} />
          <View style={[styles.timelineItem, step >= 2 && styles.activeTimelineItem]}>
            <Text style={styles.timelineNumber}>2</Text>
            <Text style={styles.timelineText}>Confirm</Text>
          </View>
          <View style={styles.timelineConnector} />
          <View style={styles.timelineItem}>
            <Text style={styles.timelineNumber}>3</Text>
            <Text style={styles.timelineText}>Submit</Text>
          </View>
        </View>
        
        <ScrollView style={styles.content}>
          {step === 1 ? (
            <View style={styles.passSelection}>
              <Text style={styles.sectionTitle}>Select Pass Type</Text>
              
              <TouchableOpacity
                style={styles.passOption}
                onPress={() => handleSelectPass('oneDay')}
              >
                <LinearGradient
                  colors={['#4B3A9F', '#43328B']}
                  style={styles.passGradient}
                >
                  <View style={styles.passDetails}>
                    <Image 
                      source={require('../../assets/img/maleicon.png')} 
                      style={styles.passIcon}
                    />
                    <View>
                      <Text style={styles.passTitle}>One Day Pass</Text>
                      <Text style={styles.passDescription}>Day outing permission</Text>
                    </View>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.passOption}
                onPress={() => handleSelectPass('home')}
              >
                <LinearGradient
                  colors={['#C71585', '#A01065']}
                  style={styles.passGradient}
                >
                  <View style={styles.passDetails}>
                    <Image
                      source={require('../../assets/img/maleicon.png')} 
                      style={styles.passIcon}
                    />
                    <View>
                      <Text style={styles.passTitle}>Home Pass</Text>
                      <Text style={styles.passDescription}>Multiple day home visit</Text>
                    </View>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.confirmSection}>
              <Text style={styles.sectionTitle}>Confirm Your Selection</Text>
              
              <View style={styles.selectedPassContainer}>
                <LinearGradient
                  colors={selectedPass === 'oneDay' ? ['#4B3A9F', '#43328B'] : ['#C71585', '#A01065']}
                  style={styles.selectedPassGradient}
                >
                  <Image 
                    source={selectedPass === 'oneDay' ? 
                      require('../../assets/img/maleicon.png') :
                      require('../../assets/img/maleicon.png')}
                    style={styles.selectedPassIcon}
                  />
                  <Text style={styles.selectedPassTitle}>
                    {selectedPass === 'oneDay' ? 'One Day Pass' : 'Home Pass'}
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Pass Details</Text>
                {selectedPass === 'oneDay' ? (
                  <View style={styles.detailsList}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Duration:</Text>
                      <Text style={styles.detailValue}>12 hours</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Approval:</Text>
                      <Text style={styles.detailValue}>Warden</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Return Time:</Text>
                      <Text style={styles.detailValue}>Before 8 PM</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.detailsList}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Duration:</Text>
                      <Text style={styles.detailValue}>Up to 30 days</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Approval:</Text>
                      <Text style={styles.detailValue}>Warden + Guardian</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Requirements:</Text>
                      <Text style={styles.detailValue}>Parental Consent</Text>
                    </View>
                  </View>
                )}
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.backToSelectionButton}
                  onPress={() => setStep(1)}
                >
                  <Text style={styles.backToSelectionText}>Change</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43328B',
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  timelineItem: {
    alignItems: 'center',
    opacity: 0.5,
  },
  activeTimelineItem: {
    opacity: 1,
  },
  timelineNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#C71585',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  timelineText: {
    fontSize: 12,
    color: '#333333',
  },
  timelineConnector: {
    height: 2,
    width: 40,
    backgroundColor: '#C71585',
    marginHorizontal: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43328B',
    marginBottom: 20,
    textAlign: 'center',
  },
  passSelection: {
    marginBottom: 20,
  },
  passOption: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  passGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 15,
  },
  passDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
    tintColor: '#FFFFFF',
  },
  passTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  passDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  confirmSection: {
    flex: 1,
  },
  selectedPassContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedPassGradient: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  selectedPassIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    tintColor: '#FFFFFF',
  },
  selectedPassTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43328B',
    marginBottom: 10,
  },
  detailsList: {
    paddingLeft: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backToSelectionButton: {
    backgroundColor: '#CCCCCC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backToSelectionText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#C71585',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PassActivityPage;