import MainTabNavigator from './MainTabNavigator';
import QuestionsScreen from '../screens/QuestionsScreen';
import { createStackNavigator } from 'react-navigation-stack';

function forVertical(props) {
  const {layout, position, scene} = props;

  const index = scene.index;
  const height = layout.initHeight;

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0],
  });

  return {
    transform: [{translateX}, {translateY}],
  };
}

const MainStack = createStackNavigator(
  {
    MainTab: MainTabNavigator,
    Questions: {
      screen: QuestionsScreen,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

MainStack.path = '';

// const prevGetStateForAction = MainStack.router.getStateForAction;

// MainStack.router.getStateForAction = (action, state) => {
//   // Do not allow to go back from Home
//   if (action.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'Questions') {
//     console.log('1111')
//     return null;
//   }

//   return prevGetStateForAction(action, state);
// };

export default MainStack;
