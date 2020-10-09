import { requirePropFactory } from '@material-ui/core';
import React, { createElement, useState } from 'react';
import FadeIn from 'react-fade-in';
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Table, Toast, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap';
import db from '../firebase';
import { toast, ToastContainer, Slide } from 'react-toastify';


const chooseRole = (userRole) => {
    if (userRole == "investor" || userRole == "mentor") {
        return "owner"
    } else {
        return "investor"
    }
}

const stages = ["Pre-Seed", "Seed", "Series A", "Series B & C"]
const industry = ["Technology", "Finance", "Entertainment", "Retail", "Agriculture", "Other"]
const raise = ["$0k-$50k", "$250-$500k", "$500k-$1m+", "$1m-$3,", "$5m-$10m", "$10m+"]
const cofounders = ["0-1", "2-4", "5+"]
const student = ["high school", "associate's", "bachelor's", "master's", "phD"]


const InterestForm = ({...props}) => {
    const [interests, updateInterest] = useState({})
    const [interests1, updateInterest1] = useState('')
    const [raise1, updateRaise] = useState('')
    const [student1, updateStudent] = useState('')
    const [cofounder, updateCofounder] = useState('')
    const [steps, addStep] = useState(0)
    const [industries, updateIndustry] = useState('')
    const [form, getForm] = useState(true)
    const [specifcUser, chooseUser] = useState([])
    const [recommendations, addRecs] = useState([])
    const [index, movdeIndex] = useState(0)


    const finishForm = () => {
        props.user = {...props.user, interests}
        db.firestore().collection('users').doc(props.user.uid).set(props.user).then(success => {
            giveReccomendations()
            toast('Submitted form!')
        })
    }
    const giveReccomendations = () => {
        const createProb = {}
        var count = 0
        var uid = []
        db.firestore().collection('users').get().then(user => {
            user.forEach(user => {
                if (user.data().role == chooseRole(props.user.role) && user.data().uid != props.user.uid) {
                    count = 0
                    var matches = []
                    Object.keys(user.data().interests).map(interest => {

                    if (interests[interest] == user.data().interests[interest]) {
                        count += 1
                        matches.push(user.data().interests[interest])
                    }
                })
                 count = count / 5 * 100
                 createProb[user.data().uid] = {prob: count, matches: matches, uid: user.data().uid} 
                 uid.push(createProb[user.data().uid])
                 uid.sort((a, b) => { return b.prob - a.prob })
                }
            })
        }).then(final => {
            console.log(uid)
            addRecs(uid)
            generateProfiles(uid)
        })
    }


    const generateProfiles = (recs) => {
        if (recommendations[index] == undefined) {
            movdeIndex(0)
        }
         
        if (recommendations[index]) {
        db.firestore().collection('users').doc(recommendations[index].uid).get().then(profile => {
            console.log(profile.data())
            chooseUser(profile.data())
            getForm(false)
        })
        }
    }

    const nextUser = () => {
        movdeIndex(index + 1)
        generateProfiles()
    }


    const addToPortfolio = () => {
        db.firestore().collection('users').doc(props.user.uid).get().then(profile => {
            var portfolio = []
            portfolio = profile.data()
            if (portfolio["saved"] == undefined) {
                portfolio["saved"] = []
                specifcUser["prob"] = recommendations[index].prob
                portfolio["saved"].push(specifcUser)
                db.firestore().collection('users').doc(props.user.uid).set(portfolio)
                toast('Saved to your portfolio!')
                
            } else {
                specifcUser["prob"] = recommendations[index].prob
                portfolio["saved"].push(specifcUser)
                db.firestore().collection('users').doc(props.user.uid).set(portfolio) 
                toast('Saved to your portfolio!')

            }
        })
    }

    const updateInterests = (key, val) => {
        var data = interests;
        data[key] = val;
        updateInterest(data)
    }


    const showForm = () => {
        if (steps == 0) {
           return <div>
               <br></br>
              
               <p> {props.user.role == "owner" ?
                <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    Which stage is your business at? </p> : 
                     <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                     Which stage are you looking for businesses in?
                     </p>}
                    </p>
                    <Row style={{justifyContent: 'center'}}>
                <UncontrolledButtonDropdown>
                        <DropdownToggle> {interests1? interests1 : "Stages" } </DropdownToggle>
                        <DropdownMenu style={{height: 100, overflowY: 'scroll'}} onClick={(val) => { updateInterests("stage", val.target.value); updateInterest1( val.target.value) }}>
                            {
                                stages.map(stage => {
                                    return (
                                        <DropdownItem value={stage}> {stage}</DropdownItem>
                                    )
                                })
                            }
                        </DropdownMenu>
                </UncontrolledButtonDropdown>
                </Row>
                <br></br>

                <Row style={{justifyContent: 'center'}}>
                <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}}  onClick={() => addSteps() }> Next </Button>
                </Row>
            </div>
        }
        if (steps == 1) {
            return <div>
                <br></br>
               
                 <p> {props.user.role == "owner" ?
                <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    Which industry is your business in? 

                    </p> : 
                     <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                     Which industry are you interested in?

                     </p>}
                    </p>
                    <Row style={{justifyContent: 'center'}}>
                 <UncontrolledButtonDropdown>
                         <DropdownToggle>  {industries? industries : "Industry" } </DropdownToggle>
                         <DropdownMenu  style={{height: 100, overflowY: 'scroll'}} onClick={(val) => { updateInterests("industry", val.target.value) ; updateIndustry(val.target.value)}}>
                         {
                                industry.map(stage => {
                                    return (
                                        <DropdownItem value={stage}> {stage}</DropdownItem>
                                    )
                                })
                            }
                         </DropdownMenu>
                 </UncontrolledButtonDropdown>
                 </Row>
                 <br></br>
 
                 <Row style={{justifyContent: 'center'}}>
                <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}}  onClick={() => addSteps() }> Next </Button>
                </Row>             </div>
         }
         if (steps == 2) {
            return <div>
                <br></br>
              
                  <p> {props.user.role == "owner" ?
                <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    How much are you looking to raise?
                    </p> : 
                     <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    How much can you/your firm fund?
                     </p>}
                    </p>
                    <Row style={{justifyContent: 'center'}}>
            <UncontrolledButtonDropdown>
                    <DropdownToggle> { raise1 ? raise1 : "Raise"}   </DropdownToggle>
                    <DropdownMenu  style={{height: 100, overflowY: 'scroll'}} onClick={(val) => { updateInterests("funding", val.target.value); updateRaise( val.target.value)}}>
                    {
                                raise.map(stage => {
                                    return (
                                        <DropdownItem value={stage}> {stage}</DropdownItem>
                                    )
                                })
                            }
                    </DropdownMenu>
            </UncontrolledButtonDropdown>
            </Row>
            <br></br>

            <Row style={{justifyContent: 'center'}}>
                <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}}  onClick={() => addSteps() }> Next </Button>
                </Row>        </div>
         }
         if (steps == 3) {
            return <div>
                <br></br>
        
                 <p> {props.user.role == "owner" ?
                <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    How many co-founders do you have in your team? 
                    </p> : 
                     <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    How many co-founders would you like to work with in a single team?
                     </p>}
                    </p>
                    <Row style={{justifyContent: 'center'}}>
                 <UncontrolledButtonDropdown>
                    <DropdownToggle>  {cofounder ? cofounder : "Size"}  </DropdownToggle>
                    <DropdownMenu  style={{height: 100, overflowY: 'scroll'}} onClick={(val) => { updateInterests("teamsize", val.target.value); updateCofounder(val.target.value)}}>
                    {
                                cofounders.map(stage => {
                                    return (
                                        <DropdownItem value={stage}> {stage}</DropdownItem>
                                    )
                                })
                            }
                    </DropdownMenu>
            </UncontrolledButtonDropdown>
            </Row>
            <br></br>

            <Row style={{justifyContent: 'center'}}>
            <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}}  onClick={() => addSteps() }> Next </Button>
                </Row>
             </div>
         }
         console.log(steps)
         if (steps == 4) {
            return <div>
                <br></br>
              
                 <p> {props.user.role == "owner" ?
                <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                    What level of degree are you seeking?                    </p> : 
                     <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>
                   What level of degree do you prefer to work with?
                     </p>}
                    </p>
                    <Row style={{justifyContent: 'center'}}>
                 <UncontrolledButtonDropdown>
                    <DropdownToggle> {student1 ? student1 : "Degree"}  </DropdownToggle>
                    <DropdownMenu  style={{height: 100, overflowY: 'scroll'}} onClick={(val) => { updateInterests("student", val.target.value); updateStudent(val.target.value)}}>
                    {
                                student.map(stage => {
                                    return (
                                        <DropdownItem value={stage}> {stage}</DropdownItem>
                                    )
                                })
                            }
                    </DropdownMenu>
            </UncontrolledButtonDropdown>
            </Row>
            <br></br>

            <Row style={{justifyContent: 'center'}}>
                <Button className="btn-block" style={{ fontSize: 14, width: 200, fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}}  onClick={() => finishForm() }> Create My Matches </Button>
                </Row>
             </div>
         }
        
          

    }

    const addSteps = () => {
        addStep(steps + 1)
    }


   

    return (
        <div>


            {recommendations[index] ? 
                                    <p style={{position: 'absolute', color: '#4B4D5B'}} className="float-right">{recommendations[index].prob}% Match </p>
                : null }

            

            {form ? showForm() : <div>

                <FadeIn>
                <Row style={{justifyContent: 'center'}}>
                <img src={require('../assets/matcheduser.svg')} />
                </Row>
               <p style={{color: '#4B4D5B', textAlign: 'center', fontSize: 22, fontWeight: 600, marginBottom: 8}}> {specifcUser.displayName}</p>
                <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 17, fontWeight: 300, marginBottom: 2}}>  {specifcUser.role} @ {specifcUser.companyName}</p>

                <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 14, fontWeight: 300,}}> About </p>
                <Row>
                <Table>
                    <tbody>
                {Object.keys(specifcUser.interests).map(interest => {

                    var interestName = interest[0].toUpperCase() + interest.substring(1, interest.length)
                    var value = specifcUser.interests[interest][0].toUpperCase() + specifcUser.interests[interest].substring(1, specifcUser.interests[interest].length)

                    return (
                        <tr>
                            <th> {interestName} </th>
                            <th> {value}</th>
                        </tr>
                    )
                })}
                </tbody>
                </Table>
                </Row>
                {
                    console.log(recommendations)
                }
                {
                    recommendations[index] ? 

                    <div >

            <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 14, fontWeight: 300,}}> Your </p>
                        <Row>

                         {recommendations[index].matches.map(match => {
                             var beginning = match[0].toUpperCase() + match.substring(1, match.length)
                    return (
                        <div>
                        <Col>
                        <p style={{color: '#4B4D5B',textAlign: 'center', fontSize: 14, fontWeight: 300,}}>{beginning}</p>
                            </Col>
                         </div>
                         
                    )
                })}
                      </Row>



                    </div>
                    :

                    <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 14, fontWeight: 300,}}>
                        No more users left. Restarting the round.
                    </p>
                    
                }


                <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 16, fontWeight: 300, marginBottom: 0}}>
                Website: {specifcUser.website}  </p>
                <p style={{color: '#4B4D5B',textAlign: 'left', fontSize: 16, fontWeight: 300,}}>
               Linkedin: {specifcUser.linkedin} 
                </p>


               

               


                <Row>
                    <Col><Button className="btn-block" style={{ fontSize: 14,  fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}}onClick={() => addToPortfolio()}> Save </Button>
                    </Col>
                    <Col>

               <Button className="btn-block" style={{ fontSize: 14,  fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}} onClick={() => nextUser()}>Skip </Button>
               </Col>
               <Col>
               <Button className="btn-block" style={{ fontSize: 14,  fontWeight: 600, background: 'none', border: '1px solid #B4B4B4', borderRadius: 7, color: '#B4B4B4'}} onClick={() => window.location.href = '/'}> Done </Button>
               </Col>
                 </Row>

                 </FadeIn>
                </div>
                }


        </div>
    )
}

export default InterestForm;