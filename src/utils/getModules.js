import * as React from 'react';

const getModules = () => {
  const modules = {};
  const requireComponent = require.context('../components/modules', true, /\.jsx?$/); // js와 jsx 파일 모두 포함

  requireComponent.keys().forEach((fileName) => {
    const moduleName = fileName.replace(/^.\/(.*)\.jsx?$/, '$1');
    const Component = React.lazy(() => import(`../components/modules/${moduleName}`));
    const modulePath = `../components/modules/${moduleName}`;
    const pathParts = moduleName.split('/');
    const categoryName = pathParts[0];
    const componentName = pathParts.slice(1).join('/');

    if (!modules[categoryName]) {
      modules[categoryName] = [];
    }

    modules[categoryName].push({
      id: moduleName,
      name: componentName, // 컴포넌트 이름만 표시
      path: modulePath,
      component: <React.Suspense fallback={<div>Loading...</div>}><Component /></React.Suspense>,
    });
  });

  return modules;
};

export default getModules;