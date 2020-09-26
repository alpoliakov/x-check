import { ICriteriaGroup, ICriteriaPoint } from '../interfaces/ITask';
export default function importTaskMD(task: string): any {
  task.replace('`', "'");
  const md2json = require('md-2-json');
  const incomingJSON = md2json.parse(task);

  const name = Object.keys(incomingJSON)[0];
  const demo = getDemoLink(incomingJSON);
  const evaluationCriteria = evaluationCriteriaParse(incomingJSON);

  const newTask = {
    id: name,
    name: name,
    demo: demo,
    evaluationCriteria: evaluationCriteria,
  };
  return newTask;
}

export function bigImportTaskMD(task: string): any {
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
  return newTask;
}

export function importTaskRSSChecklist(RSSChecklist: any): any {
  RSSChecklist = JSON.parse(RSSChecklist);
  const group: ICriteriaGroup = {
    groupID: '',
    groupName: '',
    criteriaPoints: [],
  };

  const criteriaPoint: ICriteriaPoint = {
    criteriaPointID: '',
    criteriaPointName: '',
    criteriaPointScore: 0,
    isFine: false,
    isThisPointForAMentor: false,
  };

  const evaluationCriteria = [];

  RSSChecklist.criteria.foreach((item: any) => {
    if (item.type === 'title') {
      if (group.groupID !== '') {
        evaluationCriteria.push(group);
        group.criteriaPoints = [];
      }
      group.groupID = item.title;
      group.groupName = item.title;
    } else if (item.type === 'subtask') {
      criteriaPoint.criteriaPointID = item.text;
      criteriaPoint.criteriaPointName = item.text;
      criteriaPoint.criteriaPointScore = item.max;
      criteriaPoint.isFine = false;
      criteriaPoint.isThisPointForAMentor = false;
      group.criteriaPoints.push(criteriaPoint);
    } else if (item.type === 'penalty') {
      criteriaPoint.criteriaPointID = item.text;
      criteriaPoint.criteriaPointName = item.text;
      criteriaPoint.criteriaPointScore = item.max * -1;
      criteriaPoint.isFine = true;
      criteriaPoint.isThisPointForAMentor = false;
      group.criteriaPoints.push(criteriaPoint);
    }
  });
  evaluationCriteria.push(group);

  const newTask = {
    id: RSSChecklist.taskName,
    name: RSSChecklist.taskName,
    evaluationCriteria: evaluationCriteria,
  };
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

  const newArray: any = [];

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

function getCriteriaPoint(criteriaPointsDingy: string) {
  const endDescription = criteriaPointsDingy.indexOf('+');
  const text = criteriaPointsDingy.slice(0, endDescription);

  const criteriaPointScore = criteriaPointsDingy.slice(
    endDescription + 1,
    criteriaPointsDingy.indexOf('\n')
  );
  return {
    criteriaPointID: text,
    criteriaPointName: text,
    criteriaPointScore: Number(criteriaPointScore),
    isFine: false,
    isThisPointForAMentor: false,
  };
}

function getDemoLink(incomingJSON: any): string {
  const demoDescription = getCategory(incomingJSON, 'Демо', 'Demo');
  const urlStart = demoDescription.indexOf('http');
  const urlEndEnter = demoDescription.indexOf('\n', urlStart);
  const urlEndSpace = demoDescription.indexOf(' ', urlStart);
  let urlEnd;
  if (urlEndEnter.lenght > urlEndSpace.lendht) {
    urlEnd = urlEndSpace;
  } else {
    urlEnd = urlEndEnter;
  }
  if (urlEnd[urlEnd.lenght - 1] === '.' || urlEnd[urlEnd.lenght - 1] === ',') {
    urlEnd = urlEnd.slice(0, -1);
  }
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
