
import React, { useState } from 'react';
import Item from '../../atoms/Item';
import Text from '../../atoms/Text';
import { css } from '../../../util/style';

export interface AccordionProps {
  children: React.ReactNode;
}

export interface AccordionPanelProps {
  baseId: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  openAction?: () => void;
  closeAction?: () => void;
}

export const Accordion: React.FC<AccordionProps> = (props) => {
  return <>{props.children}</>;
};

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  title,
  subtitle,
  children,
  baseId,
  openAction,
  closeAction,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [collapseHeight, setCollapseHeight] = useState(0);
  const handleCollapse = (element: any) => {
    const collapseContent = element.currentTarget.nextSibling;
    const expandedNewValue = !expanded;
    setExpanded(expandedNewValue);
    if (expandedNewValue) {
      setCollapseHeight(collapseContent.scrollHeight);
      if (openAction) {
        openAction();
      }
    } else {
      setCollapseHeight(0);
      if (closeAction) {
        closeAction();
      }
    }
  };

  baseId = baseId + '-accordion-panel';
  const accordionContainerId = baseId + '-container';
  const accordionHeaderId = baseId + '-header';
  const accordionBodyId = baseId + '-body';

  const collapsibleCssClass = css([
    'cursor-pointer',
    'border-none',
    'm-0',
    'p-0',
    'al-items-center',
    'width-full',
  ]);

  const collapsibleContentCssClass = css([
    'm-0',
    'p-0',
    'overflow-hidden-y',
    'overflow-hidden-x',
  ]);

  let ariaLabel = title;
  if (subtitle) {
    ariaLabel += ' ' + subtitle;
  }

  return (
    <div id={accordionContainerId}>
      <div
        id={accordionHeaderId}
        onClick={handleCollapse}
        aria-controls={accordionBodyId}
        aria-label={ariaLabel}
        aria-expanded={expanded}
        role="button"
        className={collapsibleCssClass}
      >
        <Item
          iconColor="primary"
          menuItem={
            expanded ? 'itau-icon_seta_achatada_up' : 'itau-icon_seta_achatada'
          }
          ariaHiddenIcon
        >
          <Text as="div" size="m" aria-hidden={true}>
            {title}
          </Text>
          {subtitle && (
            <Text as="span" size="s" color="sand-700">
              {subtitle}
            </Text>
          )}
        </Item>
      </div>
      <div
        id={accordionBodyId}
        aria-hidden={!expanded}
        aria-labelledby={accordionHeaderId}
        className={collapsibleContentCssClass}
        style={{
          maxHeight: collapseHeight,
          transition: 'max-height 0.5s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};
