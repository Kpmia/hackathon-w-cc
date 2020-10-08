import { requirePropFactory } from '@material-ui/core';
import React, { createElement, useState } from 'react';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap';
import db from '../firebase';


const chooseRole = (userRole) => {
    if (userRole == "investor" || userRole == "mentor") {
        return "owner"
    } else {
        return "investor"
    }
}

const InterestForm = ({...props}) => {
    const [interests, updateInterest] = useState({})
    const [steps, addStep] = useState(0)
    const [form, getForm] = useState(true)
    const [specifcUser, chooseUser] = useState([])
    const [recommendations, addRecs] = useState([])
    const [index, movdeIndex] = useState(0)


    const finishForm = () => {
        props.user = {...props.user, interests}
        console.log(props.user.uid)
        db.firestore().collection('users').doc(props.user.uid).set(props.user).then(success => {
            giveReccomendations()
            alert('Successful!')
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
                 count = count / 4 * 100
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

    console.log(recommendations)

    const generateProfiles = (recs) => {
        if (recommendations[index] == undefined) {
            movdeIndex(0)
        }
        if (recs == undefined) {
           if (recommendations[index]) {
            db.firestore().collection('users').doc(recommendations[index].uid).get().then(profile => {
                chooseUser(profile.data())
                getForm(false)
            })
           }
        } else {
            db.firestore().collection('users').doc(recs[index].uid).get().then(profile => {
                chooseUser(profile.data())
                console.log(profile.data())
                getForm(false)
            })
        }
    }

    const nextUser = () => {
        movdeIndex(index + 1)
        generateProfiles()
    }


    const acceptUser = () => {

    }

    const updateInterests = (key, val) => {
        var data = interests;
        data[key] = val;
        updateInterest(data)
    }


    const showForm = () => {
        if (steps == 0) {
           return <div>
                <UncontrolledButtonDropdown>
                        <DropdownToggle> {interests? interests["interests"] : null } </DropdownToggle>
                        <DropdownMenu onClick={(val) => updateInterests("interests", val.target.value)}>
                            <DropdownItem value="Funding"> Funding </DropdownItem>
                            <DropdownItem value="Mentors"> Mentors </DropdownItem>
                            <DropdownItem value="Events"> Events </DropdownItem>
                            <DropdownItem value="Off-Topic"> Off-Topic </DropdownItem>
                            <DropdownItem value="General"> General </DropdownItem>
                        </DropdownMenu>
                </UncontrolledButtonDropdown>
                <br></br>
                <br></br>

                <Button onClick={() => addSteps() }> Next </Button>
            </div>
        }
        if (steps == 1) {
            return <div>
                 <UncontrolledButtonDropdown>
                         <DropdownToggle>   </DropdownToggle>
                         <DropdownMenu onClick={(val) => updateInterests("funding", val.target.value)}>
                             <DropdownItem value="100k"> 100k </DropdownItem>
                             <DropdownItem value="1m"> 1m </DropdownItem>
                             <DropdownItem value="1.5m"> 1.5m </DropdownItem>
                             <DropdownItem value="200k"> 200k </DropdownItem>
                             <DropdownItem value="3m+"> 3m+ </DropdownItem>
                         </DropdownMenu>
                 </UncontrolledButtonDropdown>
                 <br></br>
                 <br></br>
 
                 <Button onClick={() => addSteps() }> Next </Button>
             </div>
         }
         if (steps == 2) {
            return <div>
            <UncontrolledButtonDropdown>
                    <DropdownToggle>   </DropdownToggle>
                    <DropdownMenu onClick={(val) => updateInterests("stages", val.target.value)}>
                        <DropdownItem value="Pre-Seed "> Pre-Seed </DropdownItem>
                        <DropdownItem value="Seed"> Seed </DropdownItem>
                        <DropdownItem value="Series A"> Series A </DropdownItem>
                        <DropdownItem value="Series B"> Series B </DropdownItem>
                        <DropdownItem value="Series C+"> Series C </DropdownItem>
                    </DropdownMenu>
            </UncontrolledButtonDropdown>
            <br></br>
            <br></br>

            <Button onClick={() => addSteps() }> Next </Button>
        </div>
         }
         if (steps == 3) {
            return <div>
                 <UncontrolledButtonDropdown>
                    <DropdownToggle>   </DropdownToggle>
                    <DropdownMenu onClick={(val) => updateInterests("route", val.target.value)}>
                        <DropdownItem value="Customer Discover"> Customer Discovery</DropdownItem>
                        <DropdownItem value="MVP "> MVP </DropdownItem>
                        <DropdownItem value="Pilots"> Built Product; Pilots </DropdownItem>
                        <DropdownItem value="Customers"> Trending Product; Customers </DropdownItem>
                    </DropdownMenu>
            </UncontrolledButtonDropdown>
            <br></br>
            <br></br>

            <Button onClick={() => finishForm() }> Finish </Button>
             </div>
         }
        
          

    }

    const addSteps = () => {
        addStep(steps + 1)
    }


   

    return (
        <div>

            

            {form ? showForm() : <div>


                {specifcUser.displayName}
                <br></br>
                {specifcUser.role}
                {Object.values(specifcUser.interests).map(interest => {
                    return (
                        <p> {interest}</p>
                    )
                })}
                <br></br>
               

                {
                    recommendations[index] ? 

                    <div>
                        {recommendations[index].prob}% Match For You!

                        Your Matches Are:
                        <br></br>

                         {recommendations[index].matches.map(match => {
                    return (
                        <div>
                            {match}
                         </div>
                    )
                })}


                    </div>
                    :

                    "No more users left : (. Redirecting back to chat channels."
                    
                }
               



                <Button onClick={() => nextUser()}> Accept </Button>
                 <Button onClick={() => nextUser()}> Next </Button>

                </div>
                }


        </div>
    )
}

export default InterestForm;