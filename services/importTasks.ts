export default function importTaskMD(task: string): string {
  task.replace('`', "'");
  const md2json = require('md-2-json');
  const incomingJSON = md2json.parse(task);

  const name = Object.keys(incomingJSON)[0];
  const demo = getDemoLink(incomingJSON);
  const evaluationCriteria = evaluationCriteriaParse(incomingJSON);
  const usefulLinks = getCategory(incomingJSON, 'Полезные ссылки', 'Useful links');
  const description = getDescriptionTask(incomingJSON);

  const newTask = {
    id: name,
    name: name,
    demo: demo,
    description: description,
    evaluationCriteria: evaluationCriteria,
    usefulLinks: usefulLinks,
  };
  console.log(newTask);
  return newTask;
}

function getCategory(incomingJSON: any, ruTitle: string, enTitle: string) {
  const categoryDingy = incomingJSON[Object.keys(incomingJSON)[0]][ruTitle]
    ? incomingJSON[Object.keys(incomingJSON)[0]][ruTitle].raw
    : incomingJSON[Object.keys(incomingJSON)[0]][enTitle]
    ? incomingJSON[Object.keys(incomingJSON)[0]][enTitle].raw
    : undefined;
  return categoryDingy;
}

function evaluationCriteriaParse(incomingJSON: any): any {
  const evaluationCriteriaDingy = getCategory(
    incomingJSON,
    'Критерии оценки:',
    'Evaluation criteria'
  );

  let OneStrEnd = evaluationCriteriaDingy.indexOf('- **', 4);
  let newEvaluationCriteria = evaluationCriteriaDingy.slice(OneStrEnd, -1);
  const evaluationCriteriaArray = [];
  while (newEvaluationCriteria.indexOf('- **', 4) !== -1) {
    OneStrEnd = newEvaluationCriteria.indexOf('- **', 4);
    const criteriaBlock = newEvaluationCriteria.slice(0, OneStrEnd);
    evaluationCriteriaArray.push(criteriaBlock);
    newEvaluationCriteria = newEvaluationCriteria.slice(OneStrEnd, -1);
  }
  evaluationCriteriaArray.push(newEvaluationCriteria);

  const newArray = [];

  evaluationCriteriaArray.forEach((criteria) => {
    const nameStart = criteria.indexOf('**');
    const nameEnd = criteria.indexOf('+', nameStart + 2);
    const titleEnd = criteria.indexOf('**', nameStart + 2);
    const groupName = criteria.slice(nameStart + 2, nameEnd);
    const criteriaPointsDingy = criteria.slice(titleEnd + 5, -1);
    newArray.push({
      groupID: groupName,
      groupName: groupName,
      criteriaPoints: getCriteriaPoint(criteriaPointsDingy),
    });
  });
  return newArray;
}

function getCriteriaPoint(criteriaPointsDingy: type) {
  const endDescription = criteriaPointsDingy.indexOf('+');
  const text = criteriaPointsDingy.slice(0, endDescription);

  const criteriaPointScore = criteriaPointsDingy.slice(
    endDescription + 1,
    criteriaPointsDingy.indexOf('\n')
  );
  return {
    criteriaPointID: text,
    criteriaPointName: text,
    criteriaPointScore: criteriaPointScore,
    isFine: false,
    isThisPointForAMentor: false,
  };
}

function getDemoLink(incomingJSON: any): string {
  const demoDescription = getCategory(incomingJSON, 'Демо', 'Demo');
  const urlStart = demoDescription.indexOf('http');
  const urlEnd = demoDescription.indexOf('\n' || ',' || ' ' || '\r\n', urlStart);
  const demoLink = demoDescription.slice(urlStart, urlEnd);
  return demoLink;
}

function getDescriptionTask(incomingJSON: any): any {
  const descriptionDingy = getdescriptionDingy(incomingJSON);
  let description = '';

  for (let key in descriptionDingy) {
    description += `##${key} \n ${descriptionDingy[key].raw} `;
  }
  return description;
}

function getdescriptionDingy(incomingJSON: any): any {
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Критерии оценки:'];
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Evaluation criteria'];
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Полезные ссылки'];
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Useful links'];
  const descriptionDingy = incomingJSON[Object.keys(incomingJSON)[0]];
  return descriptionDingy;
}
