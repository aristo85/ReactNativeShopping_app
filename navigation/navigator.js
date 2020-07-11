import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import colors from "../constants/colors";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import CartScreen from "../screen/product/CartScreen";
import DetailedScreen from "../screen/product/DetailedProductScreen";
import ProductsOverviewScreen from "../screen/product/ProductsOverviewScreen";
import OrdersScreen from "../screen/user/OrdersScreen";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ManageProductScreen from "../screen/user/ManageProductScreen";
import EditProductScreen from "../screen/user/EditProductScreen";
import AuthScreen from "../screen/user/AuthScreen";
import StartUpScreen from "../screen/user/StartUpScreen";
import ButtonStyled from "../components/ButtonStyled";
import { useDispatch } from "react-redux";
import { logOut } from "../store/authe/actions";

const ProductsNavigator = createStackNavigator(
  {
    productsOverview: ProductsOverviewScreen,
    detailed: DetailedScreen,
    cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

      }
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerInfo) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerInfo.tintColor}
        />
      ),
    },
  },
  
);
//adding OrdersScreen to navigator just for header and style purposes
const Orders = createStackNavigator(
  {
    orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

      }
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerInfo) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerInfo.tintColor}
        />
      ),
    },
  }
);
//adding manageProductScreen to navigator just for header and style purposes
const productManager = createStackNavigator(
  {
    manage: ManageProductScreen,
    edit: EditProductScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

      }
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerInfo) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerInfo.tintColor}
        />
      ),
    },
  }
);
//adding AuthScreen to navigator
const authenticationNav = createStackNavigator(
  {
    Authentication: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      cardStyle: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

      }
    },
  }
);
//drawer Navigator as main navigator
const shopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: Orders,
    Admin: productManager,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView style={{ alignItems: "flex-start" }}>
            <DrawerNavigatorItems {...props} />
            <ButtonStyled
              // style={{ marginLeft: "20%" }}
              title="LogOut"
              color={colors.primary}
              onPress={() => {
                dispatch(logOut());
                // props.navigation.navigate('auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

//switch navigator for authentication
const mainNavigator = createSwitchNavigator({
  startApp: StartUpScreen,
  auth: authenticationNav,
  shop: shopNavigator,
});

export default createAppContainer(mainNavigator);
