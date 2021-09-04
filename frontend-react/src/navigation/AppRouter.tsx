import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { createPath, ROUTE } from './routes';

import HomeScreen from '../screens/HomeScreen'
import ArtApiScreen from '../screens/ArtApiScreen'
import DesignScreen from '../screens/DesignScreen'
import DashboardScreen from '../screens/DashboardScreen'

const AppRouter = () => {
  return (
    <Router>
      {/* Flex root */}
       <div className="h-full w-full flex flex-col">

        {/* Top nav */}
         {/* <nav className="flex flex-row justify-center p-3">
           <ul className="flex w-full justify-evenly">
             <li className="flex">
               <Link to="/">Home</Link>
             </li>
             <li className="flex">
               <Link to={createPath({path: ROUTE.ART_VIEWER})}>Art viewer</Link>
             </li>
             <li className="flex">
               <Link to={createPath({path: ROUTE.DESIGN})}>Design</Link>
             </li>
             <li className="flex">
               <Link to={createPath({path: ROUTE.DASHBOARD})}>Dashboard</Link>
             </li>
           </ul>
         </nav> */}
 
         <Route path={ROUTE.HOME} exact component={HomeScreen} />
         <Route path={ROUTE.ART_VIEWER} component={ArtApiScreen} />
         <Route path={ROUTE.DESIGN} component={DesignScreen} />
         <Route path={ROUTE.DASHBOARD} component={DashboardScreen} />
       </div>
     </Router>
  )
}

export default AppRouter