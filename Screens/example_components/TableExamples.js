// ExampleComponents.js
import React, { useRef, useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, AccessibilityInfo, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

//Custom Imports
//============================================================================
import { heading, colors } from '../../constant'
import HorizontalLine from '../../components/basic_components/HorizontalLine';
import HorizontalTable from '../../components/basic_components/HorizontalTable';
import VerticalTable from '../../components/basic_components/VerticalTable';
import TwoVariableTable from '../../components/basic_components/TwoVariableTable';
//============================================================================

//Theme Management Import
//================================================
import themeContext from '../../Themes/themeContext';
//================================================


//Two Variable Table Data
//================================================================
const TwoVarData = {
  columns: ['Year 1', 'Year 2', 'Year 3'],
  rows: [
    { label: 'Food 1', values: ['100', '20', "30"] },
    { label: 'Food 2', values: ['5', '10', "15"] },
    { label: 'Food 3', values: ['1', '2', "3"] },
  ],
};
//===============================================================


//Vertical, Horizontal Table Data:
//================================================================
const table_data = [
  {
    title: "Test Table",
    data: [
      { id: 'Students', col1: 'Alex', col2: 'Sam', col3: 'Ben' },
      { id: 'Classes', col1: 'Math', col2: 'Science', col3: 'English' },
    ],
  },
];
//================================================================


function ComboboxExample() {

  //Theme Manangement
  //===============================================================
  const { theme } = useContext(themeContext);
  //===============================================================

  // First Element Set Focus for Screen Reader & Reset Scroll View
  //===============================================================
  const firstElementRef = useRef(null);
  const scrollViewRef = useRef(null);

  //When the page loads (everytime) the useFocusEffect is triggered
  //This is used to bring focus on the first element

  useFocusEffect(
    React.useCallback(() => {

      console.log("use Focus Effect Example Components")

      //Reset Scroll View to the top of the page
      if (scrollViewRef.current) {
        console.log("Scroll")
        scrollViewRef.current.scrollTo({ y: 0 });
      }

      // // Add a time delay before executing the focus logic, 
      // //This is important so the it gives it a chance to find the firstElement during loading.
      const delay = 250; // Delay in milliseconds

      setTimeout(() => {

        if (firstElementRef.current) {
          const reactTag = firstElementRef.current._nativeTag;
          AccessibilityInfo.setAccessibilityFocus(reactTag);
          console.log('First Element===========n\n'); //Debuging purposes

        }
      }, delay)
    }, [])

  )

  return (

    <ScrollView
      ref={scrollViewRef}
      keyboardDismissMode='on-drag' 
      pagingEnabled="false" 
      style={[styles.container, { backgroundColor: theme.page.contentBackground }]}
    >

      <View>
        {/* // heading.Heading is a custom heading style set in constant.js */}
        {/* //first Element set here -------------------------------------------*/}

        <View style={styles.containerHeader}>
          <heading.Heading1 //Heading 1
            ref={firstElementRef}
            style={styles.containerHeaderText}
            accessibilityLabel="Tables Examples" 
          >
            Table Examples
          </heading.Heading1>
        </View>

        

        <View>
          <View style={styles.tableContainer}>
            <heading.Heading3 //Heading 3
              style={[styles.heading3, { color: theme.page.text }]}
              accessibilityLabel="Horizontal Table Example"
            >
              Horizontal Table Example
            </heading.Heading3>
            <HorizontalTable data={table_data} />
          </View>

          <View style={styles.tableContainer}>
            <heading.Heading3 //Heading 3
              style={[styles.heading3, { color: theme.page.text }]}
              accessibilityLabel="Vertical Table Example"
            >
              Vertical Table Example
            </heading.Heading3>
            <VerticalTable data={table_data} />
          </View>

          <View style={styles.tableContainer}>
            <heading.Heading3 //Heading 3
              style={[styles.heading3, { color: theme.page.text }]}
              accessibilityLabel="Two Variable Table Example"
            >
              Two Variable Table Example
            </heading.Heading3>

            <TwoVariableTable data={TwoVarData} title="Year" />
          </View>
        </View>

        

      </View>

    </ScrollView>



  );
}

const styles = StyleSheet.create({
  //Header Styles relating to "Example Components"
  //================================================
  containerHeader: {
    alignItems: 'center', //Aligns content horizontally center
    backgroundColor: colors.primaryBlue,
    paddingTop: 10,
  },
  containerHeaderText: {
    color: "white",
  },
  //================================================

  //General Styles
  //================================================ 
  textContent: {        //This style is general text style
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  heading2: {        //Heading 2 style
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },

  heading3: {        //Heading 3 style
    paddingTop: 1,
    paddingBottom: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  //================================================


  //Tables
  //================================================
  tableContainer: {
    marginVertical: 20,

  },
  //================================================



});

export default ComboboxExample;
