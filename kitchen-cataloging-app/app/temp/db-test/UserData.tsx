'use client'

import { useState, useEffect } from "react";

import { UserType, ErrorType } from "./data";

import { fetchData, seedUser } from "./actions";

type UserDataT = {
    userId: string | undefined;
}

const UserData = ({ userId }: UserDataT) => {
    

    const [userData, setUserData] = useState<null | UserType>(null);
    const [error, setError] = useState('')

    // Function to get user data -- runs on component mount and change of user data.
    const getUserData = async () => {
         if (userId) {
             const foundData: any = await fetchData(userId);
             if (foundData.error) {
                 setError(foundData.error.message);
             } else {
                 console.log(foundData);
                 setUserData(foundData);
             }
         }
     };

    const seedUserData = async () => {
      if (userId) {
        const foundData: any = await seedUser(userId);
        if (foundData.error) {
          setError(foundData.error.message);
        } else {
          console.log(foundData);
          setUserData(foundData);
        }
      }
    };

    useEffect(() => {
      getUserData();
    }, []);

    if (!userId) {
        return (
          <section>
            <h2>Current User Data:</h2>
            <p>
                Please log in to view your data.
            </p>
          </section>
        );
    }

    if (error) {
        return (
          <section>
            <h2>Current User Data:</h2>
                <p>Error: { error }</p>
          </section>
        );
    }


  return (
    <section>
      <h2>Current User Data:</h2>
      <p>
        <strong>User name: </strong>
        {userData?.firstName}
        {userData?.lastName}
      </p>
      <p>
        <strong>User email: </strong>
        {userData?.email}
      </p>
      {(!userData?.foods.length) ? 
        <button
          onClick={async () => {
            seedUserData();
          }}
        >
          Click Here to Seed user data!
              </button>
              :
        <p>Your user database has been seeded! (Check the console for your information)</p>
      }
    </section>
  );
}

export default UserData
