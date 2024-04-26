import React, { useRef} from 'react';
import {SafeAreaView, ScrollView, View, Text, Pressable} from 'react-native';
import Sliders from './components/Sliders/Sliders';
import Notes from './components/Notes/Notes';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import RBSheet from 'react-native-raw-bottom-sheet';
import CreateNote from './components/Form/CreateNote';



// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api-eu-west-2.hygraph.com/v2/clvaoncrq21q307utvgn2payn/master',
  cache: new InMemoryCache(),
});



function App(): JSX.Element {



  const refRBSheet = useRef<any>();
  

  return (
    <ApolloProvider client={client}>
      <SafeAreaView
        style={{
          padding: 10,
          backgroundColor: 'black',
          flex: 1,
          position: 'relative',
        }}>
        <Pressable
          style={{
            position: 'absolute',
            height: 60,
            width: 60,
            bottom: 50,
            right: 20,
            backgroundColor: 'orange',
            zIndex: 40,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => refRBSheet.current.open()}>
          <View>
            <Text style={{color: 'white'}}> + </Text>
          </View>
        </Pressable>
        <ScrollView
          style={{
            height: 'auto',
          }}>
          <Sliders />
          <Notes />
        </ScrollView>
      </SafeAreaView>
      <RBSheet
        height={700}
        ref={refRBSheet}
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>

          <CreateNote/>
        </RBSheet>
    </ApolloProvider>
  );
}

export default App;
