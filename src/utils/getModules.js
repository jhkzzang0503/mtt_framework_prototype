import * as React from 'react';

const getModules = () => {
  const modules = [];
  const requireComponent = require.context('../components/modules', true, /\.js$/);

  requireComponent.keys().forEach((fileName) => {
    const moduleName = fileName.replace(/^.\/(.*)\.js$/, '$1');
    const Component = React.lazy(() => import(`../components/modules/${moduleName}`));
    const modulePath = `../components/modules/${moduleName}`;

    modules.push({
      id: moduleName,
      name: moduleName,
      path: modulePath,
      component: <React.Suspense fallback={<div>Loading...</div>}><Component /></React.Suspense>,
    });
  });

  console.log("modules : ", modules)

  return modules;
};

export default getModules;

