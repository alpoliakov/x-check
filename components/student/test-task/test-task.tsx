import { ITask, ICriteriaGroup, ICriteriaPoint } from '../../../interfaces/ITask';

const criteriaPoint1: ICriteriaPoint = {
  criteriaPointID: 'criteriaPoint 1',
  criteriaPointName: 'минимальная ширина, при которой приложение отображается корректно – 320 рх',
  criteriaPointScore: 10,
  isFine: false,
  isThisPointForAMentor: false,
};

const criteriaPoint2: ICriteriaPoint = {
  criteriaPointID: 'criteriaPoint 2',
  criteriaPointName:
    'внешний вид приложения полностью повторяет демо или является его улучшенной версией',
  criteriaPointScore: 10,
  isFine: false,
  isThisPointForAMentor: true,
};

const criteriaPoint3: ICriteriaPoint = {
  criteriaPointID: 'criteriaPoint 3',
  criteriaPointName: 'индикация текущего вопроса (подсветка категории в header)',
  criteriaPointScore: 10,
  isFine: false,
  isThisPointForAMentor: true,
};

const criteriaPoint4: ICriteriaPoint = {
  criteriaPointID: 'criteriaPoint 4',
  criteriaPointName: 'правильное отображение текущего счета игры',
  criteriaPointScore: 20,
  isFine: false,
  isThisPointForAMentor: false,
};

const criteriaPoint5: ICriteriaPoint = {
  criteriaPointID: 'criteriaPoint 5',
  criteriaPointName: 'индикация текущего вопроса (подсветка категории в header)',
  criteriaPointScore: 10,
  isFine: false,
  isThisPointForAMentor: false,
};

const criteriaPoint6: ICriteriaPoint = {
  criteriaPointID: 'criteriaPoint 6',
  criteriaPointName: 'правильное отображение текущего счета игры',
  criteriaPointScore: 20,
  isFine: false,
  isThisPointForAMentor: false,
};

const criteriaGroup1: ICriteriaGroup = {
  groupID: 'groupID 1',
  groupName: 'Вёрстка, дизайн:',
  criteriaPoints: [criteriaPoint1, criteriaPoint2],
};

const criteriaGroup2: ICriteriaGroup = {
  groupID: 'groupID 2',
  groupName: 'Header',
  criteriaPoints: [criteriaPoint3, criteriaPoint4],
};

const criteriaGroup3: ICriteriaGroup = {
  groupID: 'groupID 3',
  groupName: 'Test 3',
  criteriaPoints: [criteriaPoint6, criteriaPoint5],
};

export const testTask: ITask = {
  id: 'Songbird 1',
  name: 'Songbird',
  authorName: 'Alex Alexsandrov',
  publisherID: 'publisherID',
  state: 'draft',
  publishedAt: new Date(),
  description: `Допускается:
  -другая тематика приложения (не птицы)
  -использование вместо изображений видео
  -замена названий и описаний птиц другими данными`,
  evaluationCriteria: [criteriaGroup1, criteriaGroup2, criteriaGroup3],
  usefulLinks: ['task'],
  useJury: false,
  checkingType: 'crossCheck',
};
