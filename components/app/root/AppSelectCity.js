import React from 'react';

import AppSelect from './AppSelect';

import cities from '../../../assets/data/cities';

const QuestionSelect = ({value, onChange = () => {}}) => {
  return (
    <AppSelect
      value={value}
      items={cities.map(item => ({value: item, label: item}))}
      onChange={onChange}
    />
  );
};

export default QuestionSelect;
