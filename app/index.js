import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Image } from 'react-native';
import { Redirect } from 'expo-router';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';

import { firebaseConfig } from '../firebaseConfig';
import Home from './home';

// Discover Your Next Opportunity with CareerBee: Buzzing with Job Openings!

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, name, setName, isLogin, setIsLogin, handleAuthentication }) => {
    return (
        <View style={styles.authContainer}>
        <Image source={require('../assets/careerbee.png')} style={styles.logo} />
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
  
        {/* Render name field only during sign up */}
        {!isLogin && (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            autoCapitalize="words"
          />
        )}
  
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#FF9073" />
        </View>
  
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    );
  };
  
  
  const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    );
  };
  
  export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Track user authentication state
    const [isLogin, setIsLogin] = useState(true);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [name, setName] = useState(''); // Define the name state
  
    const auth = getAuth(app);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (user) {
          // If user is authenticated, set redirectToHome to true
          setRedirectToHome(true);
        }
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    const handleAuthentication = async () => {
      try {
        if (user) {
          // If user is already authenticated, log out
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          // Sign in or sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
          } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            // Set the name if signing up
            setName(name); // Assuming name is already captured in state
            console.log('User created successfully!');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    };

    const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log('User logged out successfully!');
          setRedirectToHome(false); // Set redirectToHome to false
        } catch (error) {
          console.error('Logout error:', error.message);
        }
      };
  
    if (redirectToHome) {
      // If redirectToHome is true, redirect to the home page
      return <Home name={name} handleLogout={handleLogout}/>;
    }
  
    // Otherwise, render the login page
    return (
      <View style={styles.container}>
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name} // Pass the name to the AuthScreen component
          setName={setName} // Update the name in state when changed
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 3,
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color:'#FF9073'
      },
      input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
      },
      buttonContainer: {
        marginBottom: 16,
      },
      toggleText: {
        color: '#FF9073',
        textAlign: 'center',
      },
      bottomContainer: {
        marginTop: 20,
      },
      emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
      },
      logo: {
        width: "100%", // Adjust according to your logo size
        height: 70,
        justifyContent:'center' // Adjust the spacing as needed
      },
    });