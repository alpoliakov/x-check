import { ICriteriaGroup, ICriteriaPoint, StateTask } from '../interfaces/ITask';
export default function importTaskMD(
  task: string,
  categorySeparator = '- **',
  pointSeparator = '- '
): any {
  task.replace('`', "'");
  const md2json = require('md-2-json');
  const incomingJSON = md2json.parse(task);
  const name = Object.keys(incomingJSON)[0];
  const demo = getDemoLink(incomingJSON);
  const evaluationCriteria = evaluationCriteriaParse(
    incomingJSON,
    categorySeparator,
    pointSeparator
  );

  const newTask = {
    id: name.replace(/\//g, ' '),
    name: name.replace(/\//g, ' '),
    demo: demo,
    evaluationCriteria: evaluationCriteria,
    publishedAt: new Date(2020, 0, 2).getTime(),
    authorName: 'Петя Пупыркин',
    state: StateTask.published,
    description: '',
    usefulLinks: '',
    oldUrl: '',
    useJury: false,
    checkingType: 'crossCheck',
    publisherID: 'Вася Пупкин',
  };
  return newTask;
}

export function bigImportTaskMD(
  task: string,
  categorySeparator = '- **',
  pointSeparator = '- '
): any {
  task.replace('`', "'");
  const md2json = require('md-2-json');
  const incomingJSON = md2json.parse(task);
  const name = Object.keys(incomingJSON)[0].length > 1 ? Object.keys(incomingJSON)[0] : '';
  const demo = Object.keys(incomingJSON)[0].length > 1 ? getDemoLink(incomingJSON) : '';
  const evaluationCriteria =
    Object.keys(incomingJSON)[0].length > 1
      ? evaluationCriteriaParse(incomingJSON, categorySeparator, pointSeparator)
      : '';
  const usefulLinks =
    Object.keys(incomingJSON)[0].length > 1
      ? getCategory(incomingJSON, 'Полезные ссылки', 'Useful links')
      : '';
  const description =
    Object.keys(incomingJSON)[0].length > 1 ? getDescriptionTask(incomingJSON) : '';

  const newTask = {
    id: name.replace(/\//g, ' '),
    name: name.replace(/\//g, ' '),
    demo: demo,
    description: description,
    evaluationCriteria: evaluationCriteria,
    usefulLinks: usefulLinks ? usefulLinks : '',
    publishedAt: new Date(2020, 0, 2).getTime(),
    authorName: 'Петя Пупыркин',
    state: StateTask.published,
    oldUrl: '',
    useJury: false,
    checkingType: 'crossCheck',
    publisherID: 'Вася Пупкин',
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

  const evaluationCriteria: any[] = [];
  RSSChecklist.criteria.forEach((item: any) => {
    if (item.type === 'title') {
      if (group.groupID !== '') {
        const groupPuch = { ...group };
        evaluationCriteria.push(groupPuch);
        group.criteriaPoints = [];
      }
      group.groupID = item.title;
      group.groupName = item.title;
    } else if (item.type === 'subtask') {
      const x = {
        criteriaPointID: item.text,
        criteriaPointName: item.text,
        criteriaPointScore: item.max,
        isFine: false,
        isThisPointForAMentor: false,
      };
      group.criteriaPoints.push(x);
    } else if (item.type === 'penalty') {
      const x = {
        criteriaPointID: item.text,
        criteriaPointName: item.text,
        criteriaPointScore: item.max * -1,
        isFine: true,
        isThisPointForAMentor: false,
      };
      group.criteriaPoints.push(x);
    }
  });
  const groupPuch = { ...group };
  evaluationCriteria.push(groupPuch);

  const newTask = {
    id: RSSChecklist.taskName,
    name: RSSChecklist.taskName,
    evaluationCriteria: evaluationCriteria,
    publishedAt: new Date(2020, 0, 2).getTime(),
    authorName: '',
    demo: '',
    state: StateTask.published,
    description: '',
    usefulLinks: '',
    oldUrl: '',
    useJury: false,
    checkingType: 'crossCheck',
    publisherID: '',
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

function evaluationCriteriaParse(
  incomingJSON: any,
  categorySeparator: string,
  pointSeparator: string
): any {
  const evaluationCriteriaDingy = getCategory(
    incomingJSON,
    'Критерии оценки:',
    'Evaluation criteria'
  );

  if (!evaluationCriteriaDingy) {
    return '';
  } else {
    let OneStrEnd = evaluationCriteriaDingy.indexOf(categorySeparator, 4);
    let newEvaluationCriteria = evaluationCriteriaDingy.slice(OneStrEnd, -1);
    const evaluationCriteriaArray = [];
    while (newEvaluationCriteria.indexOf(categorySeparator, 4) !== -1) {
      OneStrEnd = newEvaluationCriteria.indexOf(categorySeparator, 4);
      const criteriaBlock = newEvaluationCriteria.slice(0, OneStrEnd);
      evaluationCriteriaArray.push(criteriaBlock);
      newEvaluationCriteria = newEvaluationCriteria.slice(OneStrEnd, -1);
    }
    evaluationCriteriaArray.push(newEvaluationCriteria);

    const newArray: any = [];
    let pointsArray: ICriteriaPoint[];

    evaluationCriteriaArray.forEach((criteria) => {
      const nameStart = criteria.indexOf('**');
      const nameEnd = criteria.indexOf('+', nameStart + 2);
      const titleEnd = criteria.indexOf('**', nameStart + 2);
      const groupName = criteria.slice(nameStart + 2, nameEnd);
      const criteriaPointsDingy = criteria.slice(titleEnd + 5, -1);
      pointsArray = getCriteriaPoint(criteriaPointsDingy, pointSeparator);
      newArray.push({
        groupID: groupName,
        groupName: groupName,
        criteriaPoints: pointsArray,
      });
    });
    return newArray;
  }
}

function getCriteriaPoint(criteriaPointsDingy: string, pointSeparator: string) {
  const pointsArray = [];
  let pointsBlock = '';
  while (criteriaPointsDingy.indexOf('- ', 4) !== -1) {
    const OneStrEnd = criteriaPointsDingy.indexOf(pointSeparator, 4);
    pointsBlock = criteriaPointsDingy.slice(0, OneStrEnd);
    pointsArray.push(pointsBlock);
    criteriaPointsDingy = criteriaPointsDingy.slice(OneStrEnd, -1);
  }
  pointsArray.push(criteriaPointsDingy);

  const newArray: any = [];
  pointsArray.forEach((pointString) => {
    const endDescription = pointString.indexOf('+');
    const text = pointString.slice(0, endDescription);
    const criteriaPointScore = pointString.slice(endDescription + 1, pointString.indexOf('\n'));
    const point = {
      criteriaPointID: text,
      criteriaPointName: text,
      criteriaPointScore: Number(criteriaPointScore),
      isFine: false,
      isThisPointForAMentor: false,
    };
    newArray.push(point);
  });
  return newArray;
}

function getDemoLink(incomingJSON: any): string {
  const demoDescription = getCategory(incomingJSON, 'Демо', 'Demo');
  if (!demoDescription) {
    return '';
  } else {
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
}

function getDescriptionTask(incomingJSON: any): any {
  const descriptionDingy = getdescriptionDingy(incomingJSON);
  if (!descriptionDingy) {
    return '';
  } else {
    let description = '';
    for (let key in descriptionDingy) {
      description += `##${key} \n ${descriptionDingy[key].raw} `;
    }
    return description;
  }
}

function getdescriptionDingy(incomingJSON: any): any {
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Критерии оценки:'];
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Evaluation criteria'];
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Полезные ссылки'];
  delete incomingJSON[Object.keys(incomingJSON)[0]]['Useful links'];
  const descriptionDingy = incomingJSON[Object.keys(incomingJSON)[0]];
  return descriptionDingy;
}
