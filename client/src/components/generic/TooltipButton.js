import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

/**
 * @param props.tooltipId - Id of the tooltip 
 * @param props.tooltipText - Text of the tooltip 
 * @param props.pageTarget - The page this button navigates to 
 * @param props.disabled - Disabled state of the button (true/false)
 * @param props.iconString - The font awesome icon string for this button 
 */
export default TooltipButton = (props) => (
  <OverlayTrigger
    placement='bottom'
    overlay={<Tooltip id={`${props.tooltipId}Tooltip`}>{props.tooltipText}</Tooltip>}
  >
    <Button
      bsStyle='primary'
      onClick={() => emit('changePage', { page: props.pageTarget })}
      disabled={props.disabled}
    >
      <i className={`fa ${props.iconString}`}/>
    </Button>
  </OverlayTrigger>
);
