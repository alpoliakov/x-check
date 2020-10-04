import { CheckState, ICheсk } from '../../../../interfaces/IWorkDone';

export default function copyGradesFromCheck(newCheck: ICheсk, selfTest: ICheсk): ICheсk {
  let newScore = 0;
  const newChecking = newCheck.cheсking.map((item) => {
    const selfCheck = selfTest.cheсking.filter(
      (selfItem) => selfItem.criteriaPointID === item.criteriaPointID
    );
    if (selfCheck.length !== 0) {
      newScore += selfCheck[0].autorScore;
      return {
        ...item,
        autorScore: selfCheck[0].autorScore,
        auditorScore: selfCheck[0].autorScore,
      };
    } else {
      return item;
    }
  });
  return {
    ...newCheck,
    cheсking: newChecking,
    score: newScore,
    state: CheckState.AuditorDraft,
  };
}
