import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params, from) {
  console.log(from);
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
