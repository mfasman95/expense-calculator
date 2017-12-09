import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default (props) => (
  <ToggleButtonGroup
    type='radio'
    value={props.value}
    onChange={props.onChange}
    name={props.name}
    justified
  >
    { props.options.map((option) => <ToggleButton key={option} value={option}>{(option.charAt(0).toUpperCase() + option.slice(1))}</ToggleButton>) }
  </ToggleButtonGroup>
);
