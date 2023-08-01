// import { useContext } from 'react';
// import { Route, Redirect, RouteProps } from 'react-router-dom';
// import AuthContext from './AuthContext';

// interface PrivateRouteProps extends RouteProps {}

// const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
//   const { isLoggedIn } = useContext(AuthContext);
//   return (
//     <Route
//       {...rest}
//       render={() =>
//         isLoggedIn ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/main',
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
