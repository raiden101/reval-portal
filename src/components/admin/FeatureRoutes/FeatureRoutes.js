import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddCourses from '../AddCourses/AddCourses';
import userRegistration from '../userRegistration/userRegistration';
import AddStudentRegSubs from '../AddStudentRegSubs/AddStudentRegSubs';
import Reports from '../Reports/Reports';
import AddBookletDetails from '../AddBookletDetails/AddBookletDetails';

const routes = [
  { path: `/admin/addCourses`, component: AddCourses },
  { path: `/admin/userRegistration`, component: userRegistration },
  { path: `/admin/addStudentRegSubs`, component: AddStudentRegSubs },
  { path: `/admin/reports`, component: Reports },
  { path: `/admin/addBookletDetails`, component: AddBookletDetails },
];

export default () => {
  return (
    <Switch>
      {routes.map((myRoute, index) => {
        return <Route 
        key={index}
        path={myRoute.path} 
        component={myRoute.component}/>
      })}
    </Switch>
  );
}
