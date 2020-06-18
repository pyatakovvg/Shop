
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Page from '../../Page/components'
import Empty from '../../wrappers/Empty';
import Navigate from '../../wrappers/Navigate';
import Composite from '../../wrappers/Composite';

import { injectAsyncReducer, checkReducer } from '../../../bin/createStore';


const wrapperFactory = (module) => (props) => {
  switch (module) {
    case 'Navigate': return <Navigate {...props} />;
    case 'Composite': return <Composite {...props} />;
    case 'Empty': return <Empty {...props} />;
    default: return <Empty {...props} />;
  }
};


class ModuleComponent extends PureComponent {
  static propTypes = {
    module: PropTypes.object,
    wrapper: PropTypes.string,
    pageInProcess: PropTypes.func,
  };

  static defaultProps = {
    module: null,
    wrapper: '',
  };

  state = {
    Module: null,
  };

  async componentDidMount() {
    await this._startProcess();
  }

  async _createReducer() {
    const { module } = this.props;
    const Module = await module;

    injectAsyncReducer(Module['name'], Module['reducer']);

    return void 0;
  }

  async _attachModule() {
    const { module } = this.props;

    const Module = await module;

    this.setState({ Module: Module['default'] });
  }

  async _startProcess() {
    const { module, pageInProcess } = this.props;

    pageInProcess();

    const hasReducer = checkReducer(module);

    if ( ! hasReducer) {
      await this._createReducer();
    }
    await this._attachModule();
  }

  render() {
    const { Module } = this.state;
    const { navigate, wrapper, location, dispatch } = this.props;

    const Wrapper = wrapperFactory(wrapper);

    return (
      <Wrapper navigate={navigate} location={location}>
        <Page>
          { Module && <Module dispatch={dispatch} /> }
        </Page>
      </Wrapper>
    );
  }
}

export default ModuleComponent;
