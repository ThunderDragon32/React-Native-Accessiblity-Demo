import React, {useContext} from 'react';
import { View, StyleSheet, Text, Dimensions} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

//Custom Imports
//================================================
import { def_Page } from '../constant';
//================================================

//Imports for Theme Management
//================================================
import themeContext from '../Themes/themeContext';
import DarkModeSwitch from './DarkModeSwitch'
//================================================

export function DrawerContent(props) {
   const { darkModeTheme, setDarkMode, screens } = props; // Extract darkModeTheme and setDarkMode from props

   //Theme Management
   //================================================
   const { theme} = useContext(themeContext); //Current context of theme
   //================================================

   //Size Management
   //================================================
   const { width, height } = Dimensions.get('window'); //Get the dimensions of the screen
   //================================================

   //Item in Drawer get Style Base on Theme
   //================================================
   const getPageStyle = (index) => ({
      backgroundColor: props.state.index === index ?
         theme.drawerActive : theme.drawerInactive,

      color: props.state.index === index ?
         theme.drawerActiveText : theme.drawerInactiveText,
   });

   //================================================

   // Render A Drawer Item
  //================================================
  const renderDrawerItems = () => {
   return screens.map((screen, index) => (
     <DrawerItem
       key={index}
       label={screen.menu_name} // Use the screen.name as the label
       accessibilityLabel={props.state.index === index ? `Current Page: ${screen.name}` : screen.name}
       onPress={() => {
         props.navigation.navigate(screen.name);
       }}
       labelStyle={[styles.drawerItemLabel, getPageStyle(index)]}
     />
   ));
 };
 //================================================

   return (
      <View
         style={[
            styles.drawerOuterContent, { 
               backgroundColor: theme.drawerOuterContent, 
               borderLeftWidth: theme.drawerBorderLeftWidth, 
               borderColor: theme.drawerOuterBorder 
            }
         ]}>

         <View
            style={[

               styles.drawerHeader,
               height >= 850 && height <= 900 //Resizing based on screen size
                  ? { marginTop: 35, marginBottom: -40, paddingBottom: 20 } //If the first set of conditions are true the styles will be applied (marginTop, marginBottom, and paddingBottom)
                  : {},

               { backgroundColor: theme.drawerHeader },
            ]}
         >
            <Text
               style={[styles.drawerHeaderText, { color: theme.drawerHeaderText }]}
               accessibilityLabel={def_Page.drawerTitle}
               accessibilityRole='header'
            >
               {def_Page.drawerTitle}
            </Text>

         </View>

         <DrawerContentScrollView>

            <Drawer.Section style={[
               styles.drawerInnerSection,
               {
                  borderRadius: theme.drawerInnerBorderRadius,
                  borderBottomWidth: theme.drawerBorderBottomWidth,
                  borderColor: theme.drawerInnerBorder,
                  backgroundColor: theme.drawerInnerContent,
               }]}
            >
               {renderDrawerItems()}

            </Drawer.Section>

            <DarkModeSwitch
               darkModeTheme={darkModeTheme}
               setDarkMode={setDarkMode}
               onToggle={() => {
                  // console.log(toggleButtonRef.current._nativeTag)
               }}
            />
         </DrawerContentScrollView>
         
      </View>
   );
}

const styles = StyleSheet.create({
   drawerHeader: {
      padding: 16,
   },
   drawerHeaderText: {
      fontSize: 20,
   },
   drawerItemLabel: {
      padding: 15,
      margin: -10,
      marginLeft: 0,
      marginRight: -30,
      fontSize: 17,
      fontWeight: 'bold',
      borderRadius: 10,
   },
   drawerInnerSection: {
      flex: 1,
      marginTop: 15,
   },
   drawerOuterContent: {
      flex: 1,
   },
});
