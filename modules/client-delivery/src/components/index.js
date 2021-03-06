
import { useMount, useUnmount } from '@ui.packages/hoc';

import React from 'react';

import Component from './Component';


export default function HOC() {
  useMount(function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - О нас`;
  });

  useUnmount(function() {

  });

  return <Component />;
};
