import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Space, Input } from 'antd';
import CurrentStage from './CurrentStage/CurrentStage';
import ActiveTask from './ActiveTask/ActiveTask';
import { checkRef, databaseRef } from '../../firebase';
import AdminStatisticTask from './AdminStatisticTask/AdminStatisticTask';
import AssignRole from './AssignRole/AssignRole';



const data = ['Virtual Keyboard', 'Gem Puzzle', 'English for kids', 'MovieSearch'];

const AdminMain: React.FC = () => {
  const [users, setUser] = useState<any[]>([]);
  const [task, setTask] = useState<string | null>(null)
 useEffect(
  () => {
  /*      const changeRoleRef = checkRef.child('-MGoW-MfatwATMbO2Xh0').child('roles')
    changeRoleRef.transaction(function(currentRole) {
    return   currentRole = ['admin']
   });  */  

   databaseRef.on("value",  function(snapshot) {
    const userArray =  snapshot.val()
     console.log(userArray)
   }, function (error: any) {
      console.log("Error: " + error.code);
   });   

     checkRef.on("value",  function(snapshot) {
      const userArray =  snapshot.val()
       console.log(userArray)
       setUser(userArray)
     }, function (error: any) {
        console.log("Error: " + error.code);
     }); 
     distribute()  
  },
  []
)
const distribute = () => {
  let createArray: any = [];
  let jsObj: any = {};
  for (let i: number = 0; i <= 4; i++){
   let key= 'key' + i
    let obj: any = {
      key:{name:[]}
    }
  
    createArray.push(obj)
  } 

console.log(createArray)
let fourArray = Array(4).fill(createArray).flat().sort(() => Math.random() - 0.5)
console.log(fourArray)

  for(let i = 0; i < createArray.length; i +=1){
    let keyResult : any = Object.keys(createArray[i])[0]
    let valueResult : any = Object.values(createArray[i])[0]
    console.log(createArray[i] , keyResult,valueResult)
    for(let j = 0 ;valueResult.name.length < 4;  j +=1 ){
      if(valueResult.name.length<4){
        let q = fourArray.shift()
        let w = Object.keys(q)
        console.log(w[0], keyResult,valueResult.name.length)
        let isElement = valueResult.name.includes(w[0])
        if(keyResult !== w[0]){
          console.log('не равно')
          if(!isElement){
            console.log('нет',isElement)
            valueResult.name.push(q)
            console.log('-----',valueResult.name,fourArray)
          }
      
  
        }else{
        fourArray.push(q)
        }
      }
    }
  }
 
console.log('result', createArray)
}
  return (
    <div className="admin-wrapper">
      <Card style={{ marginTop: 30 }}>
      <Row >
        <Col>
          <ActiveTask data={data} />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <CurrentStage />
      </Row>
      <Row style={{ marginTop: 40 }}>
        <Col span={12}>
          <AdminStatisticTask user={users}/>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
          <Space align="end" direction="vertical">
            <Button style={{ marginBottom: 20, width: 182 }} type="primary">
              Distribute for inspection
            </Button>
            <Button style={{ marginBottom: 20, width: 182 }} type="primary">
              Add grades to table
            </Button>
            <Button style={{ marginBottom: 10, width: 182 }} type="primary">
              Conflicts
            </Button>
          </Space>
        </Col>
      </Row>
      </Card>
      <Row gutter={[8, 8]} style={{ margin: '0 30px'}}>
        <Col span={12} style={{ textAlign: 'center', margin: '20px 0' }}>
          <Button type="primary">Start new task</Button>
        </Col>
        <Col span={12} style={{ textAlign: 'center', margin: '20px 0' }}>
          <Button type="primary">Creat task</Button>
        </Col>
      </Row>
      <Row>
       <AssignRole user={users} />
      </Row>
    </div>
  );
};

export default AdminMain;
