import * as React from 'react';

const getModules = () => {
  const modules = [];
  const requireComponent = require.context('../components/modules', true, /\.js$/);

  requireComponent.keys().forEach((fileName) => {
    const moduleName = fileName.replace(/^.\/(.*)\.js$/, '$1');
    const Component = React.lazy(() => import(`../components/modules/${moduleName}`));

    modules.push({
      id: moduleName,
      name: moduleName,
      component: <React.Suspense fallback={<div>Loading...</div>}><Component /></React.Suspense>,
    });
  });

  return modules;
};

export default getModules;