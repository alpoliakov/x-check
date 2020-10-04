import * as React from 'react';
import MyCriteriaItem from './CriteriaItem';
import MyCriteriaItemDraft from './CriteriaItemDraft';

const MyCriteria: React.FC<{ evaluationCriteria: any }> = ({ evaluationCriteria }: any) => {
  const MyCriteriaItemPainter = () => {
    if (evaluationCriteria) {
      return <MyCriteriaItemDraft evaluationCriteria={evaluationCriteria} />;
    } else {
      return <MyCriteriaItem />;
    }
  };
  const x = MyCriteriaItemPainter();
  return <React.Fragment>{x}</React.Fragment>;
};

export default MyCriteria;
